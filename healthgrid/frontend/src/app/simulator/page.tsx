"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Activity, Beaker, ArrowRight, Save } from "lucide-react"

export default function SimulatorPage() {
  const [running, setRunning] = useState(false)
  
  // Base State
  const [diseaseCases, setDiseaseCases] = useState(120)
  const [patientCount, setPatientCount] = useState(500)
  const [currentStock, setCurrentStock] = useState(450)
  const [supplyLeadTime, setSupplyLeadTime] = useState(3)

  const [currentResult, setCurrentResult] = useState<any>(null)
  const [simResult, setSimResult] = useState<any>(null)

  const runSimulation = async () => {
    setRunning(true)
    try {
      // Run Baseline (Original)
      const basePayload = {
        phc_id: "PHC-123",
        medicine: "Paracetamol 500mg",
        current_stock: 450,
        disease_cases: 120,
        patient_count: 500,
        supply_lead_time: 3,
        previous_7_day_demand: 700,
        previous_30_day_demand: 2800,
        bed_occupancy: 0.6,
        mortality: 0.01,
        ipd_count: 50
      };
      
      const resBase = await fetch('/api/ml/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(basePayload)
      })
      setCurrentResult(await resBase.json())

      // Run Simulation (Tweakable)
      const simPayload = {
        ...basePayload,
        current_stock: currentStock,
        disease_cases: diseaseCases,
        patient_count: patientCount,
        supply_lead_time: supplyLeadTime
      };

      const resSim = await fetch('/api/ml/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simPayload)
      })
      setSimResult(await resSim.json())

    } catch (e) {
      console.error(e)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center">
            <Beaker className="w-8 h-8 mr-3 text-indigo-500" />
            WHAT-IF Simulator
          </h2>
          <p className="text-muted-foreground mt-1">
            Test scenarios using live XGBoost models for Paracetamol 500mg at PHC Andheri. 
            <span className="text-xs ml-2 text-slate-400 border border-slate-200 dark:border-slate-800 rounded px-2 py-0.5">Decision Support Only</span>
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* CONTROLS */}
        <Card className="border-indigo-500/20 shadow-lg bg-white dark:bg-slate-950">
          <CardHeader>
            <CardTitle>Scenario Parameters</CardTitle>
            <CardDescription>Adjust variables to simulate outcomes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Disease Cases
                </label>
                <span className="text-sm font-bold text-primary">{diseaseCases}</span>
              </div>
              <Slider value={[diseaseCases]} onValueChange={(v: any) => setDiseaseCases(Array.isArray(v) ? v[0] : v)} max={1000} step={10} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium leading-none">Patient Footfall (Weekly)</label>
                <span className="text-sm font-bold text-primary">{patientCount}</span>
              </div>
              <Slider value={[patientCount]} onValueChange={(v: any) => setPatientCount(Array.isArray(v) ? v[0] : v)} max={3000} step={50} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium leading-none">Current Stock</label>
                <span className="text-sm font-bold text-primary">{currentStock}</span>
              </div>
              <Slider value={[currentStock]} onValueChange={(v: any) => setCurrentStock(Array.isArray(v) ? v[0] : v)} max={2000} step={50} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium leading-none">Supply Lead Time (Days)</label>
                <span className="text-sm font-bold text-primary">{supplyLeadTime}</span>
              </div>
              <Slider value={[supplyLeadTime]} onValueChange={(v: any) => setSupplyLeadTime(Array.isArray(v) ? v[0] : v)} max={14} step={1} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={runSimulation} disabled={running} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              {running ? (
                <div className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Running AI Model...</div>
              ) : (
                <div className="flex items-center"><Activity className="w-4 h-4 mr-2" /> Run Simulation</div>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* RESULTS */}
        <Card className="bg-slate-50 dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>Comparison against baseline (Current state)</CardDescription>
          </CardHeader>
          <CardContent>
            {!simResult ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-800">
                <Beaker className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-700" />
                <p>Adjust parameters and run simulation</p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Demand Comparison */}
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-center p-3 border rounded-lg bg-white dark:bg-slate-950">
                    <div className="text-xs text-muted-foreground mb-1">Current Demand</div>
                    <div className="text-xl font-bold">{currentResult?.predicted_7_day_demand}</div>
                  </div>
                  <div className="flex justify-center text-slate-400">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div className="text-center p-3 border border-indigo-200 dark:border-indigo-900 rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">Simulated Demand</div>
                    <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{simResult?.predicted_7_day_demand}</div>
                  </div>
                </div>

                {/* Risk Comparison */}
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-center p-3 border rounded-lg bg-white dark:bg-slate-950">
                    <div className="text-xs text-muted-foreground mb-1">Current Risk</div>
                    <div className={`text-sm font-bold p-1 rounded ${
                      currentResult?.risk_level === 'CRITICAL' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {currentResult?.risk_level}
                    </div>
                  </div>
                  <div className="flex justify-center text-slate-400">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div className="text-center p-3 border border-indigo-200 dark:border-indigo-900 rounded-lg bg-white dark:bg-slate-950">
                    <div className="text-xs text-muted-foreground mb-1">Simulated Risk</div>
                    <div className={`text-sm font-bold p-1 rounded ${
                      simResult?.risk_level === 'CRITICAL' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                      simResult?.risk_level === 'HIGH' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30' :
                      simResult?.risk_level === 'MEDIUM' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {simResult?.risk_level}
                    </div>
                  </div>
                </div>

                {/* Stockout comparison */}
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-center p-3 border rounded-lg bg-white dark:bg-slate-950">
                    <div className="text-xs text-muted-foreground mb-1">Current Stockout Risk</div>
                    <div className="text-xl font-bold">{((currentResult?.stockout_probability || 0) * 100).toFixed(1)}%</div>
                  </div>
                  <div className="flex justify-center text-slate-400">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <div className="text-center p-3 border border-indigo-200 dark:border-indigo-900 rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">Sim. Stockout Risk</div>
                    <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{((simResult?.stockout_probability || 0) * 100).toFixed(1)}%</div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-500 mb-1 flex items-center">
                    <Activity className="w-4 h-4 mr-2" /> AI Recommendation
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    {simResult?.risk_level === 'CRITICAL' || simResult?.stockout_probability > 0.7 ? 
                      `With a simulated stockout probability of ${((simResult?.stockout_probability || 0) * 100).toFixed(1)}%, immediate stock transfer is recommended. Shortage will hit ${simResult?.predicted_shortage_units} units.` :
                      "Simulated parameters do not cross critical thresholds. Routine monitoring advised."
                    }
                  </p>
                </div>

              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
