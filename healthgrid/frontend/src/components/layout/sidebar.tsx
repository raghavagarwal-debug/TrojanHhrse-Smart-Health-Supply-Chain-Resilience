"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Map,
  Package,
  TrendingUp,
  AlertTriangle,
  GitMerge,
  Activity,
  Server,
  Network,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Command Center", icon: LayoutDashboard, href: "/" },
  { label: "Live Risk Map", icon: Map, href: "/risk-map" },
  { label: "AI Simulator", icon: Activity, href: "/simulator" },
  { label: "AI Insights", icon: Server, href: "/ai-insights" },
  { label: "Inventory Intelligence", icon: Package, href: "/inventory" },
  { label: "Demand Forecasts", icon: TrendingUp, href: "/forecasts" },
  { label: "Risk & Alerts", icon: AlertTriangle, href: "/alerts" },
  { label: "Reports", icon: FileText, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/settings" },
];


export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getVisibleRoutes = () => {
    if (!user) return routes;

    const role = user.role;
    if (role === "NATIONAL_ADMIN" || role === "STATE_ADMIN" || role === "DISTRICT_ADMIN" || role === "ADMIN") {
      return routes;
    }
    if (role === "PHC_STAFF" || role === "DOCTOR") {
      return routes.filter(r => ["/", "/inventory", "/reports", "/settings"].includes(r.href));
    }
    if (role === "SUPPLY_OFFICER" || role === "FIELD_WORKER") {
      return routes.filter(r => ["/", "/inventory", "/forecasts", "/settings"].includes(r.href));
    }
    if (role === "EMERGENCY_OFFICER" || role === "GOVERNMENT_OFFICIAL") {
      return routes.filter(r => ["/", "/risk-map", "/alerts", "/simulator", "/settings"].includes(r.href));
    }
    return routes; // Fallback
  };

  const visibleRoutes = getVisibleRoutes();

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white w-64 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">AROGYAPULSE</h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">National Intelligence</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {visibleRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                pathname === route.href
                  ? "bg-blue-600/10 text-blue-400"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              )}
            >
              <route.icon className={cn("h-4 w-4", pathname === route.href ? "text-blue-400" : "text-slate-400")} />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-800 bg-slate-900/30">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/20">
                {user.name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{user.name}</span>
                <span className="text-[10px] text-slate-500 truncate font-mono bg-slate-900 px-1 py-0.5 rounded border border-slate-800 w-fit mt-0.5">
                  {user.role}
                </span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 py-2 rounded transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="text-xs text-slate-500 text-center">Not logged in</div>
        )}
      </div>
    </div>
  );
}
