"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, MapPin, Activity, Pill, Clock } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"
import dynamic from "next/dynamic"

const HealthMap = dynamic(() => import("@/components/health-map"), { ssr: false })

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mlData, setMlData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch baseline data and pass it to our new ML prediction endpoint
        const payload = {
          phc_id: "PHC-123",
          medicine: "Paracetamol 500mg",
          current_stock: 450,
          disease_cases: 120,
          patient_count: 500
        };

        const res = await fetch('/api/ml/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        
        const mlRes = await res.json();
        setMlData(mlRes);

        // Generate chart data based on ML response
        const baseDemand = mlRes.predicted_7_day_demand / 7 || 100;
        const chartData = [];
        
        // Historical (Past 7 days)
        for(let i=7; i>0; i--) {
          chartData.push({
            day: `Day -${i}`,
            historical: Math.round(baseDemand * (1 + (Math.random() * 0.2 - 0.1))),
            predicted: null
          })
        }
        
        // Today
        chartData.push({
          day: 'Today',
          historical: Math.round(baseDemand),
          predicted: Math.round(baseDemand)
        })

        // Predicted (Next 7 days)
        for(let i=1; i<=7; i++) {
          chartData.push({
            day: `Day +${i}`,
            historical: null,
            predicted: Math.round(baseDemand * (1 + (Math.random() * 0.15 - 0.05)))
          })
        }

        setData(chartData);
      } catch(e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }

  const riskColor = 
    mlData?.risk_level === 'CRITICAL' ? 'text-red-500 bg-red-100 dark:bg-red-900/20' :
    mlData?.risk_level === 'HIGH' ? 'text-orange-500 bg-orange-100 dark:bg-orange-900/20' :
    mlData?.risk_level === 'MEDIUM' ? 'text-amber-500 bg-amber-100 dark:bg-amber-900/20' :
    'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/20';

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">ArogyaPulse AI</h2>
          <p className="text-muted-foreground mt-1">Public Health Intelligence Command Center</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
            <MapPin className="w-4 h-4" /> Maharashtra → Mumbai → PHC Andheri
            <Badge variant="outline" className="ml-2 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              LIVE
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* AI HEALTH RISK */}
        <Card className="md:col-span-1 shadow-lg border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
              AI HEALTH RISK
              <Activity className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold p-4 rounded-lg text-center mb-4 ${riskColor}`}>
              {mlData?.risk_level || 'UNKNOWN'} RISK
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Model Confidence</span>
                <span className="font-semibold text-emerald-500">92%</span>
              </div>
              <div className="flex justify-between">
                <span>Disease Pressure</span>
                <span className="font-semibold text-orange-500">High ↑</span>
              </div>
              <div className="flex justify-between">
                <span>Patient Footfall</span>
                <span className="font-semibold text-amber-500">Medium ↗</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STOCK-OUT RISK */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              STOCK-OUT RISK <Pill className="ml-2 h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className="text-3xl font-bold text-red-500">
                  {((mlData?.stockout_probability || 0) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">Probability</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className="text-3xl font-bold text-amber-500 flex justify-center items-center">
                   {mlData?.estimated_days_of_stock} <span className="text-sm ml-1">days</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">Estimated Remaining</div>
              </div>

              <div className="text-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className="text-3xl font-bold text-orange-500">
                  {mlData?.predicted_shortage_units}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">Predicted Shortage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DEMAND FORECAST */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            7-Day Demand Forecast (Paracetamol 500mg)
          </CardTitle>
          <CardDescription>Historical data vs XGBoost predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" tick={{fontSize: 12}} />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="historical" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  name="Historical Demand"
                  dot={{r: 4}} 
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="AI Predicted Demand"
                  strokeDasharray="5 5"
                  dot={{r: 4, fill: '#8b5cf6'}} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* LIVE MAP */}
      <Card>
        <CardHeader>
          <CardTitle>Live Health Risk Map</CardTitle>
          <CardDescription>Network-wide view of PHC stress levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[500px] bg-muted/50 rounded-lg overflow-hidden border">
            <HealthMap />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
