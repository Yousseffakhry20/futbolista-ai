import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SendHorizonal } from "lucide-react"

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState("")

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex items-center gap-2 border-t border-line-700 bg-pitch-900/90 p-3 backdrop-blur-sm">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask e.g. 'Top 10 by xG this season' or 'best xA midfielders at Arsenal'…"
        disabled={disabled}
      />
      <Button onClick={submit} disabled={disabled || !value.trim()} size="icon" aria-label="Send">
        <SendHorizonal className="h-4 w-4" />
      </Button>
    </div>
  )
}
