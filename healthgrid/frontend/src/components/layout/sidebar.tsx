"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { label: "Live Health Map", icon: Map, href: "/map" },
  { label: "PHC Network", icon: Network, href: "/network" },
  { label: "Inventory Intelligence", icon: Package, href: "/inventory" },
  { label: "Demand Forecasts", icon: TrendingUp, href: "/forecasts" },
  { label: "Risk & Alerts", icon: AlertTriangle, href: "/alerts" },
  { label: "Resource Optimizer", icon: GitMerge, href: "/optimizer" },
  { label: "Emergency Simulator", icon: Activity, href: "/simulator" },
  { label: "Digital Twin", icon: Server, href: "/twin" },
  { label: "Federated AI", icon: Network, href: "/federated" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Reports", icon: FileText, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const bottomRoutes = [
  { label: "Authority Portal", icon: Server, href: "/portal" },
  { label: "Staff Login", icon: Settings, href: "/login" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white w-64 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">HEALTHGRID</h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">National Intelligence</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {routes.map((route) => (
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
      
      <div className="p-4 border-t border-slate-800">
        <nav className="space-y-1">
          {bottomRoutes.map((route) => (
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
    </div>
  );
}
