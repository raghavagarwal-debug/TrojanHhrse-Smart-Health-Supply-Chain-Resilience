"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, Users, Building, Pill, Map } from "lucide-react"
import dynamic from "next/dynamic"

const HealthMap = dynamic(() => import("@/components/health-map"), { ssr: false })

export default function NationalAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">National Command Center</h2>
          <p className="text-muted-foreground mt-1">
            Network-wide Health Intelligence overview. Data refreshed 12 seconds ago.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Operational PHCs
            </CardTitle>
            <Building className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,482</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              <span className="text-emerald-500">+14</span> since last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              PHCs at Risk
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">327</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">+42</span> since yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical PHCs
            </CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-500">46</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">+12</span> since yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Medicines at Risk
            </CardTitle>
            <Pill className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">
              Stock-outs predicted in <span className="font-semibold text-foreground">&lt; 48h</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Network-wide Resource Drain</CardTitle>
              <CardDescription>Live telemetry of critical supply consumption (units/hr)</CardDescription>
            </div>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Sync
            </Badge>
          </CardHeader>
          <CardContent className="h-48 flex items-end justify-between gap-1 mt-4">
            {/* Generating an animated live graph purely with CSS */}
            {[...Array(30)].map((_, i) => {
              // Use pseudo-random deterministic heights based on index to avoid Hydration mismatch errors
              const fakeRandom = Math.sin(i * 12345) * 0.5 + 0.5; // 0 to 1
              const height = 20 + fakeRandom * 60 + (i === 25 ? 40 : 0); // Inject a fake spike
              
              return (
                <div key={i} className="w-full h-full flex flex-col justify-end group">
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-700 ease-in-out ${i === 25 ? 'bg-red-500' : 'bg-blue-500/80 hover:bg-blue-400'}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>AI Sentiment Pulse</CardTitle>
            <CardDescription>NLP analysis of local health worker reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 mt-2">
             <div className="space-y-2">
               <div className="flex items-center justify-between text-xs">
                 <span className="text-red-400">Panic/Overwhelmed (14%)</span>
               </div>
               <Progress value={14} className="h-1.5" indicatorClassName="bg-red-500" />
             </div>
             <div className="space-y-2">
               <div className="flex items-center justify-between text-xs">
                 <span className="text-amber-400">Urgent Requests (28%)</span>
               </div>
               <Progress value={28} className="h-1.5" indicatorClassName="bg-amber-500" />
             </div>
             <div className="space-y-2">
               <div className="flex items-center justify-between text-xs">
                 <span className="text-emerald-400">Stable/Routine (58%)</span>
               </div>
               <Progress value={58} className="h-1.5" indicatorClassName="bg-emerald-500" />
             </div>
             <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 italic">
               "Significant spike in requests for IV Fluids observed in Western Zone over last 2 hours."
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Live Health Map</CardTitle>
            <CardDescription>
              Real-time view of India's PHC network risks and capacity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[450px] bg-muted/50 rounded-md border flex flex-col items-center justify-center">
               <HealthMap />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>System-generated AI risk alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="flex items-start gap-4 p-3 border rounded-lg bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/50">
              <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none text-red-700 dark:text-red-400">CRITICAL: PHC Rampur</p>
                  <span className="text-xs text-muted-foreground">12m ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Antibiotics predicted to run out in 2.4 days. AI recommends transferring 250 units from PHC Shahpur.
                </p>
                <div className="pt-2">
                  <Badge variant="outline" className="text-xs font-normal border-red-200 text-red-700 bg-white dark:bg-transparent dark:border-red-800 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer transition-colors">
                    Review Action
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 border rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                <Activity className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none text-amber-700 dark:text-amber-400">WARNING: Bed Capacity</p>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  4 PHCs in Jaipur district approaching &gt;85% bed capacity due to seasonal viral fever surge.
                </p>
                <div className="pt-2">
                  <Badge variant="outline" className="text-xs font-normal border-amber-200 text-amber-700 bg-white dark:bg-transparent dark:border-amber-800 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 cursor-pointer transition-colors">
                    View Network
                  </Badge>
                </div>
              </div>
            </div>

             <div className="flex items-start gap-4 p-3 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none text-blue-700 dark:text-blue-400">INFO: Transfer Complete</p>
                  <span className="text-xs text-muted-foreground">3h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  500 IV Fluids successfully delivered to PHC Andheri. Risk score stabilized.
                </p>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
