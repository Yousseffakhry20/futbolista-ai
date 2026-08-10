import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import type { ChartSpec, PlayerData } from "@/types/chat"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const AMBER = "#e8a33d"
const AMBER_SOFT = "#f0bc6d"
const MINT = "#7dd3c0"
const LINE = "#375d50"
const CHALK_MUTED = "#9fb3aa"

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className="rounded-md border border-line-600 bg-pitch-900 px-3 py-2 text-xs shadow-xl">
      <p className="font-display text-sm uppercase tracking-wide text-chalk">{row.name}</p>
      <p className="text-chalk-muted">{row.team} · {row.position}</p>
      <p className="mt-1 font-mono text-amber-soft">{row.value}</p>
    </div>
  )
}

export function StatChart({ spec, data }: { spec: ChartSpec; data: PlayerData }) {
  const rows = data.players.map((p) => ({
    ...p,
    // shorten long names for x-axis ticks
    shortName: p.name.length > 14 ? p.name.slice(0, 13) + "…" : p.name,
  }))

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>{spec.title}</CardTitle>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {data.filters.season && <Badge variant="default">{data.filters.season}</Badge>}
            {data.filters.position && <Badge>{data.filters.position}</Badge>}
            {data.filters.team && <Badge>{data.filters.team}</Badge>}
            {data.filters.min_minutes && <Badge>{data.filters.min_minutes}+ mins</Badge>}
          </div>
        </div>
        <Badge variant="default">{data.count} players</Badge>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {spec.chart_type === "line" ? (
              <LineChart data={rows} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                <CartesianGrid stroke={LINE} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="shortName" stroke={CHALK_MUTED} fontSize={11} tickLine={false} />
                <YAxis stroke={CHALK_MUTED} fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: LINE }} />
                <Line type="monotone" dataKey="value" stroke={AMBER} strokeWidth={2.5} dot={{ r: 3, fill: AMBER }} />
              </LineChart>
            ) : spec.chart_type === "scatter" ? (
              <ScatterChart margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                <CartesianGrid stroke={LINE} strokeDasharray="4 4" />
                <XAxis dataKey="xg" name="xG" stroke={CHALK_MUTED} fontSize={11} tickLine={false} />
                <YAxis dataKey="xa" name="xA" stroke={CHALK_MUTED} fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: LINE }} />
                <Scatter data={rows} fill={MINT} />
              </ScatterChart>
            ) : (
              <BarChart data={rows} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                <CartesianGrid stroke={LINE} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="shortName" stroke={CHALK_MUTED} fontSize={11} tickLine={false} interval={0} angle={-25} textAnchor="end" height={50} />
                <YAxis stroke={CHALK_MUTED} fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {rows.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? AMBER : AMBER_SOFT} fillOpacity={i === 0 ? 1 : 0.55 + 0.35 * (1 - i / rows.length)} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
