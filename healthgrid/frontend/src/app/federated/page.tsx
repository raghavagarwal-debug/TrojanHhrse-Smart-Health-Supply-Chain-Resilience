"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Database, Lock, CheckCircle2, ArrowRightLeft, Cpu } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export default function FederatedAIPage() {
  const [syncProgress, setSyncProgress] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSyncProgress(v => (v >= 100 ? 0 : v + 5))
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Federated AI</h2>
        <p className="text-muted-foreground mt-1">
          Collaborative model training without centralizing sensitive health data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-primary/20 shadow-sm bg-white dark:bg-slate-950">
          <CardHeader className="pb-3 border-b border-muted">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-500" /> Federated Network Topology
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Round 42 Active
              </Badge>
            </div>
            <CardDescription>
              Local health data remains within its originating state system while model improvements are aggregated globally.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 pb-10">
            <div className="flex flex-col items-center">
              
              {/* Global Model */}
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 bg-blue-600 rounded-xl shadow-lg flex items-center justify-center text-white border-4 border-blue-200 dark:border-blue-900 relative z-10">
                  <Cpu className="h-8 w-8" />
                </div>
                <div className="mt-2 text-center">
                  <h4 className="font-bold text-sm">Global Prediction Model</h4>
                  <p className="text-xs text-muted-foreground">Accuracy: 94.2%</p>
                </div>
              </div>

              {/* Sync Arrows */}
              <div className="w-full max-w-md h-24 relative -mt-4 mb-2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-border z-0"></div>
                <div className="absolute top-0 left-[15%] h-full flex flex-col justify-between items-center text-blue-500/50">
                   <ArrowRightLeft className="h-6 w-6 rotate-90" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col justify-between items-center text-blue-500/50">
                   <ArrowRightLeft className="h-6 w-6 rotate-90" />
                </div>
                <div className="absolute top-0 right-[15%] h-full flex flex-col justify-between items-center text-blue-500/50">
                   <ArrowRightLeft className="h-6 w-6 rotate-90" />
                </div>
              </div>

              {/* Nodes */}
              <div className="flex justify-between w-full max-w-lg relative z-10 gap-4">
                {[
                  { name: 'Rajasthan Node', status: 'Syncing', acc: '93.1%' },
                  { name: 'Maharashtra Node', status: 'Active', acc: '95.0%' },
                  { name: 'Karnataka Node', status: 'Active', acc: '94.8%' },
                ].map((node, i) => (
                  <div key={i} className="flex flex-col items-center bg-white dark:bg-slate-900 border rounded-lg p-3 w-32 shadow-sm text-center">
                    <Database className="h-5 w-5 text-muted-foreground mb-1" />
                    <p className="text-xs font-bold">{node.name}</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                      <Lock className="h-3 w-3 text-emerald-500" /> Data Secured
                    </div>
                    {node.status === 'Syncing' && (
                       <Progress value={syncProgress} className="h-1 mt-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white dark:bg-slate-950">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Training Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Participating Nodes</span>
                <span className="font-bold">14 States</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Model Rounds</span>
                <span className="font-bold">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Synchronization</span>
                <span className="font-bold">2 mins ago</span>
              </div>
              <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
                <span className="text-sm flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Data Centralized</span>
                <span className="font-bold">Never</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900/50 border-muted">
            <CardContent className="p-4 text-sm text-muted-foreground">
              By using Federated Learning, AROGYAPULSE can train powerful disease outbreak and demand forecasting models across multiple states without ever transferring sensitive patient records or local inventory data to a central server.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
