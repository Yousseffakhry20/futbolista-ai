import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Zap, Globe, ShieldCheck } from "lucide-react"

const STATS = [
  {
    icon: Database,
    value: "100k+",
    label: "Player Seasons Indexed",
    detail: "Comprehensive xG, xA, and shot map coverage.",
  },
  {
    icon: Zap,
    value: "<500ms",
    label: "Average Query Latency",
    detail: "Real-time AI data parsing and chart generation.",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Top Leagues & Competitions",
    detail: "Premier League, La Liga, Serie A, Bundesliga, UCL & more.",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Understat Data Fidelity",
    detail: "Direct empirical stats without unverified rumors.",
  },
]

export function SocialProof() {
  return (
    <section className="py-28 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary mb-3">
            Platform Capabilities & Trust
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Engineered for Precision & Speed
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Trusted by analysts, scouts, journalists, and passionate fans demanding verified football data.
          </p>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="border-border bg-card/80 p-6 text-center rounded-2xl hover:border-primary/40 transition-all duration-300 shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-black tracking-tight text-foreground font-sans">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-bold text-primary">
                  {stat.label}
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {stat.detail}
                </p>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}
