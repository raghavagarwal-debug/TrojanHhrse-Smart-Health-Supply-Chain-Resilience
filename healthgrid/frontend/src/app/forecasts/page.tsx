"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, Activity, BrainCircuit, BarChart2 } from "lucide-react"

export default function ForecastsPage() {
  // Mock data for a CSS-based bar chart
  const chartData = [40, 45, 55, 70, 85, 100, 95, 80, 60, 50, 45, 40];
  const labels = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12"];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI Demand Forecasts</h2>
        <p className="text-muted-foreground mt-1">Machine Learning predictions for medicine and resource utilization.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 bg-slate-900/40 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-purple-500" /> Antibiotic Demand Trajectory</CardTitle>
                <CardDescription>Predicted consumption over the next 12 days across all active PHCs.</CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">
                <BrainCircuit className="h-3 w-3" />
                Gemini AI Active
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 pt-10">
              {chartData.map((val, i) => (
                <div key={i} className="w-full h-full flex flex-col justify-end items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {val * 120} units
                  </div>
                  {/* Bar */}
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-500 ${val > 80 ? 'bg-red-500/80 hover:bg-red-400' : val > 60 ? 'bg-amber-500/80 hover:bg-amber-400' : 'bg-purple-500/80 hover:bg-purple-400'}`}
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[10px] text-slate-500">{labels[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Confidence Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">92.4%</div>
              <p className="text-xs text-emerald-400 mt-2">Highly accurate historical correlation</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Key AI Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <p className="text-sm text-slate-300 leading-relaxed">
                  "A severe spike in viral fever cases is predicted in the <span className="text-red-400 font-semibold">Jaipur District</span> peaking on Day 6. Current paracetamol stockpiles will be depleted by Day 4 without intervention."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
