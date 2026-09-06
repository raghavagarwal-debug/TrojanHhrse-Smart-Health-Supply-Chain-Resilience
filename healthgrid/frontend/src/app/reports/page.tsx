"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center">
          <FileText className="w-8 h-8 mr-3 text-indigo-500" />
          Submit Report
        </h2>
        <p className="text-muted-foreground mt-1">Daily manual data entry for PHC staff & Field Workers</p>
      </div>
      
      <Card className="border-indigo-500/20 shadow-lg bg-white dark:bg-slate-950">
        <CardHeader>
          <CardTitle>Health Metrics</CardTitle>
          <CardDescription>Update today's numbers for your facility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Total Patient Footfall</label>
            <input type="number" className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="e.g. 150" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Suspected Viral Cases</label>
            <input type="number" className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="e.g. 24" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Current Bed Occupancy (%)</label>
            <input type="number" className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="e.g. 85" />
          </div>
          
          {submitted ? (
            <div className="w-full mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded flex items-center justify-center font-medium dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5 mr-2" /> Report Submitted Successfully!
            </div>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full mt-4 bg-indigo-600 text-white hover:bg-indigo-700">
              {isSubmitting ? (
                <div className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Uploading...</div>
              ) : (
                <div className="flex items-center"><Send className="w-4 h-4 mr-2" /> Submit to Network</div>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
