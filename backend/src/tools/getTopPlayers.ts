import Groq from "groq-sdk";
import { prisma } from "../prismaClient.js";
import { STAT_COLUMNS, VALID_STATS } from "../statMap.js";
import type { StatColumn, StatName } from "../statMap.js";
import type { Prisma } from "../generated/prisma/client.js";

export interface GetTopPlayersArgs {
  stat: string;
  limit?: number;
  season?: string;
  position?: string;
  team?: string;
  min_minutes?: number;
}

export interface PlayerRow {
  name: string;
  team: string;
  season: string | number;
  position: string;
  games: number;
  minutes: number;
  value: number;
  goals?: number;
  assists?: number;
  xg?: number;
  xa?: number;
}

export interface PlayerData {
  stat: StatName;
  column: StatColumn;
  filters: Record<string, string | number | null>;
  count: number;
  players: PlayerRow[];
}

export type GetTopPlayersResult = PlayerData | { error: string };

/**
 * JSON schema exposed to Groq for tool calling.
 */
export const getTopPlayersToolDef: Groq.Chat.ChatCompletionTool = {
  type: "function",
  function: {
    name: "getTopPlayers",
    description:
      "Get the top N players ranked by a given football statistic (xG, non-penalty goals, xA, etc), " +
      "optionally filtered by team, position, or season. Returns real data pulled from the database — " +
      "use this any time the user asks about player rankings, leaders, or 'best/top X by Y'.",
    parameters: {
      type: "object",
      properties: {
        stat: {
          type: "string",
          enum: VALID_STATS,
          description: "The statistic to rank players by.",
        },
        limit: {
          type: "integer",
          description: "How many players to return as a raw integer number (e.g. 10, NOT string '10'). Defaults to 10, max 50.",
        },
        season: {
          type: "string",
          description: "Season filter, e.g. '2025' for the 2025/26 season. Omit for all seasons.",
        },
        position: {
          type: "string",
          description: "Filter by position, e.g. 'FW', 'MF', 'DF'. Omit for all positions.",
        },
        team: {
          type: "string",
          description: "Filter by team name (partial match ok), e.g. 'Arsenal'. Omit for all teams.",
        },
        min_minutes: {
          type: "integer",
          description: "Minimum minutes played to qualify as a raw integer number (e.g. 500, NOT string '500'). Omit for no filter.",
        },
      },
      required: ["stat"],
    },
  },
};

/**
 * Executes the real database query through Prisma. This is the single source
 * of truth for both the LLM's summary text AND the chart the frontend renders —
 * the LLM never generates or sees the underlying numbers except as this tool's
 * output. Ranks players by the requested stat, descending.
 */
export async function getTopPlayers(args: GetTopPlayersArgs): Promise<GetTopPlayersResult> {
  const { stat, limit = 10, season, position, team, min_minutes } = args;

  if (!VALID_STATS.includes(stat)) {
    return { error: `Unknown stat "${stat}". Valid stats: ${VALID_STATS.join(", ")}` };
  }

  const column = STAT_COLUMNS[stat as StatName];
  if (!column) {
    return { error: `No DB column mapped for stat "${stat}".` };
  }

  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);

  const where: Prisma.PlayerSeasonStatsWhereInput = {};
  if (season) where.Season = { name: { contains: season } };
  if (position) where.Player = { position };
  if (team) where.Team = { name: { contains: team, mode: "insensitive" } };
  if (min_minutes) where.minutes = { gte: Number(min_minutes) };

  try {
    const rows = await prisma.playerSeasonStats.findMany({
      where,
      orderBy: { [column]: "desc" } as Prisma.PlayerSeasonStatsOrderByWithRelationInput,
      take: safeLimit,
      include: {
        Player: { select: { name: true, position: true } },
        Team: { select: { name: true } },
        Season: { select: { name: true } },
      },
    });

    return {
      stat: stat as StatName,
      column,
      filters: {
        season: season ?? null,
        position: position ?? null,
        team: team ?? null,
        min_minutes: min_minutes ?? null,
      },
      count: rows.length,
      players: rows.map((row) => {
        const raw = row as unknown as Record<string, unknown>;
        const val = Number(raw[column] ?? 0);
        const safeVal = Number.isFinite(val) ? val : 0;
        return {
          name: row.Player.name,
          team: row.Team.name,
          season: row.Season.name,
          position: row.Player.position ?? "",
          games: row.matches,
          minutes: row.minutes,
          value: safeVal,
          // include a few extra stats for context in the UI/tooltip
          goals: row.goals,
          assists: row.assists,
          xg: row.xG,
          xa: row.xA,
          [column]: safeVal,
        };
      }),
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Database query failed." };
  }
}
