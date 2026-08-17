import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { SendHorizonal, Mic, MicOff, Sparkles } from "lucide-react"

export function ChatInputBar({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [value])

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey || !e.shiftKey)) {
      e.preventDefault()
      submit()
    }
  }

  const toggleVoice = () => {
    setIsListening((prev) => !prev)
  }

  return (
    <TooltipProvider>
      <div className="relative mx-auto w-full max-w-3xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-2 transition-colors focus-within:border-primary">
          
          <label htmlFor="chat-input" className="sr-only">Ask a football intelligence question</label>
          <Textarea
            id="chat-input"
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Ask a football intelligence question"
            placeholder="Ask e.g. 'Compare Vinicius vs Mbappé' or 'Top 10 players by xG this season'…"
            disabled={disabled}
            rows={1}
            className="min-h-[48px] max-h-[160px] border-0 bg-transparent px-3 py-2 text-sm text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
          />

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1 px-2 border-t border-border/40">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px]">
                <Sparkles className="h-3 w-3 text-primary" />
                Understat DB
              </span>
            </div>

            <div className="flex items-center gap-2">
              
              {/* Optional Voice Button Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={toggleVoice}
                    variant={isListening ? "default" : "ghost"}
                    size="icon-xs"
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                    className={`rounded-lg transition-colors ${
                      isListening ? "bg-red-500 text-white hover:bg-red-600" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isListening ? <Mic className="h-3.5 w-3.5 animate-pulse" /> : <MicOff className="h-3.5 w-3.5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isListening ? "Listening... Click to stop" : "Voice input"}</TooltipContent>
              </Tooltip>

              {/* Submit Send Button */}
              <Button
                onClick={submit}
                disabled={disabled || !value.trim()}
                size="sm"
                aria-label="Send message"
                className="h-8 rounded-md gap-1.5 font-semibold px-3 shadow-none"
              >
                <span>Send</span>
                <SendHorizonal className="h-3.5 w-3.5" />
              </Button>

            </div>
          </div>

        </div>

        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Understat-derived rows are shown with each returned result. Press <kbd className="font-mono text-[10px] bg-muted px-1 rounded">⌘ + Enter</kbd> to send.
        </p>

      </div>
    </TooltipProvider>
  )
}
