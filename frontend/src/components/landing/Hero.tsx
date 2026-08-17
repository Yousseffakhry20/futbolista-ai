import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, CornerDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TacticalTrace } from "@/components/TacticalTrace"

const queries = [
  { label: "Compare Vinícius and Mbappé", filter: "FW · La Liga · 2025–26", result: "0.94", metric: "xG + xA / 90" },
  { label: "Find U21 midfield creators", filter: "MF · U21 · Top 5 leagues", result: "3.10", metric: "key passes / 90" },
  { label: "Rank xG leaders", filter: "FW · 1,000+ minutes", result: "19.8", metric: "expected goals" },
]

export function Hero() {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const query = queries[active]
  return <section className="border-b border-border" aria-labelledby="hero-title">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:px-8">
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .38 }} className="flex flex-col justify-center">
        <p className="utility-label mb-5 text-primary">Live analysis / 2025–26</p>
        <motion.h1
          id="hero-title"
          className="group max-w-xl cursor-default font-heading text-5xl font-semibold leading-[.95] tracking-[-.06em] text-foreground sm:text-6xl lg:text-7xl"
          whileHover={reducedMotion ? undefined : "inspect"}
          initial="rest"
        >
          <motion.span className="relative block" variants={{ rest: { y: 0 }, inspect: { y: -3 } }} transition={{ duration: .18, ease: "easeOut" }}>
            Turn a football
            {/* <span className="pointer-events-none absolute -left-8 top-1/2 hidden -translate-y-1/2 -translate-x-1 text-[9px] font-mono font-medium tracking-[.12em] text-primary opacity-0 transition-all duration-150 group-hover:-translate-x-2 group-hover:opacity-100 motion-reduce:hidden lg:block">01 / QUESTION</span> */}
          </motion.span>
          <motion.span className="relative mt-1 block" variants={{ rest: { y: 0 }, inspect: { y: 3 } }} transition={{ duration: .18, ease: "easeOut" }}>
            question into <span className="transition-colors duration-150 group-hover:text-primary">evidence.</span>
            {/* <span className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 translate-x-1 text-[9px] font-mono font-medium tracking-[.12em] text-primary opacity-0 transition-all duration-150 group-hover:translate-x-2 group-hover:opacity-100 motion-reduce:hidden lg:block">02 / EVIDENCE</span> */}
          </motion.span>
        </motion.h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">Compare players, inspect the filters behind each result, and work from Understat-derived data without building a spreadsheet first.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button onClick={() => navigate("/app")} size="lg" className="rounded-md font-semibold"><span>Enter workspace</span><ArrowRight /></Button><a href="#method" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"><CornerDownRight className="h-4 w-4" />How the data is used</a></div>
      </motion.div>
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .12 }} className="border border-border bg-card p-4 sm:p-6">
        <div className="flex items-center justify-between border-b border-border pb-3"><span className="utility-label">Analysis relay</span><span className="font-mono text-[11px] text-primary">LIVE DATA PATH</span></div>
        <div className="mt-5 grid gap-3" role="tablist" aria-label="Example queries">{queries.map((item, i) => <button key={item.label} onClick={() => setActive(i)} role="tab" aria-selected={active === i} className={`grid min-h-12 grid-cols-[20px_1fr] items-center gap-3 border-l-2 px-3 text-left text-sm transition-colors ${active === i ? "border-primary bg-secondary text-foreground" : "border-transparent text-muted-foreground hover:bg-muted"}`}><span className="font-mono text-[11px]">0{i + 1}</span><span>{item.label}</span></button>)}</div>
        <div className="mt-6 grid border-y border-border py-5 sm:grid-cols-[1fr_160px] sm:gap-8"><div><p className="utility-label">Parsed filters</p><p className="mt-2 font-mono text-xs text-foreground">{query.filter}</p><TacticalTrace key={active} className="mt-4 h-20 w-full" /></div><div className="mt-4 border-l border-border pl-4 sm:mt-0"><p className="utility-label">Result</p><p className="mt-2 font-mono text-4xl font-medium text-primary">{query.result}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{query.metric}</p></div></div>
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">Question → filters → data points → report</p>
      </motion.div>
    </div>
  </section>
}
