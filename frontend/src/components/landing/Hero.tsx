import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { StatChart } from "@/components/charts/StatChart"
import { Sparkles, ArrowRight, Play, Terminal, Database, CheckCircle2 } from "lucide-react"

const HERO_PROMPTS = [
  {
    id: "vinicius-mbappe",
    label: "Compare Vinicius vs Mbappé",
    spec: { chart_type: "bar" as const, title: "Vinicius Jr. vs Kylian Mbappé (xG & xA per 90)", x_key: "shortName", y_key: "value" },
    data: {
      stat: "xG + xA per 90",
      column: "value",
      filters: { season: "2025-2026", min_minutes: 500 },
      count: 2,
      players: [
        { name: "Kylian Mbappé", team: "Real Madrid", season: "2025-26", position: "FW", games: 22, minutes: 1840, value: 0.94, xg: 0.72, xa: 0.22 },
        { name: "Vinícius Júnior", team: "Real Madrid", season: "2025-26", position: "FW", games: 21, minutes: 1720, value: 0.88, xg: 0.61, xa: 0.27 },
      ],
    },
  },
  {
    id: "u21-midfielders",
    label: "Best U21 Midfielders",
    spec: { chart_type: "bar" as const, title: "Top U21 Midfielders by Key Passes per 90", x_key: "shortName", y_key: "value" },
    data: {
      stat: "Key Passes / 90",
      column: "value",
      filters: { season: "2025-2026", position: "MF" },
      count: 4,
      players: [
        { name: "Pedri", team: "Barcelona", season: "2025-26", position: "MF", games: 24, minutes: 1980, value: 3.1, xg: 0.25, xa: 0.45 },
        { name: "Jude Bellingham", team: "Real Madrid", season: "2025-26", position: "MF", games: 20, minutes: 1650, value: 2.8, xg: 0.42, xa: 0.38 },
        { name: "Gavi", team: "Barcelona", season: "2025-26", position: "MF", games: 19, minutes: 1420, value: 2.4, xg: 0.18, xa: 0.31 },
        { name: "Arda Güler", team: "Real Madrid", season: "2025-26", position: "MF", games: 18, minutes: 1100, value: 2.2, xg: 0.22, xa: 0.35 },
      ],
    },
  },
  {
    id: "xg-leaders",
    label: "Top 5 xG Leaders",
    spec: { chart_type: "bar" as const, title: "Top European Forwards by Expected Goals (xG)", x_key: "shortName", y_key: "value" },
    data: {
      stat: "xG Total",
      column: "value",
      filters: { season: "2025-2026", min_minutes: 1000 },
      count: 5,
      players: [
        { name: "Erling Haaland", team: "Man City", season: "2025-26", position: "FW", games: 23, minutes: 2010, value: 19.8, xg: 19.8, xa: 3.2 },
        { name: "Harry Kane", team: "Bayern", season: "2025-26", position: "FW", games: 22, minutes: 1920, value: 17.4, xg: 17.4, xa: 5.1 },
        { name: "Robert Lewandowski", team: "Barcelona", season: "2025-26", position: "FW", games: 24, minutes: 1880, value: 15.2, xg: 15.2, xa: 2.8 },
        { name: "Kylian Mbappé", team: "Real Madrid", season: "2025-26", position: "FW", games: 22, minutes: 1840, value: 14.7, xg: 14.7, xa: 4.5 },
        { name: "Mohamed Salah", team: "Liverpool", season: "2025-26", position: "FW", games: 23, minutes: 1950, value: 13.9, xg: 13.9, xa: 8.2 },
      ],
    },
  },
]

export function Hero() {
  const [activePrompt, setActivePrompt] = useState(HERO_PROMPTS[0])
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      
      {/* Subtle Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header Content */}
        <div className="mx-auto max-w-3xl text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Understat DB Live Intelligence</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="font-sans text-4xl font-black tracking-tight text-foreground sm:text-6xl sm:leading-[1.15]">
            AI-Powered <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Football Intelligence
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed sm:text-xl max-w-2xl mx-auto">
            Analyze players, compare performances, scout talents, and discover tactical insights using natural language.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/app")}
              size="lg"
              className="w-full sm:w-auto rounded-xl gap-2 font-bold shadow-lg shadow-primary/20"
            >
              <span>Start Free</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-xl gap-2 border-border"
            >
              <a href="#prompts">
                <Play className="h-4 w-4 text-primary fill-primary" />
                <span>Explore Prompts</span>
              </a>
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span>50+ Top Leagues</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span>100% Data Fidelity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span>Instant AI Visuals</span>
            </div>
          </div>

        </div>

        {/* Interactive Live Query Sandbox Container */}
        <div className="mt-14 max-w-4xl mx-auto">
          <Card className="overflow-hidden border-border bg-card/90 backdrop-blur-md shadow-2xl rounded-2xl">
            
            {/* Sandbox Header / Terminal Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="h-4 w-px bg-border mx-1" />
                <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span>Futbolista Sandbox Terminal</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1 text-[11px] font-mono border-primary/30 text-primary">
                  <Database className="h-3 w-3" />
                  <span>Understat Live</span>
                </Badge>
              </div>
            </div>

            {/* Prompt Selector Chips */}
            <div className="p-4 bg-muted/20 border-b border-border">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-semibold text-muted-foreground shrink-0">Try Query:</span>
                {HERO_PROMPTS.map((prompt) => {
                  const isActive = activePrompt.id === prompt.id
                  return (
                    <button
                      key={prompt.id}
                      onClick={() => setActivePrompt(prompt)}
                      className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                      }`}
                    >
                      {prompt.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Live Chart Preview Canvas */}
            <CardContent className="p-6">
              <div className="transition-all duration-300">
                <StatChart spec={activePrompt.spec} data={activePrompt.data} />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono text-[11px]">Query: "{activePrompt.data.stat}" across Top 5 Leagues</span>
                <Button
                  onClick={() => navigate(`/app?q=${encodeURIComponent(activePrompt.label)}`)}
                  variant="ghost"
                  size="xs"
                  className="gap-1 text-primary hover:text-primary"
                >
                  <span>Open Query in App</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>

          </Card>
        </div>

      </div>
    </section>
  )
}
