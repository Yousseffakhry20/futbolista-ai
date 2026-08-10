import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserCheck, ShieldCheck, Compass, ArrowUpRight } from "lucide-react"

const BENEFITS = [
  {
    icon: UserCheck,
    badge: "Player Metrics",
    title: "Deep Player Analysis",
    description:
      "Evaluate non-penalty xG, expected assists (xA), shot locations, and efficiency trends per 90 minutes across all major European leagues.",
    highlight: "xG, xA & Shot Maps",
  },
  {
    icon: ShieldCheck,
    badge: "Team Performance",
    title: "Tactical Team Insights",
    description:
      "Uncover pressing efficiency, buildup patterns, expected goal differential (xGD), and defensive solidity across whole team lineups.",
    highlight: "Buildup & Defensive xG",
  },
  {
    icon: Compass,
    badge: "AI Scouting",
    title: "Talent Discovery",
    description:
      "Find underrated U21 gems and players with matching stat profiles using natural language filters without complex spreadsheet queries.",
    highlight: "Natural Language Scout",
  },
]

export function BenefitsGrid() {
  return (
    <section id="benefits" className="py-28 border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary mb-3">
            Why Futbolista AI
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Built for Modern Football Analysts & Scouts
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Eliminate hours of manual data wrangling. Ask questions naturally and receive instant, publication-ready analytics.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon
            return (
              <Card
                key={benefit.title}
                className="group relative overflow-hidden border-border bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="muted" className="text-[11px] font-mono">
                      {benefit.badge}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs font-semibold text-primary">
                    <span>{benefit.highlight}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}
