"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix leaflet marker icon issue in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const phcData = [
  { id: 1, name: "PHC Rampur", position: [26.9124, 75.7873], status: "critical", pop: 12450, stock: "12%", beds: "48/50" },
  { id: 2, name: "PHC Shahpur", position: [26.8921, 75.8011], status: "surplus", pop: 8500, stock: "94%", beds: "12/50" },
  { id: 3, name: "PHC Andheri", position: [19.1136, 72.8697], status: "warning", pop: 45000, stock: "45%", beds: "42/50" },
  { id: 4, name: "PHC Whitefield", position: [12.9698, 77.7499], status: "stable", pop: 22000, stock: "82%", beds: "20/50" },
  { id: 5, name: "PHC Connaught", position: [28.6315, 77.2167], status: "warning", pop: 55000, stock: "35%", beds: "95/100" },
  { id: 6, name: "PHC Salt Lake", position: [22.5804, 88.4124], status: "stable", pop: 32000, stock: "78%", beds: "35/80" },
  { id: 7, name: "PHC T-Nagar", position: [13.0405, 80.2337], status: "critical", pop: 65000, stock: "8%", beds: "120/120" },
  { id: 8, name: "PHC HITEC City", position: [17.4435, 78.3772], status: "surplus", pop: 28000, stock: "115%", beds: "22/60" },
  { id: 9, name: "PHC Vastrapur", position: [23.0375, 72.5284], status: "stable", pop: 19500, stock: "65%", beds: "18/40" },
  { id: 10, name: "PHC Kothrud", position: [18.5036, 73.8016], status: "warning", pop: 26000, stock: "22%", beds: "45/50" },
  { id: 11, name: "PHC Gomti Nagar", position: [26.8530, 80.9995], status: "critical", pop: 41000, stock: "15%", beds: "78/80" },
  { id: 12, name: "PHC Kankarbagh", position: [25.5996, 85.1508], status: "warning", pop: 38000, stock: "28%", beds: "60/65" },
]

export default function HealthMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-full w-full bg-slate-900 animate-pulse rounded-md border border-slate-800" />

  return (
    <div className="h-full w-full rounded-md overflow-hidden relative z-0">
      <MapContainer 
        center={[22.5937, 78.9629]} 
        zoom={5} 
        style={{ height: "100%", width: "100%", background: "#0f172a" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {phcData.map((phc) => (
          <CircleMarker
            key={phc.id}
            center={phc.position as [number, number]}
            radius={phc.status === 'critical' ? 12 : phc.status === 'warning' ? 10 : 8}
            pathOptions={{
              fillColor: phc.status === 'critical' ? '#ef4444' : phc.status === 'warning' ? '#f59e0b' : phc.status === 'surplus' ? '#3b82f6' : '#10b981',
              color: phc.status === 'critical' ? '#fca5a5' : '#ffffff',
              weight: phc.status === 'critical' ? 3 : 1,
              fillOpacity: 0.8
            }}
          >
            <Popup className="custom-popup">
              <div className="font-sans min-w-[200px]">
                <div className="flex justify-between items-start mb-2">
                  <strong className="block text-sm text-slate-800">{phc.name}</strong>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    phc.status === 'critical' ? 'bg-red-100 text-red-600' : 
                    phc.status === 'warning' ? 'bg-amber-100 text-amber-600' : 
                    phc.status === 'surplus' ? 'bg-blue-100 text-blue-600' : 
                    'bg-emerald-100 text-emerald-600'
                  }`}>{phc.status}</span>
                </div>
                
                <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Population:</span>
                    <span className="font-medium text-slate-700">{phc.pop.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Inventory Level:</span>
                    <span className={`font-medium ${parseInt(phc.stock) < 20 ? 'text-red-600' : 'text-slate-700'}`}>{phc.stock}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Bed Occupancy:</span>
                    <span className="font-medium text-slate-700">{phc.beds}</span>
                  </div>
                </div>
                
                <a href="/twin" className="mt-3 w-full block text-center bg-blue-50 hover:bg-blue-100 text-blue-600 py-1.5 rounded text-xs font-medium transition-colors">
                  Open Digital Twin
                </a>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
