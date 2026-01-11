import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Package, Truck, Calendar, ArrowLeft } from "lucide-react";

interface ManagerDashboardProps {
  onBack: () => void;
}

export function ManagerDashboard({ onBack }: ManagerDashboardProps) {
  const harvestReadiness = [
    {
      id: 1,
      zone: "Zone A",
      variety: "Russet Burbank",
      readiness: 85,
      estimatedYield: "2,400 kg",
      harvestDate: "Dec 28, 2025",
      status: "ready-soon",
    },
    {
      id: 2,
      zone: "Zone C",
      variety: "Yukon Gold",
      readiness: 95,
      estimatedYield: "2,100 kg",
      harvestDate: "Dec 26, 2025",
      status: "ready",
    },
    {
      id: 3,
      zone: "Zone B",
      variety: "Red Pontiac",
      readiness: 60,
      estimatedYield: "1,800 kg",
      harvestDate: "Jan 5, 2026",
      status: "growing",
    },
  ];

  const shipments = [
    {
      id: 1,
      destination: "Regional Market A",
      quantity: "1,500 kg",
      status: "scheduled",
      date: "Dec 27, 2025",
    },
    {
      id: 2,
      destination: "Distributor B",
      quantity: "2,000 kg",
      status: "in-transit",
      date: "Dec 25, 2025",
    },
    {
      id: 3,
      destination: "Export Hub C",
      quantity: "3,200 kg",
      status: "pending",
      date: "Dec 30, 2025",
    },
  ];

  const inventory = {
    totalStock: "12,400 kg",
    reserved: "4,700 kg",
    available: "7,700 kg",
    qualityA: "8,200 kg",
    qualityB: "3,100 kg",
    qualityC: "1,100 kg",
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Sales & Logistics Dashboard</h1>
              <p className="text-gray-600">Track harvest readiness and manage shipments</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-green-600" />
            <span className="font-semibold text-xl text-gray-900">GreenMind</span>
          </div>
        </div>

        {/* Inventory Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{inventory.totalStock}</p>
              <p className="text-sm text-gray-600 mt-2">Available: {inventory.available}</p>
              <p className="text-sm text-gray-600">Reserved: {inventory.reserved}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Grade A:</span>
                <span className="font-semibold">{inventory.qualityA}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Grade B:</span>
                <span className="font-semibold">{inventory.qualityB}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Grade C:</span>
                <span className="font-semibold">{inventory.qualityC}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{shipments.length}</p>
              <p className="text-sm text-gray-600 mt-2">
                {shipments.filter(s => s.status === 'in-transit').length} in transit
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Harvest Readiness */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Harvest Readiness</CardTitle>
            <CardDescription>Monitor crop maturity and plan harvesting schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {harvestReadiness.map((crop) => (
                <div key={crop.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{crop.zone} - {crop.variety}</h3>
                      <p className="text-sm text-gray-600">Est. Yield: {crop.estimatedYield}</p>
                    </div>
                    <Badge variant={crop.status === 'ready' ? 'default' : crop.status === 'ready-soon' ? 'secondary' : 'outline'}>
                      {crop.readiness}% Ready
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      Harvest Date: {crop.harvestDate}
                    </span>
                    <Button size="sm" variant={crop.status === 'ready' ? 'default' : 'outline'}>
                      {crop.status === 'ready' ? 'Schedule Harvest' : 'View Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipment Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Shipment Tracking</CardTitle>
            <CardDescription>Monitor delivery status and logistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Truck className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-semibold">{shipment.destination}</p>
                      <p className="text-sm text-gray-600">{shipment.quantity} • {shipment.date}</p>
                    </div>
                  </div>
                  <Badge variant={shipment.status === 'in-transit' ? 'default' : shipment.status === 'scheduled' ? 'secondary' : 'outline'}>
                    {shipment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
