import { motion, useReducedMotion } from "framer-motion"

export function TacticalTrace({ className = "", active = true }: { className?: string; active?: boolean }) {
  const reducedMotion = useReducedMotion()
  return <svg className={className} viewBox="0 0 380 110" fill="none" aria-hidden="true" preserveAspectRatio="none">
    <path d="M2 18H86L118 52H208L238 84H378" stroke="#343434" strokeWidth="1" />
    <motion.path d="M2 18H86L118 52H208L238 84H378" stroke="#D8B336" strokeWidth="2" strokeLinecap="square" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active || reducedMotion ? 1 : 0, opacity: 1 }} transition={{ duration: reducedMotion ? 0 : .72, ease: "easeOut" }} />
    {[2, 118, 238, 378].map((cx, index) => <motion.circle key={cx} cx={cx} cy={[18, 52, 84, 84][index]} r="3" fill="#D8B336" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : .16 + index * .14 }} />)}
  </svg>
}
