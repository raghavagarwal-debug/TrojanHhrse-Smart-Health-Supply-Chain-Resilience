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
import { Progress } from "@/components/ui/progress"
import { HeartPulse, Stethoscope, Bed, Pill, AlertTriangle } from "lucide-react"

export default function PHCStaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">PHC Rampur - Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Local Health Center Management & Inventory.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="default">Log Patient Visit</Button>
          <Button variant="destructive">Emergency Override</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Patients Today
            </CardTitle>
            <HeartPulse className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500">+24</span> vs average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Staff on Duty
            </CardTitle>
            <Stethoscope className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/15</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 Doctors, 9 Nurses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bed Capacity
            </CardTitle>
            <Bed className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">85%</div>
            <Progress value={85} className="h-2 mt-2" indicatorClassName="bg-amber-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Alerts
            </CardTitle>
            <Pill className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-500">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Antibiotics & IV Fluids
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Local Inventory Status</CardTitle>
            <CardDescription>Real-time stock vs predicted 48h consumption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-4 items-center gap-4 border-b pb-4">
                <div className="col-span-2 font-medium">Medicine</div>
                <div className="text-sm text-center">Current Stock</div>
                <div className="text-sm text-center">Status</div>
             </div>
             
             <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium">Paracetamol (500mg)</span>
                </div>
                <div className="text-sm text-center font-bold">1,200</div>
                <div className="text-center"><Badge variant="outline" className="text-emerald-500 border-emerald-200">Good</Badge></div>
             </div>

             <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Broad-Spectrum Antibiotics</span>
                </div>
                <div className="text-sm text-center font-bold text-red-500">45</div>
                <div className="text-center"><Badge variant="destructive">Critical</Badge></div>
             </div>

             <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-medium">IV Fluids (500ml)</span>
                </div>
                <div className="text-sm text-center font-bold text-red-500">12</div>
                <div className="text-center"><Badge variant="destructive">Critical</Badge></div>
             </div>

             <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium">Bandages & Dressings</span>
                </div>
                <div className="text-sm text-center font-bold text-amber-500">300</div>
                <div className="text-center"><Badge variant="outline" className="text-amber-500 border-amber-200">Warning</Badge></div>
             </div>

             <Button className="w-full mt-4" variant="outline">View All Inventory</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-red-50/50 dark:bg-red-950/20 rounded-t-xl border-b border-red-100 dark:border-red-900/50">
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
             <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/10 rounded-lg">
                <h4 className="font-bold text-sm text-red-800 dark:text-red-300">Impending Stockout</h4>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1 mb-3">
                  AI predicts Antibiotics and IV Fluids will deplete in &lt;18 hours based on current patient influx rate.
                </p>
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Request Emergency Resupply
                </Button>
             </div>
             <p className="text-xs text-muted-foreground italic text-center">
               Automated alert generated by HealthGrid AI at 08:42 AM.
             </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
