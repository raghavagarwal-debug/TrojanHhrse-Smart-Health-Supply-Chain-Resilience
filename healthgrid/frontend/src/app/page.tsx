"use client"

import { useEffect, useState } from "react"
import NationalAdminDashboard from "@/components/dashboards/NationalAdminDashboard"
import StateAdminDashboard from "@/components/dashboards/StateAdminDashboard"
import DistrictAdminDashboard from "@/components/dashboards/DistrictAdminDashboard"
import PHCStaffDashboard from "@/components/dashboards/PHCStaffDashboard"
import SupplyOfficerDashboard from "@/components/dashboards/SupplyOfficerDashboard"
import EmergencyOfficerDashboard from "@/components/dashboards/EmergencyOfficerDashboard"

export default function Home() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    // Get the user from localStorage on the client side
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setRole(user.role || null)
      } catch (e) {
        console.error("Failed to parse user from localStorage", e)
      }
    }
  }, [])

  if (!role) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Route to the correct dashboard based on the user's role
  switch (role) {
    case "NATIONAL_ADMIN":
    case "SUPER_ADMIN":
      return <NationalAdminDashboard />
    case "STATE_ADMIN":
      return <StateAdminDashboard />
    case "DISTRICT_ADMIN":
      return <DistrictAdminDashboard />
    case "PHC_STAFF":
      return <PHCStaffDashboard />
    case "SUPPLY_OFFICER":
      return <SupplyOfficerDashboard />
    case "EMERGENCY_OFFICER":
      return <EmergencyOfficerDashboard />
    default:
      // Fallback if role is unrecognized
      return <PHCStaffDashboard />
  }
}
