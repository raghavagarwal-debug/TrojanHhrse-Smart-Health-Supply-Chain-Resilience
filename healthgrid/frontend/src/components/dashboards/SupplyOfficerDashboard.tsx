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
import { Truck, PackageSearch, PackageCheck, AlertTriangle, ArrowRight } from "lucide-react"

export default function SupplyOfficerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Logistics & Supply Hub</h2>
          <p className="text-muted-foreground mt-1">
            Tracking 412 active resource transfers across the network.
          </p>
        </div>
        <Button>New Transfer Route</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Transfers
            </CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">412</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 mr-1">38</span> completed today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <PackageSearch className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-red-500 mr-1">12</span> marked URGENT
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Network Stockouts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-500">14</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              PHCs without basic supplies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Delivery Success
            </CardTitle>
            <PackageCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              On-time delivery rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>AI Route Recommendations</CardTitle>
            <CardDescription>Optimized transfers based on distance and urgency</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="text-xs uppercase bg-muted/50">
                   <tr>
                     <th className="px-4 py-3 rounded-tl-md">Source (Surplus)</th>
                     <th className="px-4 py-3"></th>
                     <th className="px-4 py-3">Destination (Deficit)</th>
                     <th className="px-4 py-3">Payload</th>
                     <th className="px-4 py-3 rounded-tr-md">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr className="border-b border-border/50">
                     <td className="px-4 py-4 font-medium text-emerald-600 dark:text-emerald-400">Mumbai Hub (98%)</td>
                     <td className="px-4 py-4 text-muted-foreground"><ArrowRight className="h-4 w-4" /></td>
                     <td className="px-4 py-4 font-medium text-red-600 dark:text-red-400">PHC Palghar (12%)</td>
                     <td className="px-4 py-4">400x IV Fluids</td>
                     <td className="px-4 py-4">
                       <Button size="sm">Auto-Dispatch</Button>
                     </td>
                   </tr>
                   <tr className="border-b border-border/50">
                     <td className="px-4 py-4 font-medium text-emerald-600 dark:text-emerald-400">Nagpur Central (85%)</td>
                     <td className="px-4 py-4 text-muted-foreground"><ArrowRight className="h-4 w-4" /></td>
                     <td className="px-4 py-4 font-medium text-amber-600 dark:text-amber-400">Wardha PHC (30%)</td>
                     <td className="px-4 py-4">150x O2 Cylinders</td>
                     <td className="px-4 py-4">
                       <Button size="sm">Auto-Dispatch</Button>
                     </td>
                   </tr>
                   <tr className="">
                     <td className="px-4 py-4 font-medium text-emerald-600 dark:text-emerald-400">Pune District (88%)</td>
                     <td className="px-4 py-4 text-muted-foreground"><ArrowRight className="h-4 w-4" /></td>
                     <td className="px-4 py-4 font-medium text-red-600 dark:text-red-400">Satara Clinic (5%)</td>
                     <td className="px-4 py-4">2000x Paracetamol</td>
                     <td className="px-4 py-4">
                       <Button size="sm">Auto-Dispatch</Button>
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Fleet Tracking</CardTitle>
            <CardDescription>GPS telemetry of active medical transports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="relative h-64 bg-slate-100 dark:bg-slate-900 rounded-md border flex items-center justify-center overflow-hidden">
                {/* Fake Map Background */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #888 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                
                {/* Fake GPS Blips */}
                <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                   <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                   <span className="text-[10px] font-bold mt-1 bg-background/80 px-1 rounded">TRK-492</span>
                </div>
                
                <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
                   <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                   <span className="text-[10px] font-bold mt-1 bg-background/80 px-1 rounded">TRK-118</span>
                </div>

                <div className="absolute top-1/2 left-2/3 flex flex-col items-center">
                   <div className="h-3 w-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                   <span className="text-[10px] font-bold text-red-500 mt-1 bg-background/80 px-1 rounded">STALLED</span>
                </div>
             </div>
             
             <div className="flex justify-between items-center text-sm border-t pt-2">
               <span className="flex items-center gap-2"><span className="h-2 w-2 bg-blue-500 rounded-full"></span> On Route (384)</span>
               <span className="flex items-center gap-2"><span className="h-2 w-2 bg-red-500 rounded-full"></span> Delayed (8)</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
