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
  // Core Offensive Stats
  xG: "xG",
  npxG: "npxG",
  xA: "xA",
  goals: "goals",
  npg: "npGoals",
  npGoals: "npGoals",
  assists: "assists",
  shots: "shots",
  key_passes: "keyPasses",
  keyPasses: "keyPasses",
  minutes: "minutes",
  matches: "matches",
  yellowCards: "yellowCards",
  redCards: "redCards",

  // Dribbling
  dribbles: "dribblesCompleted",
  dribbles_completed: "dribblesCompleted",
  dribblesCompleted: "dribblesCompleted",
  dribbles_attempted: "dribblesAttempted",
  dribblesAttempted: "dribblesAttempted",
  dribbled_past: "dribbledPast",
  dribbledPast: "dribbledPast",

  // Fouls & Offsides
  fouls: "fouls",
  fouls_drawn: "foulsDrawn",
  foulsDrawn: "foulsDrawn",
  offsides: "offsides",
  penalty_conceded: "penaltyConceded",
  penaltyConceded: "penaltyConceded",

  // Defensive Actions & Duels
  tackles: "tackles",
  tackles_won: "tacklesWon",
  tacklesWon: "tacklesWon",
  interceptions: "interceptions",
  clearances: "clearances",
  blocked_shots: "blockedShots",
  blockedShots: "blockedShots",
  aerial_duels_won: "aerialDuelsWon",
  aerialDuelsWon: "aerialDuelsWon",
  aerial_duels_lost: "aerialDuelsLost",
  aerialDuelsLost: "aerialDuelsLost",
  aerial_duels_total: "aerialDuelsTotal",
  aerialDuelsTotal: "aerialDuelsTotal",
  ground_duels_won: "groundDuelsWon",
  groundDuelsWon: "groundDuelsWon",
  ground_duels_lost: "groundDuelsLost",
  groundDuelsLost: "groundDuelsLost",

  // Possession, Passing & Build-up
  dispossessed: "dispossessed",
  possession_lost: "possessionLost",
  possessionLost: "possessionLost",
  possession_won_att_third: "possessionWonAttThird",
  possessionWonAttThird: "possessionWonAttThird",
  touches: "touches",
  xg_buildup: "xgBuildup",
  xgBuildup: "xgBuildup",
  xg_chain: "xgChain",
  xgChain: "xgChain",

  // Rating & Match Context
  rating: "rating",
  error_lead_to_goal: "errorLeadToGoal",
  errorLeadToGoal: "errorLeadToGoal",
  error_lead_to_shot: "errorLeadToShot",
  errorLeadToShot: "errorLeadToShot",
  matches_started: "matchesStarted",
  matchesStarted: "matchesStarted",
} as const;

export type StatName = keyof typeof STAT_COLUMNS;
export type StatColumn = (typeof STAT_COLUMNS)[StatName];

export const VALID_STATS = Object.keys(STAT_COLUMNS);
