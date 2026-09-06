"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    
    if (!token && pathname !== "/login") {
      router.push("/login");
    } else if (token) {
      setIsAuthenticated(true);
      if (pathname === "/login") {
        router.push("/");
      }
    }
  }, [pathname, router]);

  // Don't render anything until we've checked auth on the client to prevent hydration mismatch
  if (!mounted) return null;

  // If on login page, just return the raw children without sidebar/topbar
  if (pathname === "/login") {
    return <main className="h-screen w-screen overflow-hidden bg-background">{children}</main>;
  }

  // If not authenticated and not on login, we are redirecting, so show nothing or a loader
  if (!isAuthenticated) return null;

  return (
    <div className="flex h-full w-full">
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
