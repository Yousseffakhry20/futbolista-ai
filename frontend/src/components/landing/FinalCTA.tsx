import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function FinalCTA() {
  const navigate = useNavigate()

  return (
    <section className="py-28 border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card to-primary/10 p-8 sm:p-12 md:p-16 text-center shadow-2xl">
          
          {/* Subtle Glow Circle */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />

          <Badge variant="outline" className="border-primary/40 text-primary mb-4 gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Instant Intelligence Workspace</span>
          </Badge>

          <h2 className="font-sans text-3xl font-black tracking-tight text-foreground sm:text-5xl max-w-3xl mx-auto leading-tight">
            Start Exploring Football Intelligence Today
          </h2>

          <p className="mt-4 text-base text-muted-foreground leading-relaxed sm:text-lg max-w-2xl mx-auto">
            Join thousands of analysts, scouts, journalists, and fans discovering empirical football metrics in seconds.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/app")}
              size="lg"
              className="w-full sm:w-auto rounded-xl gap-2 font-bold shadow-xl shadow-primary/25"
            >
              <span>Start Free Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-6 text-xs font-mono text-muted-foreground">
            No credit card required · Free access to Understat datasets
          </p>

        </div>
      </div>
    </section>
  )
}
