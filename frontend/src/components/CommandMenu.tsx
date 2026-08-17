import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command"
import { MessageSquare, Sparkles, Trophy, Users, Zap, LayoutDashboard, Terminal } from "lucide-react"

export function CommandMenu({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
} = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const navigate = useNavigate()

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen
  const setIsOpen = externalOnOpenChange || setInternalOpen

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, setIsOpen])

  const runCommand = (command: () => void) => {
    setIsOpen(false)
    command()
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Type a command or search tactical stats…" />
      <CommandList>
        <CommandEmpty>No analytical results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate("/app"))}>
            <Terminal className="mr-2 h-4 w-4 text-primary" />
            <span>Launch Intelligence Workspace</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/"))}>
            <LayoutDashboard className="mr-2 h-4 w-4 text-secondary" />
            <span>Go to Landing Page</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Sample Tactical Queries">
          <CommandItem onSelect={() => runCommand(() => navigate("/app?q=Compare+Vinicius+Jr.+and+Kylian+Mbappé"))}>
            <Users className="mr-2 h-4 w-4 text-primary" />
            <span>Compare Vinicius Jr. and Kylian Mbappé</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/app?q=Best+U21+midfielders+in+2025-2026"))}>
            <Trophy className="mr-2 h-4 w-4 text-primary" />
            <span>Best U21 midfielders in 2025-2026 season</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/app?q=Top+10+players+by+xG+this+season"))}>
            <Zap className="mr-2 h-4 w-4 text-accent" />
            <span>Top 10 players by xG this season</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/app?q=Analyze+Mohamed+Salah+last+5+seasons"))}>
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span>Analyze Mohamed Salah's last 5 seasons</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => navigate("/app"))}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Start New Analysis Thread</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
