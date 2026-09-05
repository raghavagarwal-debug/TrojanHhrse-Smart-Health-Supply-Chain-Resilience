"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Search, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function InventoryPage() {
  const items = [
    { id: 1, name: "Amoxicillin (500mg)", category: "Antibiotics", stock: 120, reorder: 200, status: "Critical", phc: "PHC Rampur", trend: "down" },
    { id: 2, name: "Paracetamol (500mg)", category: "Analgesics", stock: 1450, reorder: 500, status: "Optimal", phc: "PHC Rampur", trend: "up" },
    { id: 3, name: "IV Fluid (RL 500ml)", category: "Fluids", stock: 15, reorder: 100, status: "Critical", phc: "PHC Andheri", trend: "down" },
    { id: 4, name: "Azithromycin (250mg)", category: "Antibiotics", stock: 850, reorder: 200, status: "Surplus", phc: "PHC Shahpur", trend: "up" },
    { id: 5, name: "Oxygen Cylinders (D-Type)", category: "Equipment", stock: 4, reorder: 10, status: "Critical", phc: "PHC Dharavi", trend: "down" },
    { id: 6, name: "Surgical Masks (N95)", category: "PPE", stock: 4500, reorder: 1000, status: "Optimal", phc: "PHC Whitefield", trend: "up" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Inventory Intelligence</h2>
          <p className="text-muted-foreground mt-1">Cross-facility real-time medicine and equipment tracking.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search inventory..." className="pl-8 bg-slate-900/50 border-slate-800" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Request Transfer</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-900/40 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Package className="h-16 w-16" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Asset Value Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">₹4.2B</div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" /> +2.4% vs last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/40 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle className="h-16 w-16" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Items Below Reorder Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">142</div>
            <p className="text-xs text-red-400 mt-1 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" /> +12 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Logistics Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">94%</div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500 w-[94%]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-800 bg-slate-900/50">
          <CardTitle>Critical Inventory Watchlist</CardTitle>
          <CardDescription>Items requiring immediate procurement or lateral transfer.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {items.map((item) => {
                const stockPercent = Math.min(100, Math.round((item.stock / item.reorder) * 100));
                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200">{item.name}</div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        ID: #{item.id.toString().padStart(4, '0')}
                        {item.trend === 'down' ? <ArrowDownRight className="h-3 w-3 text-red-400 ml-2" /> : <ArrowUpRight className="h-3 w-3 text-emerald-400 ml-2" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{item.category}</td>
                    <td className="px-6 py-4 text-slate-400">{item.phc}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-200 w-12">{item.stock}</span>
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${stockPercent < 50 ? 'bg-red-500' : stockPercent < 100 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" 
                             className={item.status === "Critical" ? "text-red-400 border-red-500/30 bg-red-500/10" : item.status === "Surplus" ? "text-blue-400 border-blue-500/30 bg-blue-500/10" : "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
