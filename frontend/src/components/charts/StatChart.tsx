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

const SIGNAL = "#D8B336"
const SIGNAL_SOFT = "#F1E3A1"
const GRAPHITE = "#343434"
const MUTED = "#A8A69F"

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className="border border-border bg-popover px-3 py-2 text-xs shadow-xl">
      <p className="text-sm font-semibold text-foreground">{row.name}</p>
      <p className="text-muted-foreground">{row.team} · {row.position}</p>
      <p className="mt-1 font-mono text-primary">{row.value}</p>
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
    <Card className="w-full rounded-md shadow-none">
      <CardHeader className="flex-row items-start justify-between space-y-0 border-b border-border">
        <div>
          <p className="utility-label mb-1">Returned data</p><CardTitle className="text-base">{spec.title}</CardTitle>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {data.filters.season && <Badge variant="default">{data.filters.season}</Badge>}
            {data.filters.position && <Badge>{data.filters.position}</Badge>}
            {data.filters.team && <Badge>{data.filters.team}</Badge>}
            {data.filters.min_minutes && <Badge>{data.filters.min_minutes}+ mins</Badge>}
          </div>
        </div>
        <Badge variant="outline" className="rounded-sm font-mono text-[10px]">{data.count} players</Badge>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {spec.chart_type === "line" ? (
              <LineChart data={rows} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                <CartesianGrid stroke={GRAPHITE} strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="shortName" stroke={MUTED} fontSize={11} tickLine={false} /><YAxis stroke={MUTED} fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: GRAPHITE }} /><Line type="monotone" dataKey="value" stroke={SIGNAL} strokeWidth={2.5} dot={{ r: 3, fill: SIGNAL }} />
              </LineChart>
            ) : spec.chart_type === "scatter" ? (
              <ScatterChart margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                <CartesianGrid stroke={GRAPHITE} strokeDasharray="3 5" /><XAxis dataKey="xg" name="xG" stroke={MUTED} fontSize={11} tickLine={false} /><YAxis dataKey="xa" name="xA" stroke={MUTED} fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: GRAPHITE }} /><Scatter data={rows} fill={SIGNAL} />
              </ScatterChart>
            ) : (
              <BarChart data={rows} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
                <CartesianGrid stroke={GRAPHITE} strokeDasharray="3 5" vertical={false} /><XAxis dataKey="shortName" stroke={MUTED} fontSize={11} tickLine={false} interval={0} angle={-25} textAnchor="end" height={50} /><YAxis stroke={MUTED} fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(216,179,54,0.08)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {rows.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? SIGNAL : SIGNAL_SOFT} fillOpacity={i === 0 ? 1 : 0.42 + 0.36 * (1 - i / rows.length)} />
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
