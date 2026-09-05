"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"

const HealthMap = dynamic(() => import("@/components/health-map"), { ssr: false })

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Live Health Map</h2>
        <p className="text-muted-foreground mt-1">
          Full-screen geographic visualization of PHC networks and risk clusters.
        </p>
      </div>
      <Card className="flex-1 overflow-hidden">
        <HealthMap />
      </Card>
    </div>
  )
}
