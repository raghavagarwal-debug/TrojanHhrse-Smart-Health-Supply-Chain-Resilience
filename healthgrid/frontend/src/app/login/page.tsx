"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Globe, ArrowRight, Activity, Package, Map, Server, Building2, UserCircle, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const ROLES = [
  {
    id: "NATIONAL_ADMIN",
    title: "National Admin",
    desc: "Full access command center",
    icon: Globe,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20"
  },
  {
    id: "STATE_ADMIN",
    title: "State Admin",
    desc: "Regional monitoring",
    icon: Building2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20"
  },
  {
    id: "DISTRICT_ADMIN",
    title: "District Admin",
    desc: "Local cluster management",
    icon: Map,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20"
  },
  {
    id: "PHC_STAFF",
    title: "PHC Staff",
    desc: "Primary Health Center",
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20"
  },
  {
    id: "SUPPLY_OFFICER",
    title: "Supply Officer",
    desc: "Logistics & inventory",
    icon: Package,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20"
  },
  {
    id: "EMERGENCY_OFFICER",
    title: "Emergency Officer",
    desc: "Disaster & alerts",
    icon: ShieldAlert,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20"
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  const saveAuthAndRedirect = (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/";
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      saveAuthAndRedirect(data);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: regEmail, 
          password: regPassword, 
          name: regName, 
          role: selectedRole || "PUBLIC" 
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      saveAuthAndRedirect(data);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            access_token: tokenResponse.access_token,
            role: selectedRole 
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Google login failed");
        saveAuthAndRedirect(data);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    },
    onError: () => setError("Google Sign-In failed"),
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Aesthetic Background Grid & Lighting */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      </div>
      
      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">HEALTH<span className="text-blue-500">GRID</span></h1>
          </div>
          <p className="text-slate-400 text-lg">
            National Health Intelligence & Resource Resilience Platform
          </p>
        </div>

        {!selectedRole ? (
          <div className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Select Your Authority</h2>
              <p className="text-slate-400">Choose your role to proceed to the authentication portal.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROLES.map((role) => (
                <Card 
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className="bg-slate-950/80 backdrop-blur border-slate-800 hover:border-slate-600 transition-all cursor-pointer group hover:bg-slate-900/80"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={cn("p-2 rounded-lg border", role.bg, role.color, role.border)}>
                        <role.icon className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                    <CardTitle className="text-lg text-white">{role.title}</CardTitle>
                    <CardDescription className="text-slate-400">{role.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="w-full max-w-md bg-slate-950/80 backdrop-blur border-slate-800 relative">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedRole(null)}
              className="absolute left-4 top-4 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            
            <CardHeader className="text-center pb-2 mt-8">
              <CardTitle>Authenticate</CardTitle>
              <CardDescription>
                Portal: <span className="text-white font-medium">{ROLES.find(r => r.id === selectedRole)?.title}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-md border border-red-500/20">
                  <ShieldAlert className="h-4 w-4" />
                  {error}
                </div>
              )}

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-900">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleManualLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Email</label>
                      <input 
                        type="email" 
                        required
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Password</label>
                      <div className="relative">
                        <input 
                          type={showLoginPassword ? "text" : "password"} 
                          required
                          value={loginPassword}
                          onChange={e => setLoginPassword(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-md pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 mt-2">
                      {loading ? "Authenticating..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={regName}
                        onChange={e => setRegName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Email</label>
                      <input 
                        type="email" 
                        required
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        placeholder="john@healthgrid.in"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Password</label>
                      <div className="relative">
                        <input 
                          type={showRegPassword ? "text" : "password"} 
                          required
                          value={regPassword}
                          onChange={e => setRegPassword(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-md pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 mt-2">
                      {loading ? "Registering..." : `Create ${ROLES.find(r => r.id === selectedRole)?.title} Account`}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>

            <div className="px-6 pb-6">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-950 px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="flex justify-center w-full">
                <Button 
                  onClick={() => loginWithGoogle()}
                  variant="outline" 
                  className="w-full bg-slate-900 border-slate-800 hover:bg-slate-800 hover:text-white transition-all h-12 text-sm font-medium"
                >
                  <GoogleIcon />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
