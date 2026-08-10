import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Plus,
  MessageSquare,
  Search,
  Bookmark,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Activity,
  Trash2,
  SlidersHorizontal,
  LogOut,
} from "lucide-react"

export interface ChatThread {
  id: string
  title: string
  timestamp: string
  group: "Today" | "Yesterday" | "Previous 7 Days"
  messageCount: number
}

const MOCK_HISTORY: ChatThread[] = [
  { id: "1", title: "Vinicius Jr. vs Mbappé xG", timestamp: "10m ago", group: "Today", messageCount: 4 },
  { id: "2", title: "Best U21 Midfielders 2025-26", timestamp: "2h ago", group: "Today", messageCount: 6 },
  { id: "3", title: "Mohamed Salah 5-Season Trend", timestamp: "1d ago", group: "Yesterday", messageCount: 3 },
  { id: "4", title: "Rodri Tactical Alternatives", timestamp: "3d ago", group: "Previous 7 Days", messageCount: 8 },
  { id: "5", title: "Arsenal Defense Expected Goals", timestamp: "5d ago", group: "Previous 7 Days", messageCount: 5 },
]

export function ChatSidebar({
  isCollapsed,
  onToggleCollapse,
  activeThreadId,
  onSelectThread,
  onNewChat,
}: {
  isCollapsed: boolean
  onToggleCollapse: () => void
  activeThreadId: string
  onSelectThread: (id: string) => void
  onNewChat: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [threads, setThreads] = useState<ChatThread[]>(MOCK_HISTORY)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setThreads((prev) => prev.filter((t) => t.id !== id))
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-card text-card-foreground border-r border-border font-sans">
      
      {/* Header & Logo */}
      <div className="flex h-14 items-center justify-between px-3 border-b border-border/60">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90 px-1"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 text-primary">
            <Activity className="h-4 w-4" />
          </div>
          <span className="font-sans text-base font-bold tracking-tight text-foreground">
            Futbolista<span className="text-primary">AI</span>
          </span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onToggleCollapse}
                variant="ghost"
                size="xs"
                className="hidden md:flex text-muted-foreground hover:text-foreground"
                aria-label="Toggle Sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Collapse Sidebar (⌘B)</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Primary New Chat Button */}
      <div className="p-3">
        <Button
          onClick={() => {
            onNewChat()
            setMobileOpen(false)
          }}
          className="w-full rounded-xl gap-2 font-semibold shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>New Analysis</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-4 select-none items-center rounded border border-primary-foreground/30 px-1 font-mono text-[10px]">
            ⌘N
          </kbd>
        </Button>
      </div>

      {/* Search Input */}
      <div className="px-3 pb-2">
        <div className="relative">
          <label htmlFor="sidebar-search" className="sr-only">Search chat history</label>
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            id="sidebar-search"
            aria-label="Search chat history"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history…"
            className="h-8 rounded-lg pl-8 text-xs bg-muted/40"
          />
        </div>
      </div>

      <Separator />

      {/* Thread List */}
      <ScrollArea className="flex-1 px-2 py-2">
        {filteredThreads.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No conversations found.
          </div>
        ) : (
          <div className="space-y-4">
            {["Today", "Yesterday", "Previous 7 Days"].map((groupName) => {
              const groupThreads = filteredThreads.filter((t) => t.group === groupName)
              if (groupThreads.length === 0) return null

              return (
                <div key={groupName} className="space-y-1">
                  <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {groupName}
                  </div>
                  {groupThreads.map((thread) => {
                    const isActive = thread.id === activeThreadId
                    return (
                      <div
                        key={thread.id}
                        onClick={() => {
                          onSelectThread(thread.id)
                          setMobileOpen(false)
                        }}
                        className={`group flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs transition-colors cursor-pointer ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="truncate">{thread.title}</span>
                        </div>
                        <Button
                          onClick={(e) => handleDeleteThread(thread.id, e)}
                          variant="ghost"
                          size="xs"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>

      <Separator />

      {/* Footer Profile & Settings */}
      <div className="p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
            FA
          </div>
          <div className="flex flex-col truncate">
            <span className="font-semibold text-foreground truncate">Analyst Pro</span>
            <span className="text-[10px] text-muted-foreground font-mono">Understat DB</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="xs" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

    </div>
  )

  return (
    <>
      {/* Desktop Collapsible Sidebar (260px expanded vs 0px collapsed) */}
      <aside
        className={`hidden md:block h-screen shrink-0 transition-all duration-200 ${
          isCollapsed ? "w-0 overflow-hidden" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Trigger Button (Fixed floating top-left) */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              className="fixed left-3 top-3.5 z-30 rounded-xl border-border bg-background/80 backdrop-blur-md shadow-sm"
              aria-label="Open Mobile Sidebar"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r border-border">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
