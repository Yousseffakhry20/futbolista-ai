import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Database, FileSearch, Radar } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { Footer } from "@/components/landing/Footer"
import { CommandMenu } from "@/components/CommandMenu"

const modules = [
  ["01", "Player analysis", "Compare output, role, and availability with the filters visible beside the result.", Radar],
  ["02", "Team patterns", "Ask for a team view when a player number needs tactical context.", FileSearch],
  ["03", "Scout profiles", "Turn a role and a constraint into a short, inspectable candidate list.", Database],
]
const records = [
  ["Comparison", "Vinícius Jr. vs Kylian Mbappé", "xG, xA and progression per 90", "Compare Vinicius Jr. and Kylian Mbappé in 2025-2026 season"],
  ["Discovery", "U21 midfield creators", "Key passes with minutes and league filters", "Who are the best U21 midfielders in the 2025-2026 season?"],
  ["Trend", "Mohamed Salah over five seasons", "Track changing output, not one headline number", "Analyze Mohamed Salah's last 5 seasons"],
]

export function LandingPage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const reveal = reducedMotion ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .32 } }
  return <div className="min-h-screen bg-background text-foreground"><Navbar onOpenCommandMenu={() => setCommandMenuOpen(true)} /><main id="main-content"><Hero />
    <motion.section {...reveal} id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"><div className="grid gap-8 border-b border-border pb-8 lg:grid-cols-[.55fr_1fr]"><div><p className="utility-label text-primary">Working modes</p><h2 className="mt-3 max-w-xs text-3xl font-semibold tracking-[-.04em]">Analysis should show its workings.</h2></div><p className="max-w-xl self-end leading-7 text-muted-foreground">Every result is an opportunity to inspect the question, constraints, and numbers that informed it. The interface stays quiet so the evidence can carry the decision.</p></div><div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">{modules.map(([number, title, copy, Icon]) => { const Glyph = Icon as typeof Radar; return <article key={number as string} className="px-0 py-8 md:px-7 first:md:pl-0"><p className="font-mono text-xs text-primary">{number as string}</p><Glyph className="mt-9 h-5 w-5 text-foreground" /><h3 className="mt-5 text-lg font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy as string}</p></article>})}</div></motion.section>
    <motion.section {...reveal} id="prompts" className="border-y border-border bg-card"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="utility-label text-primary">Sample records</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Start with a question worth checking.</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">These become editable questions in the workspace.</p></div><div className="mt-10 border-t border-border">{records.map(([type, title, description, query], i) => <button key={title} onClick={() => navigate(`/app?q=${encodeURIComponent(query)}`)} className="group grid w-full gap-3 border-b border-border py-5 text-left transition-colors hover:bg-secondary sm:grid-cols-[70px_1fr_1fr_36px] sm:items-center sm:px-3"><span className="font-mono text-xs text-primary">0{i + 1}</span><div><p className="utility-label">{type}</p><p className="mt-1 text-base font-medium text-foreground">{title}</p></div><p className="text-sm text-muted-foreground">{description}</p><ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" /></button>)}</div></div></motion.section>
    <motion.section {...reveal} id="method" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="utility-label text-primary">Data and method</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Grounded answers, not decorative dashboards.</h2></div><div className="border-l border-primary pl-5"><p className="text-lg leading-8 text-foreground">Futbolista turns a natural-language request into a defined data query. Charts render from returned rows—not generated prose—so the visual always traces back to the same player-season data.</p><div className="mt-8 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2"><p><span className="block font-mono text-xs text-primary">SOURCE</span><span className="mt-2 block">Understat-derived player and season statistics.</span></p><p><span className="block font-mono text-xs text-primary">BOUNDARY</span><span className="mt-2 block">Results depend on the selected metric, season, team, position, and minutes filters.</span></p></div></div></div></motion.section>
  </main><Footer /><CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} /></div>
}
