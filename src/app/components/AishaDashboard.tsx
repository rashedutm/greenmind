import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChatbaseWidget } from "./ChatbaseWidget";
import {
  Home,
  Calendar,
  Truck,
  ClipboardCheck,
  Users,
  DollarSign,
  Bell,
  MessageCircle,
  User,
  AlertTriangle,
  Phone,
  CheckCircle2,
  Sun,
  Cloud,
  CloudRain,
  FileText,
} from "lucide-react";

interface AishaDashboardProps {
  onBack: () => void;
}

export function AishaDashboard({ onBack }: AishaDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const batchStatus = [
    {
      zone: "Zone A",
      status: "Premium Grade - Ready to Ship",
      statusType: "ready",
      readiness: 100,
    },
    {
      zone: "Zone B",
      status: "Heat Stress - Delayed 3 Days",
      statusType: "delayed",
      readiness: 45,
    },
    {
      zone: "Zone C",
      status: "Standard Grade - Ready",
      statusType: "ready",
      readiness: 90,
    },
  ];

  const customerOrders = [
    { customer: "Restaurant X", day: "Mon", status: "on-track", color: "bg-green-500" },
    { customer: "Supermarket Y", day: "Wed", status: "on-track", color: "bg-green-500" },
    { customer: "Export Order", day: "Fri", status: "at-risk", color: "bg-yellow-500" },
  ];

  const weeklyForecast = [
    { day: "Mon", icon: Sun, risk: "Low Risk", color: "text-yellow-500" },
    { day: "Tue", icon: Cloud, risk: "Low", color: "text-gray-400" },
    { day: "Wed", icon: Sun, risk: "Med", color: "text-yellow-500" },
    { day: "Thu", icon: Cloud, risk: "Low", color: "text-gray-400" },
    { day: "Fri", icon: CloudRain, risk: "High", color: "text-blue-500" },
    { day: "Sat", icon: Sun, risk: "Low", color: "text-yellow-500" },
    { day: "Sun", icon: Sun, risk: "Low", color: "text-yellow-500" },
  ];

  const totalReadiness = Math.round(
    batchStatus.reduce((sum, batch) => sum + batch.readiness, 0) / batchStatus.length
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatbaseWidget />
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GreenMind Biz</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg relative group"
              title="Ask about shipment status or quality forecasts"
            >
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <span className="absolute -bottom-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Ask AI
              </span>
            </button>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Ms. Aisha</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-auto">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "overview"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("harvest")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "harvest"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Harvest Schedule</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "orders"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Truck className="h-5 w-5" />
              <span>Orders & Shipments</span>
            </button>

            <button
              onClick={() => setActiveTab("quality")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "quality"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <ClipboardCheck className="h-5 w-5" />
              <span>Quality Reports</span>
            </button>

            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "customers"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setActiveTab("financials")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "financials"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <DollarSign className="h-5 w-5" />
              <span>Financials</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200 mt-auto">
            <Button onClick={onBack} variant="outline" className="w-full">
              Exit Dashboard
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Business Overview - Week 42</h1>
            </div>

            {/* Harvest Readiness Meter */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md border-2 border-blue-500">
                <CardHeader className="text-center">
                  <CardTitle>Harvest Readiness</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {/* Circular Gauge */}
                  <div
                    className="relative w-64 h-64 mb-6"
                    onMouseEnter={() => setHoveredZone("all")}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    {/* SVG Gauge */}
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Background circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="20"
                      />
                      {/* Red segment (0-33%) */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="20"
                        strokeDasharray={`${33 * 5.03} 502.4`}
                        strokeDashoffset="125.6"
                        transform="rotate(-90 100 100)"
                      />
                      {/* Yellow segment (33-66%) */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="20"
                        strokeDasharray={`${33 * 5.03} 502.4`}
                        strokeDashoffset="-40.4"
                        transform="rotate(-90 100 100)"
                      />
                      {/* Green segment (66-100%) */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="20"
                        strokeDasharray={`${34 * 5.03} 502.4`}
                        strokeDashoffset="-206.4"
                        transform="rotate(-90 100 100)"
                      />
                      {/* Needle */}
                      <line
                        x1="100"
                        y1="100"
                        x2="100"
                        y2="30"
                        stroke="#1f2937"
                        strokeWidth="3"
                        strokeLinecap="round"
                        transform={`rotate(${(totalReadiness / 100) * 180 - 90} 100 100)`}
                      />
                      {/* Center dot */}
                      <circle cx="100" cy="100" r="8" fill="#1f2937" />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">{totalReadiness}%</span>
                      <span className="text-sm text-gray-600 mt-1">Ready for Shipment</span>
                    </div>
                  </div>

                  {/* Hover breakdown */}
                  {hoveredZone === "all" && (
                    <div className="bg-gray-100 p-3 rounded-lg text-sm w-full">
                      <p className="font-semibold text-gray-900 mb-2">Breakdown by Zone:</p>
                      <div className="space-y-1">
                        {batchStatus.map((batch) => (
                          <div key={batch.zone} className="flex justify-between">
                            <span className="text-gray-700">{batch.zone}:</span>
                            <span className="font-semibold text-gray-900">{batch.readiness}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Batch Status Cards */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Batch Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {batchStatus.map((batch) => (
                  <Card
                    key={batch.zone}
                    className={`cursor-pointer hover:shadow-lg transition-all border-2 ${
                      batch.statusType === "ready"
                        ? "border-green-500"
                        : batch.statusType === "delayed"
                        ? "border-yellow-500"
                        : "border-gray-300"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{batch.zone}</CardTitle>
                        {batch.statusType === "ready" ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-6 w-6 text-yellow-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p
                        className={`font-semibold ${
                          batch.statusType === "ready" ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {batch.status}
                      </p>
                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            batch.statusType === "ready" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{ width: `${batch.readiness}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{batch.readiness}% Ready</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Customer Orders Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Orders Timeline</CardTitle>
                <CardDescription>Upcoming shipments this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerOrders.map((order) => (
                    <div key={order.customer} className="flex items-center gap-4">
                      <div className="w-32 text-sm font-semibold text-gray-700">
                        {order.customer}
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className={`h-8 ${order.color} rounded flex-1 max-w-xs`}></div>
                        <Badge
                          className={`${
                            order.status === "on-track"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                        >
                          {order.day}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {order.status === "on-track" ? "On Track" : "At Risk"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forecast & Planning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weather Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle>Next 7-Day Forecast</CardTitle>
                  <CardDescription>Risk assessment for operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {weeklyForecast.map((day, idx) => {
                      const Icon = day.icon;
                      return (
                        <div key={idx} className="flex flex-col items-center text-center">
                          <span className="text-xs text-gray-600 mb-2">{day.day}</span>
                          <Icon className={`h-8 w-8 ${day.color} mb-2`} />
                          <span
                            className={`text-xs font-semibold ${
                              day.risk === "High"
                                ? "text-red-600"
                                : day.risk === "Med"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {day.risk}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Notes</CardTitle>
                  <CardDescription>Important customer requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        Restaurant X expects Premium batch by Friday.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        Supermarket Y flexible on Standard grade.
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Update CRM
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-80 bg-white border-l border-gray-200 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Priority Alerts */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Priority Alerts</h3>

              <Card className="border-2 border-yellow-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">Quality Dip in Zone B</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        Potato quality score dropped from 92 to 84. May affect Premium batch for
                        Restaurant X.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-red-900">Business Impact:</p>
                    <p className="text-sm text-red-800">12% revenue risk ($2,950)</p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Grower
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Adjust Shipment Date
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week's Revenue</span>
                  <span className="text-xl font-bold text-green-600">$24,580</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">On-Time Delivery</span>
                  <span className="text-xl font-bold text-blue-600">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Premium Yield</span>
                  <span className="text-xl font-bold text-purple-600">76%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
