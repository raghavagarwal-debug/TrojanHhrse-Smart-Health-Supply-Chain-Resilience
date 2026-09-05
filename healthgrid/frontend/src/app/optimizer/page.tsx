"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, GitMerge, MapPin, Truck } from "lucide-react"

export default function OptimizerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Resource Optimizer</h2>
        <p className="text-muted-foreground mt-1">
          AI-recommended cross-district resource redistribution to prevent stock-outs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-blue-500/20 shadow-md">
          <CardHeader className="pb-3 border-b border-muted">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Recommendation #1</Badge>
              <span className="text-sm font-medium text-muted-foreground">High Confidence (94%)</span>
            </div>
            <CardTitle className="text-xl mt-4">Prevent Antibiotics Stock-out</CardTitle>
            <CardDescription>Redistribute surplus inventory to critical PHC</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
              
              <div className="flex-1 bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 text-center w-full">
                <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-none mb-2">Surplus Source</Badge>
                <h4 className="font-bold">PHC Shahpur</h4>
                <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  <MapPin className="h-3 w-3" /> Jaipur District
                </p>
                <div className="mt-3 bg-white p-2 rounded border shadow-sm">
                  <p className="text-xs text-muted-foreground">Available Surplus</p>
                  <p className="font-bold text-emerald-600">600 units</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center shrink-0 w-32 py-4">
                <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-1">
                  250 units
                </div>
                <div className="h-px w-full bg-blue-200 relative flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-blue-500 absolute right-0 translate-x-1/2 bg-white" />
                  <Truck className="h-5 w-5 text-blue-500 absolute bg-white p-0.5" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">38 km • 5 hours</p>
              </div>

              <div className="flex-1 bg-red-50/50 border border-red-100 rounded-lg p-4 text-center w-full">
                <Badge variant="outline" className="bg-red-100 text-red-700 border-none mb-2">Shortage Target</Badge>
                <h4 className="font-bold">PHC Rampur</h4>
                <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  <MapPin className="h-3 w-3" /> Jaipur District
                </p>
                <div className="mt-3 bg-white p-2 rounded border shadow-sm">
                  <p className="text-xs text-muted-foreground">Predicted Out</p>
                  <p className="font-bold text-red-600">2.4 days</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-muted/30 p-4 rounded-lg">
              <h5 className="text-sm font-semibold mb-1 flex items-center gap-2">
                <GitMerge className="h-4 w-4 text-primary" /> AI Explanation
              </h5>
              <p className="text-sm text-muted-foreground">
                PHC Shahpur has historically low demand for Antibiotics this month and holds 600 surplus units. 
                Transferring 250 units covers PHC Rampur's predicted demand surge while keeping Shahpur above its safety stock level.
              </p>
            </div>
          </CardContent>
          <CardFooter className="gap-3 border-t bg-muted/10 pt-4">
            <Button variant="outline" className="flex-1">View Route</Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Approve Transfer</Button>
          </CardFooter>
        </Card>

        <Card className="border-muted shadow-sm opacity-70">
          <CardHeader className="pb-3 border-b border-muted">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-muted text-muted-foreground">Recommendation #2</Badge>
              <span className="text-sm font-medium text-muted-foreground">Medium Confidence (78%)</span>
            </div>
            <CardTitle className="text-xl mt-4">Redistribute IV Fluids</CardTitle>
            <CardDescription>Rebalance stock across neighboring districts</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-[200px]">
              <div className="text-center text-muted-foreground">
                <CheckCircle2 className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>Transfer already initiated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
