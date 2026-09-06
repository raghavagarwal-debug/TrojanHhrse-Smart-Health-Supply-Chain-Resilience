"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, LogOut, Save, Database, Bed, Pill } from "lucide-react"

export default function PortalPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  
  const [phcId, setPhcId] = useState("")
  const [medicineId, setMedicineId] = useState("")
  const [stock, setStock] = useState("")
  const [totalBeds, setTotalBeds] = useState("")
  const [occupiedBeds, setOccupiedBeds] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    
    const userStr = localStorage.getItem("user")
    if (userStr) {
      const parsed = JSON.parse(userStr)
      setUser(parsed)
      if (parsed.phcId) setPhcId(parsed.phcId)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const updateInventory = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("Updating inventory...")
    try {
      const res = await fetch(`http://localhost:5001/api/phcs/${phcId}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ medicineId, currentStock: parseInt(stock) })
      })
      if (!res.ok) throw new Error("Failed to update inventory")
      setStatus("Inventory successfully updated!")
      setTimeout(() => setStatus(""), 3000)
    } catch (err: any) {
      setStatus(err.message)
    }
  }

  const updateBeds = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("Updating bed capacity...")
    try {
      const res = await fetch(`http://localhost:5001/api/phcs/${phcId}/bed-capacity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ occupiedBeds: parseInt(occupiedBeds), totalBeds: parseInt(totalBeds) })
      })
      if (!res.ok) throw new Error("Failed to update beds")
      setStatus("Bed capacity successfully updated!")
      setTimeout(() => setStatus(""), 3000)
    } catch (err: any) {
      setStatus(err.message)
    }
  }

  if (!user) return <div className="p-8">Verifying credentials...</div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-blue-500 h-8 w-8" />
            Authority Data Portal
          </h2>
          <p className="text-muted-foreground mt-1">
            Logged in as <strong className="text-foreground">{user.name}</strong> ({user.role})
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-md flex items-center gap-2 transition-colors text-sm"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      {status && (
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3 rounded-md flex items-center gap-2 text-sm">
          <Database className="h-4 w-4" />
          {status}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Pill className="h-5 w-5 text-emerald-500" /> Log Inventory Delivery / Usage</CardTitle>
            <CardDescription>Update current stock levels for essential medicines.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={updateInventory} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target PHC ID</label>
                <input 
                  type="text" 
                  value={phcId}
                  onChange={e => setPhcId(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-2 text-sm" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Medicine ID (UUID)</label>
                <input 
                  type="text" 
                  value={medicineId}
                  onChange={e => setMedicineId(e.target.value)}
                  placeholder="e.g. 550e8400-e29b..."
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-2 text-sm" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Current Stock Level</label>
                <input 
                  type="number" 
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-2 text-sm" 
                  required
                />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-md flex justify-center items-center gap-2 transition-colors">
                <Save className="h-4 w-4" /> Save Inventory Record
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bed className="h-5 w-5 text-purple-500" /> Update Bed Capacity</CardTitle>
            <CardDescription>Log patient admissions and discharges.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={updateBeds} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target PHC ID</label>
                <input 
                  type="text" 
                  value={phcId}
                  onChange={e => setPhcId(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-2 text-sm" 
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Occupied Beds</label>
                  <input 
                    type="number" 
                    value={occupiedBeds}
                    onChange={e => setOccupiedBeds(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-2 text-sm" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Beds (Optional)</label>
                  <input 
                    type="number" 
                    value={totalBeds}
                    onChange={e => setTotalBeds(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-2 text-sm" 
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 px-4 rounded-md flex justify-center items-center gap-2 transition-colors mt-4">
                <Save className="h-4 w-4" /> Update Bed Metrics
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
