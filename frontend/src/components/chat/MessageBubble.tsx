import type { ChatMessage } from "@/types/chat"
import { StatChart } from "@/components/charts/StatChart"

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-amber px-4 py-2.5 text-sm font-medium text-pitch-950">
          {message.text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      {/* dashed vertical rule — the "formation sheet" motif */}
      <div className="mt-1.5 flex w-4 shrink-0 justify-center">
        <div className="w-px flex-1 border-l border-dashed border-line-600" />
      </div>
      <div className="flex-1 space-y-3 pb-2">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-chalk">{message.text}</p>
        {message.chartSpec && message.data && (
          <StatChart spec={message.chartSpec} data={message.data} />
        )}
      </div>
    </div>
  )
}
