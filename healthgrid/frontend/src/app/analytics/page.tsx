"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3, Activity, HeartPulse, Stethoscope, ArrowUpRight } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">System Analytics</h2>
        <p className="text-muted-foreground mt-1">Macro-level performance KPIs and resource utilization metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Average Response Time", value: "14 mins", icon: Activity, color: "text-emerald-500" },
          { title: "Patient Throughput", value: "1.2M/day", icon: HeartPulse, color: "text-cyan-500" },
          { title: "Staff Attendance", value: "88.4%", icon: Stethoscope, color: "text-amber-500" },
          { title: "Supply Chain Uptime", value: "99.9%", icon: BarChart3, color: "text-blue-500" }
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:bg-slate-900/60 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
              </div>
              <div className={`p-3 rounded-xl bg-slate-800/50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Regional Resource Distribution</CardTitle>
            <CardDescription>Percentage of critical supplies allocated per zone.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: "Northern Zone", val: 35, color: "bg-blue-500" },
              { label: "Western Zone", val: 28, color: "bg-emerald-500" },
              { label: "Southern Zone", val: 22, color: "bg-amber-500" },
              { label: "Eastern Zone", val: 15, color: "bg-purple-500" }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-300">{item.label}</span>
                  <span className="text-slate-400">{item.val}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Monthly Patient Footfall</CardTitle>
            <CardDescription>Aggregate hospital visits across the network (Millions).</CardDescription>
          </CardHeader>
          <CardContent className="flex items-end justify-between h-64 pb-4">
            {[2.1, 2.4, 2.3, 2.8, 3.5, 4.2, 4.0, 3.8, 3.1, 2.9, 2.6, 2.4].map((val, i) => (
              <div key={i} className="w-full h-full mx-1 flex flex-col justify-end group">
                <div 
                  className="w-full bg-cyan-500/50 group-hover:bg-cyan-400 rounded-t-sm transition-all relative"
                  style={{ height: `${(val / 4.5) * 100}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded">
                    {val}M
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
