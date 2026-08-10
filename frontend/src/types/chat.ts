export interface PlayerRow {
  name: string
  team: string
  season: string | number
  position: string
  games: number
  minutes: number
  value: number
  goals?: number
  assists?: number
  xg?: number
  xa?: number
}

export interface ChartSpec {
  chart_type: "bar" | "line" | "scatter"
  title: string
  x_key: string
  y_key: string
}

export interface PlayerData {
  stat: string
  column: string
  filters: Record<string, string | number | null>
  count: number
  players: PlayerRow[]
}

export interface ChatApiResponse {
  text: string | null
  chartSpec: ChartSpec | null
  data: PlayerData | null
  error?: string
}

export type Role = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: Role
  text: string
  chartSpec?: ChartSpec | null
  data?: PlayerData | null
}
