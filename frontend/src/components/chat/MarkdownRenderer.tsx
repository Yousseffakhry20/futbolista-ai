import ReactMarkdown from "react-markdown"

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 className="font-sans text-xl font-bold tracking-tight text-foreground mb-2 mt-4">{children}</h1>,
        h2: ({ children }) => <h2 className="font-sans text-lg font-bold tracking-tight text-foreground mb-2 mt-3">{children}</h2>,
        h3: ({ children }) => <h3 className="font-sans text-base font-semibold tracking-tight text-foreground mb-1.5 mt-2">{children}</h3>,
        p: ({ children }) => <p className="text-sm leading-relaxed text-foreground/90 mb-3.5 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside text-sm text-foreground/90 mb-3 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside text-sm text-foreground/90 mb-3 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-sm leading-relaxed text-foreground/90">{children}</li>,
        code: ({ children }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-primary">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-xs text-foreground mb-3">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-primary/50 pl-3 italic text-sm text-muted-foreground mb-3">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
