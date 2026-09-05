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
import { AlertTriangle, TrendingUp, Users, Building, Activity, CheckCircle2 } from "lucide-react"

export default function DistrictAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">District Headquarters</h2>
          <p className="text-muted-foreground mt-1">
            Jaipur District Overview. Managing 42 PHCs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Generate Report</Button>
          <Button>Request State Aid</Button>
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
            <div className="text-2xl font-bold">40/42</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-amber-500">2 Offline</span> (Connectivity Issues)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients Today
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,281</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              <span className="text-emerald-500">+12%</span> vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending PHC Requests
            </CardTitle>
            <Activity className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">14</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              Require district approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Supply Health
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">92%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Network is stable
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>PHC Supply Requests (Action Required)</CardTitle>
            <CardDescription>Local PHCs requesting stock replenishment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col gap-2 p-3 border rounded-lg bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex justify-between items-center">
                  <Badge variant="destructive">URGENT</Badge>
                  <span className="text-xs font-bold">PHC Rampur</span>
                </div>
                <p className="text-sm">Requesting 200x Antibiotics (Predicted stockout in &lt;24h)</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="w-full">Approve Dispatch</Button>
                  <Button size="sm" variant="outline" className="w-full">Reject</Button>
                </div>
             </div>

             <div className="flex flex-col gap-2 p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Routine</Badge>
                  <span className="text-xs font-bold">PHC Sitapur</span>
                </div>
                <p className="text-sm">Requesting 500x Paracetamol, 100x Bandages</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="w-full">Approve Dispatch</Button>
                  <Button size="sm" variant="outline" className="w-full">Reject</Button>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>District Inventory Hub</CardTitle>
            <CardDescription>Current stock levels at the central district warehouse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Paracetamol (500mg)</p>
                  <p className="text-xs text-muted-foreground">120,000 units remaining</p>
                </div>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Amoxicillin</p>
                  <p className="text-xs text-muted-foreground">14,200 units remaining</p>
                </div>
                <Badge variant="outline" className="text-amber-500 border-amber-500/20 bg-amber-500/10">Low Stock</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">IV Fluids (500ml)</p>
                  <p className="text-xs text-muted-foreground">800 units remaining</p>
                </div>
                <Badge variant="outline" className="text-red-500 border-red-500/20 bg-red-500/10">Critical</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Oxygen Cylinders</p>
                  <p className="text-xs text-muted-foreground">450 units remaining</p>
                </div>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">Healthy</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6">View Full Inventory</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
