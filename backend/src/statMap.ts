/**
 * EDIT THIS FILE to match your actual Prisma schema.
 *
 * The backend reads stats from the `PlayerSeasonStats` model in
 * prisma/schema.prisma (one row per player per team per season, scraped from
 * understat), joined to `Player`, `Team` and `Season`.
 *
 * If your model/field names differ, just change the values below —
 * nothing else in the backend needs to change.
 */

// Friendly stat name (used by the LLM tool call) -> actual Prisma field name
// on the PlayerSeasonStats model.
export const STAT_COLUMNS = {
  xG: "xG",
  npxG: "npxG",
  xA: "xA",
  goals: "goals",
  npg: "npGoals", // non-penalty goals
  assists: "assists",
  shots: "shots",
  key_passes: "keyPasses",
  minutes: "minutes",
} as const;

export type StatName = keyof typeof STAT_COLUMNS;
export type StatColumn = (typeof STAT_COLUMNS)[StatName];

export const VALID_STATS = Object.keys(STAT_COLUMNS);
