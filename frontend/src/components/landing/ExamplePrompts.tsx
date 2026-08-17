import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { MessageSquare, ArrowUpRight, Copy, Check } from "lucide-react"

const PROMPTS = [
  {
    category: "Comparison",
    title: "Compare Vinicius Jr. and Kylian Mbappé",
    description: "Analyze non-penalty xG, expected assists per 90, and progressive carries in La Liga 2025-26.",
    query: "Compare Vinicius Jr. and Kylian Mbappé in 2025-2026 season",
  },
  {
    category: "Scouting",
    title: "Best U21 Midfielders in 2025-2026",
    description: "Discover young midfielders with over 2.0 key passes and 85%+ passing accuracy across top 5 leagues.",
    query: "Who are the best U21 midfielders in the 2025-2026 season?",
  },
  {
    category: "Trends",
    title: "Mohamed Salah 5-Season Analysis",
    description: "Track goal conversion rate, xG per shot, and assist trajectories over his last 5 Liverpool seasons.",
    query: "Analyze Mohamed Salah's last 5 seasons",
  },
  {
    category: "Similarity",
    title: "Find Players Similar to Rodri",
    description: "Identify defensive midfielders with matching ball-recovery rates and progressive pass numbers.",
    query: "Find players similar to Rodri",
  },
]

export function ExamplePrompts() {
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleCopy = (query: string) => {
    navigator.clipboard.writeText(query)
    setCopiedQuery(query)
    setTimeout(() => setCopiedQuery(null), 2000)
  }

  return (
    <TooltipProvider>
      <section id="prompts" className="py-28 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Badge variant="outline" className="border-accent/40 text-accent mb-3">
              Natural Language Intelligence
            </Badge>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Ask Anything. Get Instant Visual Insights.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              No SQL queries or manual formula writing required. Test these tactical prompts in the intelligence workspace.
            </p>
          </div>

          {/* 2x2 Grid of Prompt Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PROMPTS.map((prompt) => {
              const isCopied = copiedQuery === prompt.query
              return (
                <Card
                  key={prompt.title}
                  className="group relative overflow-hidden border-border bg-card/80 hover:border-primary/50 transition-all duration-300 rounded-2xl flex flex-col justify-between"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <Badge variant="secondary" className="text-[10px] font-semibold">
                          {prompt.category}
                        </Badge>
                      </div>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => handleCopy(prompt.query)}
                            variant="ghost"
                            size="xs"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {isCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{isCopied ? "Copied!" : "Copy prompt text"}</TooltipContent>
                      </Tooltip>
                    </div>

                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                      "{prompt.title}"
                    </CardTitle>
                    <CardDescription className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {prompt.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between border-t border-border/50 pt-4">
                      <span className="font-mono text-[11px] text-muted-foreground truncate max-w-[240px]">
                        {prompt.query}
                      </span>
                      <Button
                        onClick={() => navigate(`/app?q=${encodeURIComponent(prompt.query)}`)}
                        size="xs"
                        className="gap-1 rounded-lg shadow-sm font-semibold"
                      >
                        <span>Try in App</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

        </div>
      </section>
    </TooltipProvider>
  )
}
