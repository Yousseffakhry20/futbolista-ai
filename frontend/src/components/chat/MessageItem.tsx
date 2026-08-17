import { useState } from "react"
import type { ChatMessage } from "@/types/chat"
import { StatChart } from "@/components/charts/StatChart"
import { MarkdownRenderer } from "@/components/chat/MarkdownRenderer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Copy, Check, BarChart2, Table as TableIcon, RefreshCw, Activity, User } from "lucide-react"
import { TacticalTrace } from "@/components/TacticalTrace"
import { motion, useReducedMotion } from "framer-motion"

export function MessageItem({
  message,
  onRetry,
}: {
  message: ChatMessage
  onRetry?: () => void
}) {
  const isUser = message.role === "user"
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart")
  const [copied, setCopied] = useState(false)
  const reducedMotion = useReducedMotion()

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isUser) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .16 }} className="flex justify-end mb-6">
        <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[75%]">
          <div className="border-l-2 border-primary bg-secondary px-4 py-3 text-sm text-foreground font-sans">
            {message.text}
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted border border-border text-muted-foreground">
            <User className="h-4 w-4" />
          </div>
        </div>
      </motion.div>
    )
  }

  const hasData = message.chartSpec && message.data && message.data.players.length > 0

  return (
    <TooltipProvider>
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }} className="flex gap-3.5 mb-8">
        
        {/* Assistant Avatar */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary mt-0.5">
          <Activity className="h-4 w-4" />
        </div>

        {/* Message Content Body */}
        <div className="flex-1 space-y-4 overflow-hidden">
          <div className="flex items-center gap-3"><span className="utility-label text-primary">Analysis report</span><span className="h-px flex-1 bg-border" /></div>
          
          {/* Text Response / Markdown */}
          <div className="text-sm leading-relaxed text-foreground">
            <MarkdownRenderer content={message.text} />
          </div>

          {/* Dual-View Chart vs Accessible Table Canvas */}
          {hasData && (
            <div className="border border-border bg-card overflow-hidden shadow-none">
              
              {/* Dual-View Control Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">Visual Analytics</span>
                  <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                    {message.data?.count} Players
                  </Badge>
                </div>

                {/* Chart vs Table Toggle Buttons */}
                <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-0.5">
                  <Button
                    onClick={() => setViewMode("chart")}
                    variant={viewMode === "chart" ? "default" : "ghost"}
                    size="xs"
                    className="h-6 gap-1 text-[11px] rounded-md px-2"
                  >
                    <BarChart2 className="h-3 w-3" />
                    <span>Chart</span>
                  </Button>
                  <Button
                    onClick={() => setViewMode("table")}
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="xs"
                    className="h-6 gap-1 text-[11px] rounded-md px-2"
                  >
                    <TableIcon className="h-3 w-3" />
                    <span>Table</span>
                  </Button>
                </div>
              </div>

              {/* View Content Canvas */}
              <div className="p-4">
                <TacticalTrace className="mb-2 h-10 w-full" />
                {viewMode === "chart" ? (
                  <StatChart spec={message.chartSpec!} data={message.data!} />
                ) : (
                  <Table role="table" aria-label={message.chartSpec?.title || "Player Statistics Table"}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Season</TableHead>
                        <TableHead>Games</TableHead>
                        <TableHead>Minutes</TableHead>
                        <TableHead className="text-right">Stat Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {message.data?.players.map((p, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-semibold text-foreground">{p.name}</TableCell>
                          <TableCell>{p.team}</TableCell>
                          <TableCell>{p.season}</TableCell>
                          <TableCell>{p.games}</TableCell>
                          <TableCell>{p.minutes}</TableCell>
                          <TableCell className="text-right font-bold text-primary">{p.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

            </div>
          )}

          {/* Action Bar (Copy, Retry) */}
          <div className="flex items-center gap-2 pt-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="xs"
                  aria-label="Copy message text"
                  className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy message markdown</TooltipContent>
            </Tooltip>

            {onRetry && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onRetry}
                    variant="ghost"
                    size="xs"
                    aria-label="Regenerate AI query response"
                    className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Regenerate</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Retry query response</TooltipContent>
              </Tooltip>
            )}
          </div>

        </div>

      </motion.div>
    </TooltipProvider>
  )
}
