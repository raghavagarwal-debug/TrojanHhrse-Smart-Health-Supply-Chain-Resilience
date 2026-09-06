"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Key, Database, Bell } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Platform Settings</h2>
        <p className="text-muted-foreground mt-1">Manage API keys, integrations, and notification preferences.</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Sidebar (visual only) */}
        <div className="space-y-1">
          {[
            { name: "API & Integrations", icon: Key, active: true },
            { name: "Data Synchronization", icon: Database, active: false },
            { name: "Alert Preferences", icon: Bell, active: false },
          ].map((tab, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${tab.active ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200'}`}>
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Generative AI Integration</CardTitle>
              <CardDescription>Configure Google Gemini API for predictive analytics and natural language risk explanations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gemini">Gemini API Key</Label>
                <div className="flex gap-2">
                  <Input id="gemini" type="password" value="****************************************" readOnly className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 font-mono text-slate-500" />
                  <Button variant="outline" className="border-slate-200 dark:border-slate-700">Edit</Button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Currently using `gemini-2.5-flash` model.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Mapbox & GIS Services</CardTitle>
              <CardDescription>Keys required for advanced routing optimization and Isochrone maps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mapbox">Mapbox Access Token (Optional)</Label>
                <Input id="mapbox" placeholder="pk.eyJ1..." className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 font-mono" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Real-time Data Polling</Label>
                  <p className="text-sm text-slate-500">Automatically fetch new PHC data every 30 seconds.</p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">SMS Alert Gateway</Label>
                  <p className="text-sm text-slate-500">Send SMS to local authorities for Critical stock-outs.</p>
                </div>
                <Switch checked={false} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
