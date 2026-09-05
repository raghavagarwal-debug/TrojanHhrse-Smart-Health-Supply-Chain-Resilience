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
import { AlertTriangle, TrendingUp, Users, Building, Activity, MapPin } from "lucide-react"

export default function StateAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">State Health Command</h2>
          <p className="text-muted-foreground mt-1">
            Maharashtra State Overview. Monitoring 36 Districts.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total State PHCs
            </CardTitle>
            <Building className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,824</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              <span className="text-emerald-500">100%</span> reporting active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Districts at Risk
            </CardTitle>
            <MapPin className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pune, Nagpur, Thane
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Shortages
            </CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-500">8</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              Requires inter-district transfer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              State Bed Capacity
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" indicatorClassName="bg-blue-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>District Performance Matrix</CardTitle>
            <CardDescription>AI evaluation of district-level healthcare supply chain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 border p-3 rounded-md">
               <div className="flex justify-between text-sm font-medium">
                 <span>Pune District</span>
                 <span className="text-red-500">Critical (89% Capacity)</span>
               </div>
               <Progress value={89} className="h-2" indicatorClassName="bg-red-500" />
               <p className="text-xs text-muted-foreground mt-1">High influx of seasonal flu patients.</p>
            </div>
            
            <div className="space-y-2 border p-3 rounded-md">
               <div className="flex justify-between text-sm font-medium">
                 <span>Nagpur District</span>
                 <span className="text-amber-500">Warning (72% Capacity)</span>
               </div>
               <Progress value={72} className="h-2" indicatorClassName="bg-amber-500" />
               <p className="text-xs text-muted-foreground mt-1">Antibiotic stock dropping faster than predicted.</p>
            </div>

            <div className="space-y-2 border p-3 rounded-md">
               <div className="flex justify-between text-sm font-medium">
                 <span>Mumbai District</span>
                 <span className="text-emerald-500">Stable (45% Capacity)</span>
               </div>
               <Progress value={45} className="h-2" indicatorClassName="bg-emerald-500" />
               <p className="text-xs text-muted-foreground mt-1">Well supplied, potential to export supplies.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inter-District Transfers</CardTitle>
            <CardDescription>Live tracking of state-managed supply logistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col gap-2 p-3 border rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                <div className="flex justify-between items-center">
                  <Badge className="bg-blue-500">In Transit</Badge>
                  <span className="text-xs text-muted-foreground">ETA: 4h 30m</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium mt-2">
                  <span>Mumbai Central Depot</span>
                  <Activity className="h-4 w-4 text-muted-foreground mx-2" />
                  <span>Pune District Hospital</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">10,000x IV Fluids, 5,000x Paracetamol</p>
             </div>

             <div className="flex flex-col gap-2 p-3 border rounded-lg bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-amber-600 border-amber-300">Pending Approval</Badge>
                  <span className="text-xs text-muted-foreground">Req: 2h ago</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium mt-2">
                  <span>Thane PHC Hub</span>
                  <Activity className="h-4 w-4 text-muted-foreground mx-2" />
                  <span>Nagpur Rural Base</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">200x O2 Cylinders (AI Recommended Transfer)</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
