import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Sparkles, Menu, Search, ArrowRight, Activity } from "lucide-react"

export function Navbar({ onOpenCommandMenu }: { onOpenCommandMenu?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Benefits", href: "#benefits" },
    { name: "Prompts", href: "#prompts" },
    { name: "Showcase", href: "#showcase" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo & Branding */}
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary shadow-sm">
            <Activity className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-lg font-extrabold tracking-tight text-foreground">
                Futbolista<span className="text-primary">AI</span>
              </span>
              <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary border border-primary/20">
                PRO
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-foreground active:text-primary"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions & CTAs */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search ⌘K Trigger */}
          <button
            onClick={onOpenCommandMenu}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-input bg-background/60 px-3 py-1.5 text-xs text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Quick Search"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search stats…</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </button>

          {/* Primary Launch App CTA */}
          <Button
            onClick={() => navigate("/app")}
            size="sm"
            className="rounded-xl shadow-md gap-1.5"
          >
            <span>Launch App</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>

          {/* Mobile Hamburger Sheet Drawer Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Open Mobile Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-border">
              <SheetHeader className="text-left pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Futbolista AI</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-border flex flex-col gap-3">
                  <Button
                    onClick={() => {
                      setIsOpen(false)
                      onOpenCommandMenu?.()
                    }}
                    variant="outline"
                    className="w-full justify-start gap-2 text-xs"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search Commands (⌘K)</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false)
                      navigate("/app")
                    }}
                    className="w-full gap-2"
                  >
                    <span>Start Free Workspace</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}
