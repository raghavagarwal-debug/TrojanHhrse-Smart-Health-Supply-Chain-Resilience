"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Users, Activity, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function NetworkPage() {
  const phcs = [
    { id: 1, name: "PHC Rampur", district: "Jaipur", state: "Rajasthan", pop: 12450, status: "Critical", beds: "48/50", readiness: 12, lastUpdate: "2 mins ago" },
    { id: 2, name: "PHC Shahpur", district: "Jaipur", state: "Rajasthan", pop: 8500, status: "Stable", beds: "12/50", readiness: 89, lastUpdate: "5 mins ago" },
    { id: 3, name: "PHC Andheri", district: "Mumbai Suburban", state: "Maharashtra", pop: 45000, status: "Warning", beds: "42/50", readiness: 45, lastUpdate: "1 min ago" },
    { id: 4, name: "PHC Whitefield", district: "Bangalore Urban", state: "Karnataka", pop: 22000, status: "Stable", beds: "20/50", readiness: 92, lastUpdate: "12 mins ago" },
    { id: 5, name: "PHC Dharavi", district: "Mumbai", state: "Maharashtra", pop: 85000, status: "Critical", beds: "120/120", readiness: 5, lastUpdate: "Just now" },
    { id: 6, name: "PHC Koramangala", district: "Bangalore Urban", state: "Karnataka", pop: 18000, status: "Stable", beds: "15/30", readiness: 95, lastUpdate: "15 mins ago" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">PHC Network Directory</h2>
          <p className="text-muted-foreground mt-1">Real-time capacity and readiness tracking across 12,482 facilities.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search facilities..." className="pl-8 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800" />
          </div>
          <Button variant="outline" className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Total Facilities", value: "12,482", change: "+14 this month", color: "text-blue-500" },
          { title: "Critical Status", value: "327", change: "+42 in last 24h", color: "text-red-500" },
          { title: "Average Readiness", value: "84%", change: "-2% vs last week", color: "text-amber-500" },
          { title: "Total Beds Available", value: "1.2M", change: "82% occupancy", color: "text-emerald-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Facility Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Population Served</th>
                <th className="px-6 py-4">Bed Occupancy</th>
                <th className="px-6 py-4">Readiness Score</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
              {phcs.map((phc) => (
                <tr key={phc.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${phc.status === 'Critical' ? 'bg-red-500/10 text-red-500' : phc.status === 'Warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        <Building className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-200">{phc.name}</div>
                        <div className="text-xs text-slate-500">Updated {phc.lastUpdate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      {phc.district}, {phc.state}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Users className="h-3.5 w-3.5 text-slate-500" />
                      {phc.pop.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Activity className="h-3.5 w-3.5 text-slate-500" />
                      {phc.beds}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${phc.readiness < 30 ? 'bg-red-500' : phc.readiness < 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${phc.readiness}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{phc.readiness}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" 
                           className={phc.status === "Critical" ? "text-red-400 border-red-500/30 bg-red-500/10" : phc.status === "Warning" ? "text-amber-400 border-amber-500/30 bg-amber-500/10" : "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"}>
                      {phc.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
