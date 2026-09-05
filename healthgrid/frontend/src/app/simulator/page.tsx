"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, ArrowRight, PlayCircle, Loader2 } from "lucide-react"

export default function SimulatorPage() {
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handleSimulate = () => {
    setRunning(true)
    setTimeout(() => {
      setRunning(false)
      setCompleted(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Emergency Simulator</h2>
        <p className="text-muted-foreground mt-1">
          Run "What-If" scenarios to test network resilience and get AI response plans.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scenario Configuration</CardTitle>
            <CardDescription>Select the parameters for the emergency.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Scenario Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option>Disease Outbreak</option>
                <option>Flood</option>
                <option>Heatwave</option>
                <option>Supply Chain Disruption</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Affected Region</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option>Rajasthan (State-wide)</option>
                <option>Jaipur District</option>
                <option>Maharashtra (State-wide)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Low</Button>
                <Button variant="outline" className="flex-1">Medium</Button>
                <Button variant="default" className="flex-1 bg-red-600 hover:bg-red-700">High</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSimulate} disabled={running}>
              {running ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Simulating...</>
              ) : (
                <><PlayCircle className="mr-2 h-4 w-4" /> Run Simulation</>
              )}
            </Button>
          </CardFooter>
        </Card>

        {completed ? (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-red-500 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Simulation Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Medicine Demand</p>
                    <p className="text-2xl font-bold text-red-500">+42%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Patient Footfall</p>
                    <p className="text-2xl font-bold text-red-500">+31%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bed Occupancy</p>
                    <p className="text-2xl font-bold text-amber-500">+18%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">PHCs at Risk</p>
                    <p className="text-2xl font-bold text-red-500">7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-emerald-500 flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  AI Response Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm p-2 rounded-md bg-background border">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium text-xs">1</span>
                  <span>Transfer Antibiotics from <span className="font-semibold">PHC Shahpur</span></span>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3 text-sm p-2 rounded-md bg-background border">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium text-xs">2</span>
                  <span>Redirect IV fluids from <span className="font-semibold">District Warehouse</span></span>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3 text-sm p-2 rounded-md bg-background border">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium text-xs">3</span>
                  <span>Activate 20 temporary beds in <span className="font-semibold">PHC Rampur</span></span>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Execute Response Plan</Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center min-h-[400px]">
            <PlayCircle className="h-12 w-12 mb-4 opacity-20" />
            <h3 className="text-lg font-medium">Ready for Simulation</h3>
            <p className="text-sm max-w-sm mt-1">Configure your scenario on the left and run the simulation to see impact and AI recommendations.</p>
          </div>
        )}
      </div>
    </div>
  )
}
