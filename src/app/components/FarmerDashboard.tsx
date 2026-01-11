import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Leaf, Bell, Thermometer, Droplets, Sprout, AlertTriangle, TrendingUp, Settings, LifeBuoy } from "lucide-react";
import { Badge } from "./ui/badge";

interface FarmerDashboardProps {
  onBack: () => void;
}

interface Zone {
  id: string;
  name: string;
  status: "optimal" | "caution" | "critical";
  temp: number;
  humidity: number;
  growth: string;
  alert?: {
    type: string;
    message: string;
    timestamp: string;
    action: string;
  };
}

export function FarmerDashboard({ onBack }: FarmerDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [zones, setZones] = useState<Zone[]>([
    {
      id: "A",
      name: "Zone A",
      status: "optimal",
      temp: 28,
      humidity: 65,
      growth: "Growing",
    },
    {
      id: "B",
      name: "Zone B",
      status: "caution",
      temp: 35,
      humidity: 45,
      growth: "High Risk",
      alert: {
        type: "Temperature Alert",
        message: "Temperature: 35°C | RISK LEVEL: HIGH",
        timestamp: "Detected 2 mins ago",
        action: "Open Vents Now",
      },
    },
    {
      id: "C",
      name: "Zone C",
      status: "optimal",
      temp: 27,
      humidity: 70,
      growth: "Growing",
    },
  ]);

  const [activeAlerts, setActiveAlerts] = useState(1);
  const [actionTaken, setActionTaken] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTakeAction = (zoneId: string) => {
    setZones(prevZones =>
      prevZones.map(zone =>
        zone.id === zoneId
          ? {
              ...zone,
              status: "optimal" as const,
              temp: 28,
              humidity: 65,
              growth: "Growing",
              alert: undefined,
            }
          : zone
      )
    );
    setActiveAlerts(prev => Math.max(0, prev - 1));
    setActionTaken(true);
    setTimeout(() => setActionTaken(false), 2000);
  };

  const activeAlert = zones.find(z => z.alert);

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-green-500/30 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative bg-green-600 p-2 rounded-lg">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">GreenMind</h1>
                  <p className="text-green-400 text-sm">Welcome, Hassan</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-2xl font-mono text-green-400">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <button className="relative">
                  <Bell className="h-6 w-6 text-green-400" />
                  {activeAlerts > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-0 px-1.5 py-0.5 text-xs animate-pulse">
                      {activeAlerts}
                    </Badge>
                  )}
                </button>
                <Button onClick={onBack} variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
                  Exit
                </Button>
              </div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        </header>

        <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
          {/* Zone Status Overview */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Zone Status Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {zones.map((zone) => (
                <Card
                  key={zone.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${
                    zone.status === "optimal"
                      ? "border-green-500 bg-gray-900/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                      : zone.status === "caution"
                      ? "border-yellow-500 bg-gray-900/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                      : "border-red-500 bg-gray-900/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                  } backdrop-blur-md border-2`}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 opacity-20 ${
                    zone.status === "optimal"
                      ? "bg-green-500"
                      : zone.status === "caution"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } blur-xl`}></div>

                  <CardContent className="relative p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          zone.status === "optimal"
                            ? "bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]"
                            : zone.status === "caution"
                            ? "bg-yellow-500 animate-pulse shadow-[0_0_10px_rgba(234,179,8,1)]"
                            : "bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]"
                        }`}></div>
                        <h3 className="text-2xl font-bold">{zone.name}</h3>
                      </div>
                      {zone.alert && (
                        <Badge className="bg-red-500 text-white border-0 px-2 py-1 animate-pulse">
                          <AlertTriangle className="h-4 w-4" />
                        </Badge>
                      )}
                    </div>

                    <div className={`text-lg font-semibold ${
                      zone.status === "optimal"
                        ? "text-green-400"
                        : zone.status === "caution"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}>
                      {zone.status === "optimal" ? "Optimal" : zone.status === "caution" ? "Caution" : "Critical"}
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-400">
                          <Thermometer className="h-4 w-4" />
                          Temperature
                        </span>
                        <span className={`font-bold ${zone.temp > 30 ? "text-red-400" : "text-green-400"}`}>
                          {zone.temp}°C
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-400">
                          <Droplets className="h-4 w-4" />
                          Humidity
                        </span>
                        <span className={`font-bold ${zone.humidity < 50 ? "text-yellow-400" : "text-green-400"}`}>
                          {zone.humidity}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-400">
                          <Sprout className="h-4 w-4" />
                          Status
                        </span>
                        <span className={`font-bold ${zone.growth === "Growing" ? "text-green-400" : "text-red-400"}`}>
                          {zone.growth}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Active Alert Panel */}
          {activeAlert && !actionTaken && (
            <section className="relative animate-in fade-in slide-in-from-top duration-500">
              <Card className="relative overflow-hidden border-2 border-red-500 bg-gradient-to-r from-red-950/50 to-orange-950/50 backdrop-blur-md shadow-[0_0_40px_rgba(239,68,68,0.5)]">
                {/* Pulsing glow */}
                <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse"></div>

                <CardContent className="relative p-8">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 animate-pulse"></div>
                      <AlertTriangle className="relative h-16 w-16 text-red-500" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-3xl font-bold text-red-400 mb-2">
                          {activeAlert.name} – {activeAlert.alert!.type}
                        </h3>
                        <p className="text-xl text-red-300 font-semibold">
                          {activeAlert.alert!.message}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          {activeAlert.alert!.timestamp}
                        </p>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          onClick={() => handleTakeAction(activeAlert.id)}
                          className="bg-green-600 hover:bg-green-500 text-white px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all"
                        >
                          {activeAlert.alert!.action}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-6 text-lg"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Success Message */}
          {actionTaken && (
            <section className="relative animate-in fade-in slide-in-from-top duration-500">
              <Card className="relative overflow-hidden border-2 border-green-500 bg-gradient-to-r from-green-950/50 to-emerald-950/50 backdrop-blur-md shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                <CardContent className="relative p-6 text-center">
                  <div className="flex items-center justify-center gap-3 text-green-400">
                    <div className="bg-green-500 rounded-full p-2">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-2xl font-bold">Action Completed Successfully!</span>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Quick Actions Panel */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-32 border-2 border-cyan-500/50 bg-gray-900/50 hover:bg-cyan-500/10 hover:border-cyan-500 backdrop-blur-md hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex flex-col gap-3"
              >
                <TrendingUp className="h-10 w-10 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">View Detailed Analytics</span>
              </Button>

              <Button
                variant="outline"
                className="h-32 border-2 border-red-500/50 bg-gray-900/50 hover:bg-red-500/10 hover:border-red-500 backdrop-blur-md hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all flex flex-col gap-3 relative"
              >
                <Bell className="h-10 w-10 text-red-400" />
                <span className="text-red-400 font-semibold">Check All Alerts</span>
                {activeAlerts > 0 && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white border-0 px-2 py-1 animate-pulse">
                    {activeAlerts}
                  </Badge>
                )}
              </Button>

              <Button
                variant="outline"
                className="h-32 border-2 border-orange-500/50 bg-gray-900/50 hover:bg-orange-500/10 hover:border-orange-500 backdrop-blur-md hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all flex flex-col gap-3"
              >
                <LifeBuoy className="h-10 w-10 text-orange-400" />
                <span className="text-orange-400 font-semibold">Open Emergency Controls</span>
              </Button>

              <Button
                variant="outline"
                className="h-32 border-2 border-purple-500/50 bg-gray-900/50 hover:bg-purple-500/10 hover:border-purple-500 backdrop-blur-md hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all flex flex-col gap-3"
              >
                <Settings className="h-10 w-10 text-purple-400" />
                <span className="text-purple-400 font-semibold">View Manual & Settings</span>
              </Button>
            </div>
          </section>

          {/* Mini Status Bar */}
          <section className="border-t border-green-500/30 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]"></div>
                <span className="text-green-400 font-semibold">All Systems Online</span>
              </div>
              <div className="text-gray-400">
                Last sync: <span className="text-cyan-400">Updated 1 min ago</span>
              </div>
              <div className="text-gray-400">
                User role: <span className="text-green-400">Farmer – Hassan</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
