"use client";

import dynamic from "next/dynamic"
const HealthMap = dynamic(() => import("@/components/health-map"), { ssr: false })

export default function RiskMapPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Live Risk Map</h2>
        <p className="text-muted-foreground mt-1">Full-screen interactive view of PHC network stress</p>
      </div>
      <div className="flex-1 min-h-0 bg-muted/50 rounded-lg overflow-hidden border">
        <HealthMap />
      </div>
    </div>
  )
}
