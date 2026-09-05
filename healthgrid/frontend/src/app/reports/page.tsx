"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Download, Filter, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ReportsPage() {
  const reports = [
    { name: "Monthly State Health Bulletin - August", type: "PDF", size: "2.4 MB", date: "Sep 01, 2024", ai: true },
    { name: "Supply Chain Resilience Audit Q2", type: "CSV", size: "14.1 MB", date: "Aug 15, 2024", ai: false },
    { name: "Disease Outbreak Post-Mortem: Rajasthan", type: "PDF", size: "1.8 MB", date: "Aug 10, 2024", ai: true },
    { name: "National Bed Capacity Utilization", type: "XLSX", size: "8.2 MB", date: "Aug 05, 2024", ai: false },
    { name: "Emergency Response Efficiency Analysis", type: "PDF", size: "4.5 MB", date: "Jul 28, 2024", ai: true },
  ]
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports & Compliance</h2>
          <p className="text-muted-foreground mt-1">Downloadable regulatory documents and AI-generated insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search reports..." className="pl-8 bg-slate-900/50 border-slate-800" />
          </div>
          <Button variant="outline" className="border-slate-800 bg-slate-900/50"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
        </div>
      </div>

      <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-800/50">
            {reports.map((report, i) => (
              <div key={i} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 mt-1">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg text-slate-200">{report.name}</h4>
                      {report.ai && (
                        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-2 py-0 h-5">
                          <Sparkles className="h-3 w-3 mr-1" /> AI Summary
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-xs">{report.type}</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>Generated {report.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-slate-700 hover:bg-slate-800 w-full md:w-auto">
                    View
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
