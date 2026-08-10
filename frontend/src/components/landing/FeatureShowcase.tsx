import { useNavigate } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { MessageSquare, BarChart3, Search, FileText, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react"

export function FeatureShowcase() {
  const navigate = useNavigate()

  return (
    <section id="showcase" className="py-28 border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge variant="outline" className="border-secondary/40 text-secondary mb-3">
            Analytical Platform Capabilities
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Everything You Need for Pro-Grade Football Analytics
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Switch between interactive AI conversations, multi-metric radar charts, scouting profiles, and raw tabular exports.
          </p>
        </div>

        {/* Interactive Tabbed Terminal Showcase */}
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="chat" className="w-full">
            
            {/* Tabs List */}
            <div className="flex justify-center mb-8">
              <TabsList className="flex-wrap h-auto gap-1 p-1.5 bg-card border border-border rounded-2xl shadow-sm">
                <TabsTrigger value="chat" className="gap-2 px-4 py-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>AI Tactical Chat</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2 px-4 py-2">
                  <BarChart3 className="h-4 w-4 text-secondary" />
                  <span>Performance Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="scouting" className="gap-2 px-4 py-2">
                  <Search className="h-4 w-4 text-amber-500" />
                  <span>Scouting Reports</span>
                </TabsTrigger>
                <TabsTrigger value="export" className="gap-2 px-4 py-2">
                  <FileText className="h-4 w-4 text-accent" />
                  <span>Data Export</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: AI Tactical Chat */}
            <TabsContent value="chat">
              <Card className="border-border bg-card shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-border/60 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span>Conversational Intelligence</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Ask any complex question in plain English. Get instant stats, metric breakdowns, and charts.
                      </CardDescription>
                    </div>
                    <Badge variant="default">Live AI</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                      <Zap className="h-3.5 w-3.5" />
                      <span>Natural Language Parser Active</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      "Compare Mohamed Salah and Bukayo Saka's non-penalty goals and expected assists over the last 2 seasons."
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      <span>Futbolista AI Engine</span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Over the 2024-2026 seasons, Mohamed Salah averaged 0.68 non-penalty goals/90 compared to Bukayo Saka's 0.44. However, Saka leads in xA per 90 (0.38 vs 0.31).
                    </p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => navigate("/app")} size="sm" className="gap-1.5 rounded-xl font-semibold">
                      <span>Try AI Chat</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Performance Analytics */}
            <TabsContent value="analytics">
              <Card className="border-border bg-card shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-border/60 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <BarChart3 className="h-5 w-5 text-secondary" />
                        <span>Interactive Visualizations</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Dynamic bar charts, line graphs, and scatter plots automatically rendered for every query.
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Recharts 3.1</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <div className="text-2xl font-black text-primary">0.94</div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">xG + xA / 90 (Leader)</div>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <div className="text-2xl font-black text-secondary">3.1</div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">Key Passes / 90 (U21)</div>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <div className="text-2xl font-black text-accent">19.8</div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">Expected Goals Total</div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => navigate("/app")} size="sm" className="gap-1.5 rounded-xl font-semibold">
                      <span>Explore Visuals</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 3: Scouting Reports */}
            <TabsContent value="scouting">
              <Card className="border-border bg-card shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-border/60 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <Search className="h-5 w-5 text-amber-500" />
                        <span>Talent Discovery & Scouting</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Filter 100k+ player seasons across 50+ leagues using multi-variable tactical parameters.
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-amber-500/40 text-amber-500">Scout Engine</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                      <span>Scouting Filter: U21 Midfielders (2025-26)</span>
                      <span className="text-primary">4 Matches Found</span>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead>Minutes</TableHead>
                          <TableHead>Key Passes/90</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold text-foreground">Pedri</TableCell>
                          <TableCell>Barcelona</TableCell>
                          <TableCell>1980</TableCell>
                          <TableCell className="text-primary font-bold">3.1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold text-foreground">Jude Bellingham</TableCell>
                          <TableCell>Real Madrid</TableCell>
                          <TableCell>1650</TableCell>
                          <TableCell className="text-primary font-bold">2.8</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => navigate("/app")} size="sm" className="gap-1.5 rounded-xl font-semibold">
                      <span>Launch Scout Engine</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 4: Data Export */}
            <TabsContent value="export">
              <Card className="border-border bg-card shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-border/60 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <FileText className="h-5 w-5 text-accent" />
                        <span>Data Export & Report Generation</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Export analytical datasets to CSV, copy formatted Markdown tables, or download high-resolution PNG charts.
                      </CardDescription>
                    </div>
                    <Badge variant="accent">CSV / PNG / MD</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3 rounded-xl border border-border p-4 bg-muted/20">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-foreground">CSV Raw Export</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Download full dataset tables for Excel/Python.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-border p-4 bg-muted/20">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-foreground">Markdown Tables</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Copy tables directly into Notion or articles.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-border p-4 bg-muted/20">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-foreground">PNG Chart Graphics</div>
                        <div className="text-xs text-muted-foreground mt-0.5">High-res charts ready for Twitter or reports.</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => navigate("/app")} size="sm" className="gap-1.5 rounded-xl font-semibold">
                      <span>Try Data Export</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>

      </div>
    </section>
  )
}
