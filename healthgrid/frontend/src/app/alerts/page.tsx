"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bell, Clock } from "lucide-react"

export default function AlertsPage() {
  const alerts = [
    { id: 1, title: "Stock-out Warning", desc: "Antibiotics running low at PHC Rampur.", time: "12m ago", priority: "Critical" },
    { id: 2, title: "Capacity Breach", desc: "Bed occupancy exceeded 90% at PHC Andheri.", time: "1h ago", priority: "High" },
    { id: 3, title: "Delivery Delayed", desc: "IV Fluids shipment to Jaipur district delayed by 4h.", time: "3h ago", priority: "Medium" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Risk & Alerts</h2>
          <p className="text-muted-foreground mt-1">System-generated notifications requiring attention.</p>
        </div>
        <Badge variant="destructive" className="px-3 py-1">2 Critical</Badge>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-full ${alert.priority === 'Critical' ? 'bg-red-100 text-red-600' : alert.priority === 'High' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                  {alert.priority === 'Critical' ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{alert.desc}</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" /> {alert.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
