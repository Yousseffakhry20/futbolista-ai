import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, Trophy, TrendingUp, Compass, ArrowRight } from "lucide-react"

export interface PromptOption {
  hotkey: string
  category: string
  icon: any
  title: string
  query: string
}

const SUGGESTED_PROMPTS: PromptOption[] = [
  {
    hotkey: "1",
    category: "Player Comparison",
    icon: Users,
    title: "Compare Vinicius Jr. and Kylian Mbappé",
    query: "Compare Vinicius Jr. and Kylian Mbappé in 2025-2026",
  },
  {
    hotkey: "2",
    category: "Scouting & Discovery",
    icon: Trophy,
    title: "Best U21 Midfielders in 2025-2026",
    query: "Who are the best U21 midfielders in the 2025-2026 season?",
  },
  {
    hotkey: "3",
    category: "Performance Analysis",
    icon: TrendingUp,
    title: "Analyze Mohamed Salah's Last 5 Seasons",
    query: "Analyze Mohamed Salah's last 5 seasons",
  },
  {
    hotkey: "4",
    category: "Tactical Similarity",
    icon: Compass,
    title: "Find Players Similar to Rodri",
    query: "Find players similar to Rodri in top European leagues",
  },
]

export function EmptyState({ onSelectPrompt }: { onSelectPrompt: (query: string) => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-16 text-center space-y-10">
      
      {/* Welcome Hero Banner */}
      <div className="space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary shadow-lg shadow-primary/10">
          <Sparkles className="h-7 w-7" />
        </div>
        
        <Badge variant="outline" className="border-primary/30 text-primary gap-1.5 font-mono text-xs">
          <span>Understat Database Active</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        </Badge>

        <h1 className="font-sans text-2xl font-black tracking-tight text-foreground sm:text-4xl">
          What football intelligence can I analyze for you today?
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Ask questions in natural language to query expected goals (xG), expected assists (xA), scouting profiles, and tactical metrics across top European leagues.
        </p>
      </div>

      {/* Categorized 2x2 Prompt Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Suggested Analysis Starters
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">Press 1-4 to select</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {SUGGESTED_PROMPTS.map((prompt) => {
            const Icon = prompt.icon
            return (
              <Card
                key={prompt.title}
                onClick={() => onSelectPrompt(prompt.query)}
                className="group relative cursor-pointer overflow-hidden border-border bg-card/80 p-4 transition-all hover:border-primary/50 hover:bg-muted/40 hover:shadow-md rounded-2xl"
              >
                <CardHeader className="p-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-semibold">
                        {prompt.category}
                      </Badge>
                    </div>

                    <kbd className="inline-flex h-5 w-5 items-center justify-center rounded border border-border bg-muted font-mono text-[10px] font-bold text-muted-foreground group-hover:border-primary/40 group-hover:text-primary">
                      {prompt.hotkey}
                    </kbd>
                  </div>

                  <CardTitle className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{prompt.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </CardTitle>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

    </div>
  )
}
