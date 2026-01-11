import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, Activity, AlertTriangle, FileText, ArrowLeft } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AgronomistDashboardProps {
  onBack: () => void;
}

export function AgronomistDashboard({ onBack }: AgronomistDashboardProps) {
  const temperatureData = [
    { date: "Dec 18", zoneA: 22, zoneB: 23, zoneC: 21, zoneD: 24 },
    { date: "Dec 19", zoneA: 23, zoneB: 25, zoneC: 22, zoneD: 26 },
    { date: "Dec 20", zoneA: 21, zoneB: 24, zoneC: 21, zoneD: 27 },
    { date: "Dec 21", zoneA: 22, zoneB: 26, zoneC: 22, zoneD: 29 },
    { date: "Dec 22", zoneA: 23, zoneB: 27, zoneC: 21, zoneD: 30 },
    { date: "Dec 23", zoneA: 22, zoneB: 28, zoneC: 22, zoneD: 31 },
    { date: "Dec 24", zoneA: 22, zoneB: 28, zoneC: 21, zoneD: 32 },
  ];

  const growthRateData = [
    { zone: "Zone A", rate: 95 },
    { zone: "Zone B", rate: 72 },
    { zone: "Zone C", rate: 98 },
    { zone: "Zone D", rate: 58 },
  ];

  const healthRisks = [
    {
      id: 1,
      zone: "Zone D",
      risk: "Heat Stress",
      severity: "high",
      probability: "85%",
      recommendation: "Increase ventilation and reduce temperature immediately",
    },
    {
      id: 2,
      zone: "Zone B",
      risk: "Drought Stress",
      severity: "medium",
      probability: "60%",
      recommendation: "Increase irrigation frequency and monitor soil moisture",
    },
    {
      id: 3,
      zone: "Zone A",
      risk: "Nutrient Deficiency",
      severity: "low",
      probability: "25%",
      recommendation: "Consider foliar feed application in next maintenance cycle",
    },
  ];

  const reports = [
    { id: 1, title: "Weekly Environmental Analysis", date: "Dec 22, 2025", type: "Environmental" },
    { id: 2, title: "Growth Rate Comparison Report", date: "Dec 20, 2025", type: "Growth" },
    { id: 3, title: "Pest & Disease Risk Assessment", date: "Dec 18, 2025", type: "Health" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Role Selection
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agronomist Dashboard</h1>
              <p className="text-gray-600">Analyze trends and diagnose health risks</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <span className="font-semibold text-xl text-gray-900">GreenMind</span>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Temperature Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Temperature Trends (7 Days)</CardTitle>
              <CardDescription>Temperature patterns across all zones</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="zoneA" stroke="#22c55e" name="Zone A" />
                  <Line type="monotone" dataKey="zoneB" stroke="#eab308" name="Zone B" />
                  <Line type="monotone" dataKey="zoneC" stroke="#3b82f6" name="Zone C" />
                  <Line type="monotone" dataKey="zoneD" stroke="#ef4444" name="Zone D" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Growth Rate Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Rate Performance</CardTitle>
              <CardDescription>Relative growth efficiency by zone</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={growthRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#22c55e" name="Growth Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Health Risks */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Health Risk Analysis</CardTitle>
            <CardDescription>Predictive diagnostics and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthRisks.map((risk) => (
                <div key={risk.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`h-5 w-5 mt-1 ${risk.severity === 'high' ? 'text-red-600' : risk.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
                      <div>
                        <h3 className="font-semibold">{risk.risk}</h3>
                        <p className="text-sm text-gray-600">{risk.zone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={risk.severity === 'high' ? 'destructive' : risk.severity === 'medium' ? 'secondary' : 'outline'}>
                        {risk.severity} risk
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{risk.probability}</p>
                    </div>
                  </div>
                  <div className="pl-8">
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-semibold">Recommendation:</span> {risk.recommendation}
                    </p>
                    <Button size="sm" variant="outline">View Detailed Analysis</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>Access analytical reports and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-semibold">{report.title}</p>
                      <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <Button className="w-full" variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  Generate New Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
