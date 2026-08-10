import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 text-primary">
                <Activity className="h-4 w-4" />
              </div>
              <span className="font-sans text-lg font-bold text-foreground">
                Futbolista<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground">
              AI-powered football intelligence platform providing empirical player metrics, scouting filters, and tactical reports.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Product</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a></li>
              <li><a href="#prompts" className="hover:text-foreground transition-colors">Example Prompts</a></li>
              <li><a href="#showcase" className="hover:text-foreground transition-colors">Showcase Terminal</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Legal & Privacy</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Data Provenance</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Power User Shortcuts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Keyboard Shortcuts</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-2.5 py-1.5">
                <span>Quick Search</span>
                <kbd className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-2.5 py-1.5">
                <span>Launch Workspace</span>
                <kbd className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border">⌘N</kbd>
              </div>
            </div>
          </div>

        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Futbolista AI. All rights reserved. Powered by Understat data.</p>
          <p className="font-mono text-[11px]">Version 1.0.0 (MVP)</p>
        </div>

      </div>
    </footer>
  )
}
