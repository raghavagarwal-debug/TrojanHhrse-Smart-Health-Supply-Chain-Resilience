"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, TrendingUp, AlertTriangle, ShieldCheck, FileText } from "lucide-react"

export default function AIInsightsPage() {
  const insights = [
    {
      title: "Paracetamol Demand Surge",
      description: "XGBoost models detect a 23% week-over-week increase in Paracetamol demand across the Jaipur district. This correlates with a 15% rise in reported viral fever cases.",
      severity: "high",
      icon: TrendingUp,
      action: "Initiate proactive supply transfer from regional warehouses to Jaipur PHCs."
    },
    {
      title: "Amoxicillin Overstock Warning",
      description: "Forecasts indicate that PHC Shahpur will not consume its current Amoxicillin stock before expiry (estimated 45 days remaining).",
      severity: "medium",
      icon: AlertTriangle,
      action: "Redistribute 500 units to PHC Rampur where stockout probability is 82%."
    },
    {
      title: "Overall Network Health",
      description: "Federated learning models across 4 active PHCs indicate stable baseline health metrics. No new anomaly clusters detected in patient footfall over the last 72 hours.",
      severity: "low",
      icon: ShieldCheck,
      action: "Maintain standard operational protocols."
    }
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
          <BrainCircuit className="w-8 h-8 mr-3 text-indigo-500" />
          AI Insights
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Deep learning analysis and automated recommendations based on network-wide trends.</p>
      </div>

      <div className="grid gap-6">
        {insights.map((insight, idx) => (
          <Card key={idx} className={`bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 border-l-4 ${
            insight.severity === 'high' ? 'border-l-red-500' :
            insight.severity === 'medium' ? 'border-l-amber-500' :
            'border-l-emerald-500'
          }`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl flex items-center text-slate-900 dark:text-white">
                  <insight.icon className={`w-5 h-5 mr-2 ${
                    insight.severity === 'high' ? 'text-red-500' :
                    insight.severity === 'medium' ? 'text-amber-500' :
                    'text-emerald-500'
                  }`} />
                  {insight.title}
                </CardTitle>
                <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                  insight.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                  insight.severity === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}>
                  {insight.severity} Priority
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300">
                {insight.description}
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start">
                <FileText className="w-5 h-5 mr-3 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Recommended Action</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{insight.action}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
