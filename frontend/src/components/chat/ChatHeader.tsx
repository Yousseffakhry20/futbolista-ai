import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { PanelLeft, Download, FileSpreadsheet, FileText, ArrowLeft, Share2, Plus } from "lucide-react"

export function ChatHeader({
  isSidebarCollapsed,
  onToggleSidebar,
  onNewChat,
  chatTitle = "Tactical Analysis Thread",
}: {
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
  onNewChat: () => void
  chatTitle?: string
}) {
  const navigate = useNavigate()

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-border bg-background px-4">
        
        {/* Left Toggles & Title */}
        <div className="flex items-center gap-3">
          
          {/* Sidebar Expand Button (visible if collapsed on desktop) */}
          {isSidebarCollapsed && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleSidebar}
                  variant="ghost"
                  size="xs"
                  className="hidden md:flex text-muted-foreground hover:text-foreground"
                >
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Expand Sidebar (⌘B)</TooltipContent>
            </Tooltip>
          )}

          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="xs"
            className="gap-1 text-muted-foreground hover:text-foreground text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Landing</span>
          </Button>

          <div className="h-4 w-px bg-border hidden sm:block" />

          {/* Active Conversation Title */}
          <div className="flex items-center gap-2">
            <h2 className="font-sans text-sm font-bold tracking-tight text-foreground truncate max-w-[200px] sm:max-w-xs">
              {chatTitle}
            </h2>
            <Badge variant="outline" className="hidden sm:inline-flex gap-1 rounded-sm text-[10px] border-primary/50 text-primary font-mono">
              <span>UNDERSTAT ROWS</span>
            </Badge>
          </div>
        </div>

        {/* Right Actions & Export Dropdown */}
        <div className="flex items-center gap-2">
          
          <Button
            onClick={onNewChat}
            variant="outline"
            size="xs"
            className="gap-1.5 rounded-lg text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </Button>

          {/* Export Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="xs" className="gap-1.5 rounded-lg text-xs">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Export Dataset</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <FileSpreadsheet className="h-4 w-4 text-green-500" />
                <span>Export as CSV</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <span>Copy Markdown Table</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                <span>Share Analysis Link</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

      </header>
    </TooltipProvider>
  )
}
