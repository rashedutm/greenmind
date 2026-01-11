import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { Leaf, Sprout, Package, TrendingUp, ArrowDown } from "lucide-react";
import { HassanDashboard } from "./components/HassanDashboard";
import { AishaDashboard } from "./components/AishaDashboard";
import { FatimaDashboard } from "./components/FatimaDashboard";
import { LandingPage } from "./components/LandingPage";

type View = "landing" | "login" | "role-selection" | "farmer" | "manager" | "agronomist";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, validate credentials
    if (username && password) {
      setView("role-selection");
    }
  };

  const handleRoleSelect = (role: View) => {
    setView(role);
  };

  const handleBackToRoleSelection = () => {
    setView("role-selection");
  };

  const handleGetStarted = () => {
    setView("login");
  };

  const handleNavigateToLogin = () => {
    setView("login");
  };

  // Render landing page first
  if (view === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} onLogin={handleNavigateToLogin} />;
  }

  // Render different views based on state
  if (view === "farmer") {
    return <HassanDashboard onBack={handleBackToRoleSelection} />;
  }

  if (view === "manager") {
    return <AishaDashboard onBack={handleBackToRoleSelection} />;
  }

  if (view === "agronomist") {
    return <FatimaDashboard onBack={handleBackToRoleSelection} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        {/* Login Section */}
        {view === "login" && (
          <div className="flex flex-col items-center">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-600 p-4 rounded-full">
                  <Leaf className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">GreenMind</h1>
              <p className="text-xl text-gray-600">Potato Greenhouse Monitoring System</p>
            </div>

            {/* Login Form */}
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Role Selection Section */}
        {view === "role-selection" && (
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-600 p-4 rounded-full">
                  <Leaf className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">GreenMind</h1>
              <p className="text-xl text-gray-600 mb-8">Potato Greenhouse Monitoring System</p>
            </div>

            {/* Role Selection Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Select Your Role</h2>

            {/* Role Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Farmer Card */}
              <Card className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-4 rounded-full">
                      <Sprout className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <CardTitle>Farmer / Operator</CardTitle>
                  <CardDescription className="h-20">
                    Monitor zones, respond to alerts, manage daily operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <Button
                    onClick={() => handleRoleSelect("farmer")}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Continue as Farmer
                  </Button>
                  <div className="flex flex-col items-center text-gray-500">
                    <ArrowDown className="h-6 w-6 animate-bounce" />
                    <span className="text-sm mt-1">Farmer Dashboard</span>
                  </div>
                </CardContent>
              </Card>

              {/* Sales Manager Card */}
              <Card className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-4 rounded-full">
                      <Package className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <CardTitle>Sales / Logistics Manager</CardTitle>
                  <CardDescription className="h-20">
                    Track harvest readiness, plan shipments, monitor inventory
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <Button
                    onClick={() => handleRoleSelect("manager")}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Continue as Manager
                  </Button>
                  <div className="flex flex-col items-center text-gray-500">
                    <ArrowDown className="h-6 w-6 animate-bounce" />
                    <span className="text-sm mt-1">Manager Dashboard</span>
                  </div>
                </CardContent>
              </Card>

              {/* Agronomist Card */}
              <Card className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-4 rounded-full">
                      <TrendingUp className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <CardTitle>Agricultural Specialist</CardTitle>
                  <CardDescription className="h-20">
                    Analyze trends, diagnose health risks, generate reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <Button
                    onClick={() => handleRoleSelect("agronomist")}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Continue as Agronomist
                  </Button>
                  <div className="flex flex-col items-center text-gray-500">
                    <ArrowDown className="h-6 w-6 animate-bounce" />
                    <span className="text-sm mt-1">Agronomist Dashboard</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}