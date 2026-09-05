"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Activity, ShieldAlert, Zap, Radio } from "lucide-react"

export default function EmergencyOfficerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-red-600 dark:text-red-500 flex items-center gap-2">
            <ShieldAlert className="h-8 w-8" />
            Emergency Operations Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Crisis monitoring and disaster response protocols active.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" className="animate-pulse">Declare Code Red</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-red-200 dark:border-red-900/50 bg-red-50/20 dark:bg-red-950/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-400">
              Crisis Level
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600 animate-bounce" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">ELEVATED</div>
            <p className="text-xs text-red-600/80 mt-1">
              Active outbreaks in 2 zones
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Network Panic Index
            </CardTitle>
            <Activity className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">68%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              Based on NLP comms analysis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rapid Response Teams
            </CardTitle>
            <Zap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14/20</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              Teams currently deployed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overridden Logistics
            </CardTitle>
            <TruckIcon className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Transfers forced via E.O.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader className="bg-red-50 dark:bg-red-950/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-red-600" />
              Live Crisis Feed
            </CardTitle>
            <CardDescription>Real-time distress signals from PHCs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
             <div className="flex flex-col gap-2 p-3 border-l-4 border-l-red-600 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Cholera Outbreak Suspected</span>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <p className="text-sm">PHC Palghar reports 40+ cases of severe diarrhea in past 3 hours. Requesting immediate CDC assistance and IV fluids.</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" className="w-full">Dispatch Rapid Team</Button>
                </div>
             </div>

             <div className="flex flex-col gap-2 p-3 border-l-4 border-l-amber-500 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Oxygen Depletion Warning</span>
                  <span className="text-xs text-muted-foreground">14m ago</span>
                </div>
                <p className="text-sm">District Hospital Pune oxygen reserves dropping exponentially due to multi-casualty accident on highway.</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="w-full">Override Logistics Route</Button>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disaster Readiness</CardTitle>
            <CardDescription>Strategic reserve status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Strategic National Stockpile (SNS)</span>
                <span className="text-sm font-bold text-emerald-500">94%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[94%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Emergency Transport Fleet</span>
                <span className="text-sm font-bold text-amber-500">62%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[62%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">ICU Bed Surge Capacity</span>
                <span className="text-sm font-bold text-red-500">18%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[18%]"></div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-900 rounded-lg text-green-400 font-mono text-xs overflow-hidden">
              <p>E.O. TERMINAL &gt; _</p>
              <p className="opacity-70 mt-2">Awaiting emergency override commands...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v5c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  )
}
