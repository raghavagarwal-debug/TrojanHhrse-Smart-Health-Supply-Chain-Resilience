"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Thermometer, User, Bed, Pill, Zap, AlertTriangle } from "lucide-react"

export default function DigitalTwinPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">PHC Rampur</h2>
            <Badge variant="destructive" className="animate-pulse">CRITICAL</Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Jaipur District, Rajasthan • Population Served: 12,000 • Live Digital Twin
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Current State */}
        <Card className="md:col-span-1 border-primary/20 bg-card">
          <CardHeader className="pb-3 border-b border-muted">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> Current Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 font-medium"><Bed className="h-4 w-4" /> Bed Capacity</span>
                <span className="text-red-500 font-bold">96% (48/50)</span>
              </div>
              <Progress value={96} className="h-2 bg-red-100" indicatorClassName="bg-red-500" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 font-medium"><User className="h-4 w-4" /> Staff Availability</span>
                <span className="text-amber-500 font-bold">40% (4/10)</span>
              </div>
              <Progress value={40} className="h-2 bg-amber-100" indicatorClassName="bg-amber-500" />
              <p className="text-xs text-muted-foreground">Doctors available. 6 on leave or deployed elsewhere.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 font-medium"><Pill className="h-4 w-4" /> Antibiotics Stock</span>
                <span className="text-red-500 font-bold">82 units</span>
              </div>
              <Progress value={18} className="h-2 bg-red-100" indicatorClassName="bg-red-500" />
              <p className="text-xs text-muted-foreground">Reorder level: 200. Daily consumption surging.</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Thermometer className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Patient Footfall</p>
                <p className="text-xl font-bold text-red-500">+23% this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictive Model */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3 border-b border-muted">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" /> 72-Hour Predictive State
            </CardTitle>
            <CardDescription>AI-generated forecasting based on current operational metrics and regional disease patterns.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-5 border rounded-xl border-red-200 bg-red-50 dark:bg-red-950/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-400">Impending Stock-out</h4>
                    <p className="text-sm text-red-600/80 mt-1">Antibiotics inventory will reach 0 in exactly <span className="font-bold underline">2.4 days</span> at current consumption rate of 35/day.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border rounded-xl border-amber-200 bg-amber-50 dark:bg-amber-950/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-700 dark:text-amber-400">Capacity Breach</h4>
                    <p className="text-sm text-amber-600/80 mt-1">Bed capacity predicted to exceed 100% within 48 hours. ER queue expected to build up.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">AI Recommended Actions</h4>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-background border p-4 rounded-lg shadow-sm">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <p className="font-bold">Approve lateral transfer of 250 units of Antibiotics from PHC Shahpur.</p>
                    <p className="text-sm text-muted-foreground">ETA: 5 hours. Prevents stockout for 14 days.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-background border p-4 rounded-lg shadow-sm">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">2</div>
                  <div className="flex-1">
                    <p className="font-bold">Divert non-critical patients to PHC Andheri.</p>
                    <p className="text-sm text-muted-foreground">Alleviates bed capacity constraint. PHC Andheri has 45% availability.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
