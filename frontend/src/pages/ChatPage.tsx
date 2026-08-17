import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { ChatMessage } from "@/types/chat"
import { sendChatMessage } from "@/lib/api"
import { ChatSidebar } from "@/components/chat/ChatSidebar"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { EmptyState } from "@/components/chat/EmptyState"
import { MessageItem } from "@/components/chat/MessageItem"
import { ChatInputBar } from "@/components/chat/ChatInputBar"
import { Skeleton } from "@/components/ui/skeleton"
import { CommandMenu } from "@/components/CommandMenu"
import { ArrowDown, AlertCircle } from "lucide-react"

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function ChatPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get("q")

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeThreadId, setActiveThreadId] = useState("1")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userScrolledUp, setUserScrolledUp] = useState(false)
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  // Handle URL query parameter if launched from Landing page
  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      handleSend(initialQuery)
    }
  }, [initialQuery])

  // Detect scroll position to pause autoscroll
  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100
    setUserScrolledUp(!isAtBottom)
  }

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    setUserScrolledUp(false)
  }

  useEffect(() => {
    if (!userScrolledUp) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages, loading, userScrolledUp])

  const handleSend = async (text: string) => {
    setError(null)
    const userMsg: ChatMessage = { id: uid(), role: "user", text }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.text,
      }))
      const res = await sendChatMessage(text, history)
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          text: res.text || "Here is the tactical stat breakdown.",
          chartSpec: res.chartSpec,
          data: res.data,
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to retrieve statistics from server.")
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
      
      {/* Collapsible Sidebar */}
      <ChatSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeThreadId={activeThreadId}
        onSelectThread={(id) => setActiveThreadId(id)}
        onNewChat={handleNewChat}
      />

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        
        {/* Workspace Header */}
        <ChatHeader
          isSidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNewChat={handleNewChat}
        />

        {/* Scrollable Message Feed / Empty State Canvas */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="flex-1 overflow-y-auto px-4 py-6 md:px-8"
        >
          {messages.length === 0 ? (
            <EmptyState onSelectPrompt={handleSend} />
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {messages.map((m) => (
                <MessageItem
                  key={m.id}
                  message={m}
                  onRetry={m.role === "assistant" ? () => handleSend(messages[messages.length - 2]?.text || "") : undefined}
                />
              ))}

              {/* Loading Skeleton Indicator */}
              {loading && (
                <div className="space-y-4 max-w-4xl pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span>Querying Understat DB & generating metrics…</span>
                  </div>
                  <Skeleton className="h-28 w-full rounded-2xl" />
                </div>
              )}

              {/* Error Alert Box */}
              {error && (
                <div className="flex items-center justify-between rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={() => handleSend(messages[messages.length - 1]?.text || "")}
                    className="font-bold underline hover:opacity-80"
                  >
                    Retry Query
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Autoscroll Badge */}
        {userScrolledUp && (
          <div className="relative z-10 flex justify-center pb-2">
            <button
              onClick={scrollToBottom}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-lg hover:border-primary/50"
            >
              <span>New responses below</span>
              <ArrowDown className="h-3.5 w-3.5 text-primary" />
            </button>
          </div>
        )}

        {/* Sticky Input Bar */}
        <ChatInputBar onSend={handleSend} disabled={loading} />

      </div>

      {/* Global ⌘K Command Menu */}
      <CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} />

    </div>
  )
}
