import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Home,
  Map,
  Bell,
  TrendingUp,
  Settings,
  User,
  MessageCircle,
  RefreshCw,
  Thermometer,
  Droplets,
  Wind,
  Phone,
  AlertCircle,
  ChevronDown,
  Sun,
  CloudRain,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ZoneMap3D } from "./ZoneMap3D";
import { ZoneInterior3D } from "./ZoneInterior3D";
import { DigitalTwinSimulator } from "./DigitalTwinSimulator";
import { AerialZoneMap } from "./AerialZoneMap";
import { GreenhouseViewer } from "./GreenhouseViewer";
import { AIChatAssistant } from "./AIChatAssistant";
import { PlantVideoMonitor } from "./PlantVideoMonitor";
import { ZoneDetailPage } from "./ZoneDetailPage";
import { ChatbaseWidget } from "./ChatbaseWidget";

interface HassanDashboardProps {
  onBack: () => void;
}

export function HassanDashboard({ onBack }: HassanDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showZoneDetail, setShowZoneDetail] = useState<string | null>(null);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [mapViewType, setMapViewType] = useState<"3d" | "aerial">("aerial");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [zones, setZones] = useState([
    { id: "A", name: "Zone A", status: "good", temp: 22, humidity: 65, moisture: 72 },
    { id: "B", name: "Zone B", status: "warning", temp: 35, humidity: 45, moisture: 58 },
    { id: "C", name: "Zone C", status: "good", temp: 21, humidity: 68, moisture: 75 },
    { id: "D", name: "Zone D", status: "good", temp: 23, humidity: 62, moisture: 70 },
    { id: "E", name: "Zone E", status: "good", temp: 22, humidity: 67, moisture: 73 },
    { id: "F", name: "Zone F", status: "good", temp: 24, humidity: 64, moisture: 69 },
  ]);

  const handleZoneClick = (zoneName: string) => {
    setSelectedZone(zoneName);
  };

  const handleBackToZoneMap = () => {
    setSelectedZone(null);
  };

  const temperatureData = [
    { time: "6 AM", temp: 18 },
    { time: "9 AM", temp: 22 },
    { time: "12 PM", temp: 28 },
    { time: "2 PM", temp: 35 },
    { time: "3 PM", temp: 32 },
    { time: "6 PM", temp: 26 },
  ];

  const moistureData = zones.map(zone => ({
    zone: zone.id,
    moisture: zone.moisture,
  }));

  const handleOpenVents = () => {
    setZones(prevZones =>
      prevZones.map(zone =>
        zone.id === "B" ? { ...zone, status: "good", temp: 24, humidity: 60 } : zone
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "alert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case "good":
        return "border-green-500";
      case "warning":
        return "border-yellow-500";
      case "alert":
        return "border-red-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GreenMind</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "dashboard"
                ? "bg-green-50 text-green-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("zone-map")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "zone-map"
                ? "bg-green-50 text-green-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Map className="h-5 w-5" />
            <span>Zone Map</span>
          </button>

          <button
            onClick={() => setActiveTab("alerts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "alerts"
                ? "bg-green-50 text-green-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Bell className="h-5 w-5" />
            <span>Alerts</span>
            {zones.some(z => z.status !== "good") && (
              <Badge className="ml-auto bg-red-500 text-white">1</Badge>
            )}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "history"
                ? "bg-green-50 text-green-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>History</span>
          </button>

          <button
            onClick={() => setActiveTab("simulator")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "simulator"
                ? "bg-green-50 text-green-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span>Digital Twin</span>
            <Badge className="ml-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs">AI</Badge>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "settings"
                ? "bg-green-50 text-green-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button onClick={onBack} variant="outline" className="w-full">
            Exit Dashboard
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <ChatbaseWidget />
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Good Morning, Mr. Hassan</h1>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative group">
                <Bell className="h-5 w-5 text-gray-600" />
                {zones.some(z => z.status !== "good") && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg relative group" 
                title="Ask AI Assistant"
              >
                <MessageCircle className="h-5 w-5 text-gray-600" />
                <span className="absolute -bottom-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Ask AI Assistant
                </span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {activeTab === "simulator" ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Digital Twin Simulator</h2>
              <p className="text-gray-600 mb-6">
                Predict plant growth outcomes by adjusting environmental parameters
              </p>
              <DigitalTwinSimulator />
            </div>
          ) : activeTab === "zone-map" ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Zone Map</h2>
                  <p className="text-gray-600 mt-1">Greenhouse 3D model view</p>
                </div>
              </div>
              <div className="h-[calc(100vh-16rem)] bg-gray-900 rounded-lg overflow-hidden">
                <GreenhouseViewer onBack={() => setActiveTab("dashboard")}/>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">Here's your greenhouse at a glance</p>

              {/* Zone Map */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Zone Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {zones.map((zone) => (
                    <Card
                      key={zone.id}
                      className={`cursor-pointer hover:shadow-lg transition-all border-2 ${getStatusBorder(
                        zone.status
                      )}`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{zone.name}</CardTitle>
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)}`}></div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-gray-600">
                            <Thermometer className="h-4 w-4" />
                            Temp
                          </span>
                          <span className={`font-semibold ${zone.temp > 30 ? "text-red-600" : "text-gray-900"}`}>
                            {zone.temp}°C
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-gray-600">
                            <Droplets className="h-4 w-4" />
                            Humidity
                          </span>
                          <span className="font-semibold text-gray-900">{zone.humidity}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-gray-600">
                            <Wind className="h-4 w-4" />
                            Moisture
                          </span>
                          <span className="font-semibold text-gray-900">{zone.moisture}%</span>
                        </div>
                        {zone.status === "warning" && (
                          <div className="pt-2 border-t mt-2">
                            <Badge className="bg-yellow-500 text-white">
                              <Thermometer className="h-3 w-3 mr-1" />
                              High Temp
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 bg-green-500 hover:bg-green-600 flex flex-col gap-2">
                    <Wind className="h-6 w-6" />
                    Open All Vents
                  </Button>
                  <Button className="h-20 bg-blue-500 hover:bg-blue-600 flex flex-col gap-2">
                    <Droplets className="h-6 w-6" />
                    Water Zone B
                  </Button>
                  <Button className="h-20 bg-yellow-500 hover:bg-yellow-600 flex flex-col gap-2">
                    <Bell className="h-6 w-6" />
                    Check Alerts
                  </Button>
                  <Button className="h-20 bg-purple-500 hover:bg-purple-600 flex flex-col gap-2">
                    <Phone className="h-6 w-6" />
                    Call Agronomist
                  </Button>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Temperature Trend</CardTitle>
                    <CardDescription>Temperature variations throughout the day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temp" stroke="#4CAF50" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Soil Moisture Levels</CardTitle>
                    <CardDescription>Current moisture by zone</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={moistureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="zone" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="moisture" fill="#4CAF50" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-96 bg-white border-l border-gray-200 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Live Alerts */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Live Alerts & Suggestions</h2>

            {zones.some(z => z.status === "warning") && (
              <Card className="border-2 border-yellow-500 mb-4">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">High Temp Alert - Zone B</CardTitle>
                      <CardDescription className="mt-1">
                        Temperature rising to 35°C. Potatoes at risk of heat stress.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <button
                    onClick={() => setExpandedAlert(expandedAlert === "temp" ? null : "temp")}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedAlert === "temp" ? "rotate-180" : ""
                      }`}
                    />
                    Why?
                  </button>

                  {expandedAlert === "temp" && (
                    <div className="bg-yellow-50 p-3 rounded-lg text-sm text-gray-700">
                      High temperatures can cause heat stress in potato plants, reducing yield and quality.
                      Immediate ventilation is recommended.
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={handleOpenVents} className="flex-1 bg-green-500 hover:bg-green-600">
                      Open Vents Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Ignore for Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!zones.some(z => z.status !== "good") && (
              <Card className="border-2 border-green-500">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="font-semibold text-gray-900">All zones are operating normally</p>
                  <p className="text-sm text-gray-600 mt-1">No alerts at this time</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Today's Weather */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="h-12 w-12 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">28°C</p>
                    <p className="text-sm text-gray-600">Sunny</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">High: 32°C</p>
                  <p className="text-sm text-gray-600">Low: 18°C</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-semibold">55%</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Wind</span>
                  <span className="font-semibold">12 km/h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* AI Chat Assistant */}
      <AIChatAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        zones={zones}
      />
    </div>
  );
}
