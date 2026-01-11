import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { ChatbaseWidget } from "./ChatbaseWidget";
import {
  Home,
  Layers,
  Stethoscope,
  BarChart3,
  FileText,
  Users,
  Bell,
  MessageCircle,
  User,
  Download,
  FileDown,
  Share2,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface FatimaDashboardProps {
  onBack: () => void;
}

export function FatimaDashboard({ onBack }: FatimaDashboardProps) {
  const [activeTab, setActiveTab] = useState("multi-zone");
  const [timeRange, setTimeRange] = useState("7days");
  const [expandedInsight, setExpandedInsight] = useState(false);
  const [expertNote, setExpertNote] = useState("");

  // Zone A data
  const zoneAData = [
    { time: "00:00", temp: 18, humidity: 75 },
    { time: "04:00", temp: 17, humidity: 78 },
    { time: "08:00", temp: 21, humidity: 70 },
    { time: "12:00", temp: 26, humidity: 60 },
    { time: "16:00", temp: 28, humidity: 55 },
    { time: "20:00", temp: 23, humidity: 65 },
  ];

  // Zone B data
  const zoneBData = [
    { time: "00:00", temp: 22, humidity: 85 },
    { time: "04:00", temp: 22, humidity: 87 },
    { time: "08:00", temp: 23, humidity: 86 },
    { time: "12:00", temp: 24, humidity: 85 },
    { time: "16:00", temp: 23, humidity: 88 },
    { time: "20:00", temp: 22, humidity: 86 },
  ];

  // Correlation matrix data
  const correlationMatrix = [
    { param: "Temp", Temp: 1.0, Humidity: -0.7, Moisture: -0.4, Light: 0.8, CO2: -0.3 },
    { param: "Humidity", Temp: -0.7, Humidity: 1.0, Moisture: 0.6, Light: -0.5, CO2: 0.2 },
    { param: "Moisture", Temp: -0.4, Humidity: 0.6, Moisture: 1.0, Light: -0.3, CO2: 0.1 },
    { param: "Light", Temp: 0.8, Humidity: -0.5, Moisture: -0.3, Light: 1.0, CO2: -0.2 },
    { param: "CO2", Temp: -0.3, Humidity: 0.2, Moisture: 0.1, Light: -0.2, CO2: 1.0 },
  ];

  const getCorrelationColor = (value: number) => {
    if (value >= 0.7) return "bg-red-600";
    if (value >= 0.4) return "bg-red-400";
    if (value >= 0.1) return "bg-orange-300";
    if (value >= -0.1) return "bg-gray-200";
    if (value >= -0.4) return "bg-blue-300";
    if (value >= -0.7) return "bg-blue-500";
    return "bg-blue-700";
  };

  const getCorrelationTextColor = (value: number) => {
    if (Math.abs(value) >= 0.4) return "text-white";
    return "text-gray-800";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ChatbaseWidget />
      {/* Top Navigation Bar */}
      <header className="bg-slate-800 text-white border-b border-slate-700 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">GreenMind Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-700 rounded-lg relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg relative group" title="Ask AI for Insights">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -bottom-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Ask AI for Insights
              </span>
            </button>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Dr. Fatima</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 overflow-auto">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                activeTab === "dashboard"
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("multi-zone")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                activeTab === "multi-zone"
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Layers className="h-5 w-5" />
              <span>Multi-Zone Compare</span>
            </button>

            <button
              onClick={() => setActiveTab("alerts")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                activeTab === "alerts"
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Stethoscope className="h-5 w-5" />
              <span>Alerts & Diagnostics</span>
              <Badge className="ml-auto bg-red-500 text-white text-xs">1</Badge>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                activeTab === "analytics"
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics Suite</span>
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                activeTab === "reports"
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Reports</span>
            </button>

            <button
              onClick={() => setActiveTab("clients")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                activeTab === "clients"
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Clients</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-200 mt-auto">
            <Button onClick={onBack} variant="outline" className="w-full text-sm">
              Exit Dashboard
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Top Panel - Comparative Analysis */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-800">Comparative Analysis: Zone A vs Zone B</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Zone A Chart */}
                <Card className="border-slate-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Zone A - Environmental Data</CardTitle>
                      <Badge className="bg-green-500 text-white text-xs">High Confidence</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={zoneAData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        <Line
                          type="monotone"
                          dataKey="temp"
                          stroke="#ef4444"
                          strokeWidth={2}
                          name="Temperature (°C)"
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="humidity"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Humidity (%)"
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                      <span className="text-slate-600">Risk Trend:</span>
                      <div className="flex items-center gap-1 text-green-600 font-semibold">
                        <TrendingDown className="h-4 w-4" />
                        Decreasing
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Zone B Chart */}
                <Card className="border-slate-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Zone B - Environmental Data</CardTitle>
                      <Badge className="bg-yellow-500 text-white text-xs">Medium Confidence</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={zoneBData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Line
                          type="monotone"
                          dataKey="temp"
                          stroke="#ef4444"
                          strokeWidth={2}
                          name="Temperature (°C)"
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="humidity"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Humidity (%)"
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                      <span className="text-slate-600">Risk Trend:</span>
                      <div className="flex items-center gap-1 text-red-600 font-semibold">
                        <TrendingUp className="h-4 w-4" />
                        Rising
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Panel - Correlation Matrix */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl">Correlation Matrix (Last 30 Days)</CardTitle>
                <CardDescription>
                  Shows relationships between environmental parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-slate-300 p-3 bg-slate-100 text-sm font-semibold text-slate-700">
                          Parameter
                        </th>
                        <th className="border border-slate-300 p-3 bg-slate-100 text-sm font-semibold text-slate-700">
                          Temp
                        </th>
                        <th className="border border-slate-300 p-3 bg-slate-100 text-sm font-semibold text-slate-700">
                          Humidity
                        </th>
                        <th className="border border-slate-300 p-3 bg-slate-100 text-sm font-semibold text-slate-700">
                          Moisture
                        </th>
                        <th className="border border-slate-300 p-3 bg-slate-100 text-sm font-semibold text-slate-700">
                          Light
                        </th>
                        <th className="border border-slate-300 p-3 bg-slate-100 text-sm font-semibold text-slate-700">
                          CO2
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {correlationMatrix.map((row) => (
                        <tr key={row.param}>
                          <td className="border border-slate-300 p-3 bg-slate-100 text-sm font-semibold text-slate-700">
                            {row.param}
                          </td>
                          {["Temp", "Humidity", "Moisture", "Light", "CO2"].map((col) => {
                            const value = row[col as keyof typeof row] as number;
                            return (
                              <td
                                key={col}
                                className={`border border-slate-300 p-3 text-center cursor-pointer hover:opacity-80 transition-opacity ${getCorrelationColor(
                                  value
                                )} ${getCorrelationTextColor(value)}`}
                                title={`Correlation: ${value.toFixed(2)}`}
                              >
                                <span className="text-sm font-semibold">{value.toFixed(2)}</span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Key Insight:</p>
                      <p className="text-sm text-blue-800">
                        Strong negative correlation (-0.7) between Temperature and Humidity indicates
                        that high temperatures significantly reduce humidity, increasing stress risk.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Right Panel - Expert Tools */}
        <aside className="w-96 bg-white border-l border-slate-200 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Diagnostic Panel */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Diagnostic Panel</h3>

              <Card className="border-2 border-red-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">Fungal Risk Detected - Zone C</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        High humidity + stable temp for 48h
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mini Preview Chart */}
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-slate-600 mb-2">48-Hour Humidity Trend</p>
                    <div className="h-20 flex items-end gap-1">
                      {[85, 86, 87, 88, 87, 86, 88, 89, 87, 86, 88, 87].map((value, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-blue-500 rounded-t"
                          style={{ height: `${(value / 100) * 100}%` }}
                          title={`${value}%`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* XAI Explanation */}
                  <button
                    onClick={() => setExpandedInsight(!expandedInsight)}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expandedInsight ? "rotate-180" : ""}`}
                    />
                    Why?
                  </button>

                  {expandedInsight && (
                    <div className="bg-red-50 p-3 rounded-lg text-sm text-slate-700 space-y-2">
                      <p className="font-semibold">Explanation (XAI):</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Humidity &gt;85% sustained for 48+ hours</li>
                        <li>Temperature stable at 22-24°C</li>
                        <li>These conditions are ideal for late blight development</li>
                        <li>Risk score: 8.5/10</li>
                      </ul>
                    </div>
                  )}

                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Recommend Pre-emptive Ventilation
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Expert Notes */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Add Expert Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Enter your observations or recommendations..."
                  value={expertNote}
                  onChange={(e) => setExpertNote(e.target.value)}
                  className="min-h-24 text-sm"
                />
                <Button variant="outline" className="w-full text-sm">
                  Save to Report
                </Button>
              </CardContent>
            </Card>

            {/* Export Tools */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Export Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm"
                  title="Generate printable report"
                >
                  <Download className="h-4 w-4" />
                  Export as PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm"
                  title="Download raw data"
                >
                  <FileDown className="h-4 w-4" />
                  Export as CSV
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm">
                  <Share2 className="h-4 w-4" />
                  Share with Client
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {/* Bottom Bar */}
      <footer className="bg-white border-t border-slate-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="text-slate-600">
              Last Updated: <span className="font-semibold text-slate-800">2 mins ago</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-slate-600">All sensors active</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Time Range:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-slate-300 rounded px-3 py-1 text-sm bg-white"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}
