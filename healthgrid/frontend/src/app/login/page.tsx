"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, Activity } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("demo@healthgrid.in")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Login failed")
      }
      
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      
      router.push("/portal")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-blue-900/30 bg-black/40 backdrop-blur-md">
        <CardHeader className="space-y-1 items-center text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <Activity className="text-white h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Authority Access</CardTitle>
          <CardDescription>
            Enter your secure credentials to access the data entry portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Official Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Secure Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                <ShieldAlert className="h-4 w-4" />
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors flex justify-center items-center h-10"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Authenticate"
              )}
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-xs text-slate-500 border-t border-slate-800 pt-4 space-y-2">
          <p>Authorized personnel only. Access is logged.</p>
          <div className="w-full bg-slate-900/50 rounded p-2 text-[10px] space-y-1 text-slate-400">
            <p><strong className="text-blue-400">Admin:</strong> demo@healthgrid.in / password123</p>
            <p><strong className="text-emerald-400">Staff:</strong> staff@healthgrid.in / password123</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
