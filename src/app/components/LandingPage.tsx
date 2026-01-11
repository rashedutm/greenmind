import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Leaf, Thermometer, Bell, TrendingUp, Droplets, Wind, Sprout } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChatbaseWidget } from "./ChatbaseWidget";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <ChatbaseWidget />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">GreenMind</span>
          </div>
          <Button onClick={onLogin} className="bg-green-600 hover:bg-green-700">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-green-500">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - 60% */}
            <div className="lg:col-span-3 text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold leading-tight">GreenMind</h1>
                <h2 className="text-4xl font-semibold text-green-50">
                  Smart Potato Greenhouse Monitoring
                </h2>
                <p className="text-xl text-green-50 max-w-xl">
                  Real-time monitoring. Data-driven decisions. Healthier crops.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 text-lg"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Illustration - 40% */}
            <div className="lg:col-span-2 relative">
              <div className="relative h-96 flex items-center justify-center">
                {/* Central Greenhouse Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1755444806599-c98953c295dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwcG90YXRvJTIwcGxhbnRzfGVufDF8fHx8MTc2NjY1NDIyNnww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Greenhouse plants"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute top-0 left-0 bg-yellow-400 p-3 rounded-full shadow-lg animate-bounce">
                  <Thermometer className="h-6 w-6 text-yellow-900" />
                </div>
                <div className="absolute top-12 right-0 bg-blue-400 p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <Droplets className="h-6 w-6 text-blue-900" />
                </div>
                <div className="absolute bottom-12 left-8 bg-orange-400 p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.4s' }}>
                  <Wind className="h-6 w-6 text-orange-900" />
                </div>
                <div className="absolute bottom-0 right-12 bg-purple-400 p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.6s' }}>
                  <TrendingUp className="h-6 w-6 text-purple-900" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-32 bg-green-300 p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.8s' }}>
                  <Sprout className="h-6 w-6 text-green-900" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Monitor Your Greenhouse
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools for modern potato farming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-2 hover:border-green-500 hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-full">
                    <Thermometer className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Real-Time Monitoring</CardTitle>
                <CardDescription className="text-base pt-2">
                  Track temperature, humidity, and soil conditions 24/7 across all your greenhouse zones
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Thermometer className="h-4 w-4" /> Temp
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4" /> Humidity
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4" /> Soil
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 hover:border-green-500 hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-full">
                    <Bell className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Smart Alerts</CardTitle>
                <CardDescription className="text-base pt-2">
                  Get instant notifications when conditions go out of range and take immediate action
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-1 text-sm text-gray-600">
                  <p>✓ Instant notifications</p>
                  <p>✓ Custom thresholds</p>
                  <p>✓ Multi-channel alerts</p>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 hover:border-green-500 hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Data Analytics</CardTitle>
                <CardDescription className="text-base pt-2">
                  Analyze trends and optimize your greenhouse operations with powerful insights
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📈 Trend analysis</p>
                  <p>📊 Growth tracking</p>
                  <p>📋 Custom reports</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">GreenMind</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 GreenMind. All rights reserved. Smart Potato Greenhouse Monitoring System.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
