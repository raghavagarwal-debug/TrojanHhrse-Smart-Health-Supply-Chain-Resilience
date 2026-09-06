"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { HeartPulse, Stethoscope, Bed, Pill, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function PHCStaffDashboard() {
  const router = useRouter()
  const [patientCount, setPatientCount] = useState(142)
  const [logDialogOpen, setLogDialogOpen] = useState(false)
  const [isLogging, setIsLogging] = useState(false)

  const [isRequestingResupply, setIsRequestingResupply] = useState(false)
  const [resupplyRequested, setResupplyRequested] = useState(false)

  const handleLogVisit = () => {
    setIsLogging(true)
    setTimeout(() => {
      setIsLogging(false)
      setLogDialogOpen(false)
      setPatientCount(prev => prev + 1)
    }, 1000)
  }

  const handleEmergencyOverride = () => {
    if (confirm("CRITICAL WARNING: Are you sure you want to activate EMERGENCY OVERRIDE? This will immediately bypass all protocols and alert national authorities.")) {
      alert("Emergency Override Activated. Authorities have been notified.")
    }
  }

  const handleResupply = () => {
    setIsRequestingResupply(true)
    setTimeout(() => {
      setIsRequestingResupply(false)
      setResupplyRequested(true)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">PHC Rampur - Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Local Health Center Management & Inventory.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={logDialogOpen} onOpenChange={setLogDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Log Patient Visit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Log Patient Visit</DialogTitle>
                <DialogDescription>
                  Enter patient details into the central database.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name / ID</label>
                  <Input placeholder="Enter name or ID" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Symptoms</label>
                  <Input placeholder="e.g. Fever, Cough" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority Level</label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option>Standard (Routine)</option>
                    <option>Urgent</option>
                    <option>Emergency (Critical)</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleLogVisit} disabled={isLogging}>
                  {isLogging ? "Logging..." : "Submit Log"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="destructive" onClick={handleEmergencyOverride}>Emergency Override</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Patients Today
            </CardTitle>
            <HeartPulse className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500">+{24 + (patientCount - 142)}</span> vs average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Staff on Duty
            </CardTitle>
            <Stethoscope className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/15</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 Doctors, 9 Nurses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bed Capacity
            </CardTitle>
            <Bed className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">{85 + Math.floor((patientCount - 142)/2)}%</div>
            <Progress value={85 + Math.floor((patientCount - 142)/2)} className="h-2 mt-2" indicatorClassName="bg-amber-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Alerts
            </CardTitle>
            <Pill className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-500">{resupplyRequested ? 1 : 2}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {resupplyRequested ? "IV Fluids" : "Antibiotics & IV Fluids"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Local Inventory Status</CardTitle>
            <CardDescription>Real-time stock vs predicted 48h consumption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-4 items-center gap-4 border-b pb-4">
                <div className="col-span-2 font-medium">Medicine</div>
                <div className="text-sm text-center">Current Stock</div>
                <div className="text-sm text-center">Status</div>
             </div>
             
             <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium">Paracetamol (500mg)</span>
                </div>
                <div className="text-sm text-center font-bold">1,200</div>
                <div className="text-center"><Badge variant="outline" className="text-emerald-500 border-emerald-200">Good</Badge></div>
             </div>

             <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-2 flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${resupplyRequested ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`}></div>
                  <span className="text-sm font-medium">Broad-Spectrum Antibiotics</span>
                </div>
                <div className={`text-sm text-center font-bold ${resupplyRequested ? 'text-amber-500' : 'text-red-500'}`}>
                  {resupplyRequested ? '45 (Inbound: 200)' : '45'}
                </div>
                <div className="text-center">
                  {resupplyRequested ? <Badge variant="outline" className="text-amber-500 border-amber-200">Resupplying</Badge> : <Badge variant="destructive">Critical</Badge>}
                </div>
             </div>

             <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-medium">IV Fluids (500ml)</span>
                </div>
                <div className="text-sm text-center font-bold text-red-500">12</div>
                <div className="text-center"><Badge variant="destructive">Critical</Badge></div>
             </div>

             <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium">Bandages & Dressings</span>
                </div>
                <div className="text-sm text-center font-bold text-amber-500">300</div>
                <div className="text-center"><Badge variant="outline" className="text-amber-500 border-amber-200">Warning</Badge></div>
             </div>

             <Button className="w-full mt-4" variant="outline" onClick={() => router.push('/inventory')}>View All Inventory</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-red-50/50 dark:bg-red-950/20 rounded-t-xl border-b border-red-100 dark:border-red-900/50">
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
             <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/10 rounded-lg">
                <h4 className="font-bold text-sm text-red-800 dark:text-red-300">Impending Stockout</h4>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1 mb-3">
                  AI predicts Antibiotics and IV Fluids will deplete in &lt;18 hours based on current patient influx rate.
                </p>
                <Button 
                  size="sm" 
                  className={`w-full text-white ${resupplyRequested ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
                  onClick={handleResupply}
                  disabled={isRequestingResupply || resupplyRequested}
                >
                  {isRequestingResupply ? (
                    <span className="flex items-center"><div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div> Requesting...</span>
                  ) : resupplyRequested ? (
                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Request Dispatched!</span>
                  ) : (
                    "Request Emergency Resupply"
                  )}
                </Button>
             </div>
             <p className="text-xs text-muted-foreground italic text-center">
               Automated alert generated by ArogyaPulse AI at 08:42 AM.
             </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
