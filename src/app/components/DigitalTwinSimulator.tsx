import { useState, useEffect } from "react";
import { Slider } from "@radix-ui/react-slider";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import potatoPlantImage from "@/assets/050b555dda658eea8711975737c3ec67834e02fa.png";

interface SimulationParams {
  temperature: number;
  humidity: number;
  light: number;
  co2: number;
  waterLevel: number;
}

interface PlantGrowthData {
  day: number;
  height: number;
  health: number;
  yield: number;
}

export function DigitalTwinSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentDay, setCurrentDay] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [videoView, setVideoView] = useState<"simulation" | "live" | "comparison">("simulation");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [params, setParams] = useState<SimulationParams>({
    temperature: 22,
    humidity: 65,
    light: 75,
    co2: 400,
    waterLevel: 70,
  });

  const [growthData, setGrowthData] = useState<PlantGrowthData[]>([
    { day: 0, height: 5, health: 100, yield: 0 },
  ]);

  const [predictedYield, setPredictedYield] = useState(0);
  const [healthScore, setHealthScore] = useState(100);
  const [alerts, setAlerts] = useState<string[]>([]);

  // Optimal ranges for parameters
  const optimalRanges = {
    temperature: { min: 18, max: 24, optimal: 21 },
    humidity: { min: 60, max: 75, optimal: 68 },
    light: { min: 60, max: 90, optimal: 75 },
    co2: { min: 350, max: 450, optimal: 400 },
    waterLevel: { min: 60, max: 80, optimal: 70 },
  };

  // Calculate health score based on parameters
  const calculateHealthScore = (p: SimulationParams): number => {
    let score = 100;
    
    // Temperature impact
    if (p.temperature < optimalRanges.temperature.min || p.temperature > optimalRanges.temperature.max) {
      score -= Math.abs(p.temperature - optimalRanges.temperature.optimal) * 3;
    }
    
    // Humidity impact
    if (p.humidity < optimalRanges.humidity.min || p.humidity > optimalRanges.humidity.max) {
      score -= Math.abs(p.humidity - optimalRanges.humidity.optimal) * 2;
    }
    
    // Light impact
    if (p.light < optimalRanges.light.min) {
      score -= (optimalRanges.light.min - p.light) * 1.5;
    }
    
    // CO2 impact
    if (p.co2 < optimalRanges.co2.min || p.co2 > optimalRanges.co2.max) {
      score -= Math.abs(p.co2 - optimalRanges.co2.optimal) * 0.1;
    }
    
    // Water level impact
    if (p.waterLevel < optimalRanges.waterLevel.min) {
      score -= (optimalRanges.waterLevel.min - p.waterLevel) * 2;
    }
    
    return Math.max(0, Math.min(100, score));
  };

  // Calculate predicted yield based on health score
  const calculatePredictedYield = (health: number, day: number): number => {
    const maxYield = 25; // kg per plant at full maturity (90 days)
    const maturityFactor = Math.min(day / 90, 1);
    const healthFactor = health / 100;
    return maxYield * maturityFactor * healthFactor;
  };

  // Generate alerts based on parameters
  const generateAlerts = (p: SimulationParams): string[] => {
    const newAlerts: string[] = [];
    
    if (p.temperature > optimalRanges.temperature.max) {
      newAlerts.push("⚠️ Temperature too high - Risk of heat stress");
    } else if (p.temperature < optimalRanges.temperature.min) {
      newAlerts.push("⚠️ Temperature too low - Slowed growth");
    }
    
    if (p.humidity > optimalRanges.humidity.max) {
      newAlerts.push("⚠️ Humidity too high - Risk of fungal disease");
    } else if (p.humidity < optimalRanges.humidity.min) {
      newAlerts.push("⚠️ Humidity too low - Increased water stress");
    }
    
    if (p.light < optimalRanges.light.min) {
      newAlerts.push("⚠️ Insufficient light - Reduced photosynthesis");
    }
    
    if (p.waterLevel < optimalRanges.waterLevel.min) {
      newAlerts.push("🚨 Water level critical - Immediate action needed");
    }
    
    if (p.co2 < optimalRanges.co2.min) {
      newAlerts.push("⚠️ CO2 levels low - Growth may be limited");
    }
    
    return newAlerts;
  };

  // Update simulation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentDay((prev) => {
        const nextDay = prev + 1;
        if (nextDay > 90) {
          setIsRunning(false);
          return prev;
        }
        
        const health = calculateHealthScore(params);
        const yieldValue = calculatePredictedYield(health, nextDay);
        
        setGrowthData((data) => [
          ...data,
          {
            day: nextDay,
            height: 5 + (nextDay / 90) * 45 * (health / 100),
            health: health,
            yield: yieldValue,
          },
        ]);
        
        return nextDay;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, params]);

  // Update metrics when parameters change
  useEffect(() => {
    const health = calculateHealthScore(params);
    setHealthScore(health);
    setPredictedYield(calculatePredictedYield(health, currentDay));
    setAlerts(generateAlerts(params));
  }, [params, currentDay]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentDay(0);
    setGrowthData([{ day: 0, height: 5, health: 100, yield: 0 }]);
    setParams({
      temperature: 22,
      humidity: 65,
      light: 75,
      co2: 400,
      waterLevel: 70,
    });
  };

  const updateParam = (key: keyof SimulationParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const getHealthColor = (health: number): string => {
    if (health >= 80) return "#4ade80";
    if (health >= 60) return "#facc15";
    return "#f87171";
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30">
      <style>{`
        @keyframes leafGrow {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
      `}</style>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Digital Twin Simulator</h3>
            <p className="text-sm text-gray-400">Real-time greenhouse growth prediction</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
            <div className="text-xs text-gray-400">Day</div>
            <div className="text-2xl font-bold text-cyan-400">{currentDay}/90</div>
          </div>
          
          <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
            <div className="text-xs text-gray-400">Health Score</div>
            <div className="text-2xl font-bold" style={{ color: getHealthColor(healthScore) }}>
              {healthScore.toFixed(0)}%
            </div>
          </div>
          
          <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
            <div className="text-xs text-gray-400">Predicted Yield</div>
            <div className="text-2xl font-bold text-green-400">{predictedYield.toFixed(1)} kg</div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-2 text-yellow-200 text-sm"
            >
              {alert}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Column - Parameter Controls */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white mb-4">Environmental Parameters</h4>
          
          {/* Temperature */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-300">Temperature</label>
              <span className="text-lg font-bold text-cyan-400">{params.temperature}°C</span>
            </div>
            <Slider
              value={[params.temperature]}
              onValueChange={(value) => updateParam("temperature", value[0])}
              min={10}
              max={35}
              step={0.5}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <div className="bg-gray-700 relative grow rounded-full h-2">
                <div
                  className="absolute bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                  style={{ width: `${((params.temperature - 10) / 25) * 100}%` }}
                />
              </div>
              <div className="block w-5 h-5 bg-cyan-500 shadow-lg rounded-full hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            </Slider>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10°C</span>
              <span className="text-green-400">Optimal: {optimalRanges.temperature.optimal}°C</span>
              <span>35°C</span>
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-300">Humidity</label>
              <span className="text-lg font-bold text-cyan-400">{params.humidity}%</span>
            </div>
            <Slider
              value={[params.humidity]}
              onValueChange={(value) => updateParam("humidity", value[0])}
              min={30}
              max={95}
              step={1}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <div className="bg-gray-700 relative grow rounded-full h-2">
                <div
                  className="absolute bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                  style={{ width: `${((params.humidity - 30) / 65) * 100}%` }}
                />
              </div>
              <div className="block w-5 h-5 bg-cyan-500 shadow-lg rounded-full hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            </Slider>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>30%</span>
              <span className="text-green-400">Optimal: {optimalRanges.humidity.optimal}%</span>
              <span>95%</span>
            </div>
          </div>

          {/* Light Intensity */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-300">Light Intensity</label>
              <span className="text-lg font-bold text-cyan-400">{params.light}%</span>
            </div>
            <Slider
              value={[params.light]}
              onValueChange={(value) => updateParam("light", value[0])}
              min={0}
              max={100}
              step={5}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <div className="bg-gray-700 relative grow rounded-full h-2">
                <div
                  className="absolute bg-gradient-to-r from-yellow-500 to-orange-400 h-full rounded-full"
                  style={{ width: `${params.light}%` }}
                />
              </div>
              <div className="block w-5 h-5 bg-yellow-500 shadow-lg rounded-full hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </Slider>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span className="text-green-400">Optimal: {optimalRanges.light.optimal}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* CO2 Level */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-300">CO₂ Level</label>
              <span className="text-lg font-bold text-cyan-400">{params.co2} ppm</span>
            </div>
            <Slider
              value={[params.co2]}
              onValueChange={(value) => updateParam("co2", value[0])}
              min={300}
              max={600}
              step={10}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <div className="bg-gray-700 relative grow rounded-full h-2">
                <div
                  className="absolute bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full"
                  style={{ width: `${((params.co2 - 300) / 300) * 100}%` }}
                />
              </div>
              <div className="block w-5 h-5 bg-green-500 shadow-lg rounded-full hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </Slider>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>300 ppm</span>
              <span className="text-green-400">Optimal: {optimalRanges.co2.optimal} ppm</span>
              <span>600 ppm</span>
            </div>
          </div>

          {/* Water Level */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-300">Water Level</label>
              <span className="text-lg font-bold text-cyan-400">{params.waterLevel}%</span>
            </div>
            <Slider
              value={[params.waterLevel]}
              onValueChange={(value) => updateParam("waterLevel", value[0])}
              min={0}
              max={100}
              step={5}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <div className="bg-gray-700 relative grow rounded-full h-2">
                <div
                  className="absolute bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full"
                  style={{ width: `${params.waterLevel}%` }}
                />
              </div>
              <div className="block w-5 h-5 bg-blue-500 shadow-lg rounded-full hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </Slider>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span className="text-green-400">Optimal: {optimalRanges.waterLevel.optimal}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                isRunning
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isRunning ? "⏸ Pause" : "▶ Start Simulation"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-all"
            >
              🔄 Reset
            </button>
          </div>

          {/* Speed Control */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-300">Simulation Speed</label>
              <span className="text-lg font-bold text-cyan-400">{speed}x</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 5, 10].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all ${
                    speed === s
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Growth Visualization */}
        <div className="col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Growth Prediction & Analytics</h4>
            
            {/* Video Toggle */}
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all border border-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {showVideo ? "Hide" : "Show"} Video
            </button>
          </div>

          {/* Video Simulation Section */}
          {showVideo && (
            <div className="bg-gray-800/50 rounded-lg border border-cyan-500/30 overflow-hidden">
              {/* Video View Tabs */}
              <div className="flex items-center gap-2 p-3 bg-gray-900/50 border-b border-gray-700">
                <button
                  onClick={() => setVideoView("simulation")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    videoView === "simulation"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI Growth Simulation
                </button>
                <button
                  onClick={() => setVideoView("live")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    videoView === "live"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <div className="relative">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </div>
                  Live Camera Feed
                </button>
                <button
                  onClick={() => setVideoView("comparison")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    videoView === "comparison"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  Split Comparison
                </button>

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-gray-500">Day {currentDay}</span>
                </div>
              </div>

              {/* Video Content */}
              <div className="relative aspect-video bg-black">
                {videoView === "simulation" && (
                  <div className="relative w-full h-full">
                    {/* Potato Plant Growth Simulation Video */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
                      
                      {/* Potato Plant Image with Growth Animation */}
                      <div 
                        className="relative z-10"
                        style={{
                          transform: `scale(${0.3 + (currentDay / 90) * 0.7})`,
                          opacity: Math.min((currentDay / 20), 1),
                          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                        }}
                      >
                        <img 
                          src={potatoPlantImage}
                          alt="Potato Plant Growth"
                          className="w-auto h-[400px] object-contain"
                        />
                        
                        {/* Growth particles effect */}
                        {currentDay > 10 && (
                          <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
                                style={{
                                  left: `${20 + i * 15}%`,
                                  top: `${30 + Math.sin(i) * 20}%`,
                                  animationDelay: `${i * 0.3}s`,
                                  opacity: 0.6
                                }}
                              />
                            ))}
                          </div>
                        )}
                        
                        {/* Root growth indicator */}
                        {currentDay > 30 && (
                          <div 
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center"
                            style={{
                              opacity: Math.min((currentDay - 30) / 20, 1)
                            }}
                          >
                            <div className="text-yellow-400 text-xs font-semibold">
                              🥔 Tuber Development: {Math.min(((currentDay - 30) / 60) * 100, 100).toFixed(0)}%
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Simulation overlay text */}
                      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center z-20">
                        <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyan-500/30">
                          <h3 className="text-lg font-bold text-white mb-1">AI Growth Simulation</h3>
                          <p className="text-gray-300 text-xs">
                            90-day potato plant growth cycle
                          </p>
                          <div className="flex items-center justify-center gap-4 mt-3">
                            <div className="text-center">
                              <div className="text-xl font-bold" style={{ color: getHealthColor(healthScore) }}>
                                {(5 + (currentDay / 90) * 45 * (healthScore / 100)).toFixed(1)} cm
                              </div>
                              <div className="text-xs text-gray-400">Plant Height</div>
                            </div>
                            <div className="w-px h-8 bg-gray-600"></div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-400">
                                {predictedYield.toFixed(1)} kg
                              </div>
                              <div className="text-xs text-gray-400">Expected Yield</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Data Overlay */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg space-y-1 z-30">
                      <div className="text-xs text-gray-400">Environment Status</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${healthScore >= 80 ? 'bg-green-400' : healthScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                        <span className="text-sm text-white font-medium">
                          {healthScore >= 80 ? 'Optimal' : healthScore >= 60 ? 'Suboptimal' : 'Critical'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-300 mt-2 space-y-1">
                        <div>Temp: {params.temperature}°C</div>
                        <div>Humidity: {params.humidity}%</div>
                        <div>Light: {params.light}%</div>
                      </div>
                    </div>

                    {/* Timeline Scrubber */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                          className="w-8 h-8 rounded-full bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center transition-colors"
                        >
                          {isVideoPlaying ? (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all"
                              style={{ width: `${(currentDay / 90) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-400">
                            <span>Day 0</span>
                            <span>Day {currentDay}</span>
                            <span>Day 90</span>
                          </div>
                        </div>

                        <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {videoView === "live" && (
                  <div className="relative w-full h-full">
                    {/* Live Camera Feed Placeholder */}
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-4">
                          {/* Camera Icon with Pulse */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                              <div className="relative w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Live Camera Feed</h3>
                        <p className="text-gray-400 text-sm mb-4">Zone A - Greenhouse Camera 1</p>
                        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 px-4 py-2 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-400 text-sm font-medium">LIVE STREAM</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-4">
                          Connect your camera to view real-time greenhouse footage
                        </p>
                      </div>
                    </div>

                    {/* Live Stats Overlay */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-red-400 font-medium">RECORDING</span>
                      </div>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div>Quality: 1080p HD</div>
                        <div>FPS: 30</div>
                        <div>Storage: 2.4 GB</div>
                      </div>
                    </div>
                  </div>
                )}

                {videoView === "comparison" && (
                  <div className="relative w-full h-full grid grid-cols-2 gap-px bg-gray-700">
                    {/* Left: Current Conditions */}
                    <div className="relative bg-gray-900 flex flex-col">
                      <div className="absolute top-2 left-2 right-2 bg-yellow-600/90 backdrop-blur-sm px-3 py-2 rounded-lg z-10">
                        <div className="text-xs font-bold text-white">CURRENT CONDITIONS</div>
                        <div className="text-xs text-yellow-100">Health: {healthScore.toFixed(0)}%</div>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                            <ellipse cx="60" cy="110" rx="40" ry="8" fill="#8b6f47" opacity="0.8" />
                            <line x1="60" y1="110" x2="60" y2={110 - (healthScore / 100) * 70} stroke={getHealthColor(healthScore)} strokeWidth="4" />
                            {Array.from({ length: 4 }).map((_, i) => (
                              <ellipse key={i} cx={60 + (i % 2 === 0 ? 12 : -12)} cy={110 - (i * 12) - 8} rx="10" ry="5" fill={getHealthColor(healthScore)} opacity="0.7" />
                            ))}
                          </svg>
                          <div className="mt-2 text-sm text-gray-300">
                            Yield: {predictedYield.toFixed(1)} kg
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-black/50 text-xs text-gray-300 space-y-1">
                        <div className="flex justify-between">
                          <span>Temp:</span>
                          <span className="font-semibold">{params.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Humidity:</span>
                          <span className="font-semibold">{params.humidity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Light:</span>
                          <span className="font-semibold">{params.light}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Optimal Conditions */}
                    <div className="relative bg-gray-900 flex flex-col">
                      <div className="absolute top-2 left-2 right-2 bg-green-600/90 backdrop-blur-sm px-3 py-2 rounded-lg z-10">
                        <div className="text-xs font-bold text-white">OPTIMAL CONDITIONS</div>
                        <div className="text-xs text-green-100">Health: 100%</div>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                            <ellipse cx="60" cy="110" rx="40" ry="8" fill="#8b6f47" opacity="0.8" />
                            <line x1="60" y1="110" x2="60" y2="40" stroke="#4ade80" strokeWidth="4" />
                            {Array.from({ length: 6 }).map((_, i) => (
                              <ellipse key={i} cx={60 + (i % 2 === 0 ? 12 : -12)} cy={110 - (i * 12) - 8} rx="10" ry="5" fill="#4ade80" opacity="0.8" />
                            ))}
                            <circle cx="60" cy="30" r="6" fill="#fbbf24" />
                          </svg>
                          <div className="mt-2 text-sm text-green-300">
                            Yield: 25.0 kg
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-black/50 text-xs text-gray-300 space-y-1">
                        <div className="flex justify-between">
                          <span>Temp:</span>
                          <span className="font-semibold text-green-400">21°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Humidity:</span>
                          <span className="font-semibold text-green-400">68%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Light:</span>
                          <span className="font-semibold text-green-400">75%</span>
                        </div>
                      </div>
                    </div>

                    {/* Comparison Stats */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
                      <div className="text-center">
                        <div className="text-xs text-gray-400 mb-1">Potential Improvement</div>
                        <div className="text-lg font-bold text-cyan-400">
                          +{(25 - predictedYield).toFixed(1)} kg
                        </div>
                        <div className="text-xs text-gray-500">
                          (+${((25 - predictedYield) * 30 * 2.5).toFixed(0)} revenue)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Controls Help */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Switch between views to see different perspectives
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Plant Growth Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <h5 className="text-sm font-medium text-gray-300 mb-3">Plant Height Over Time</h5>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  label={{ value: "Days", position: "insideBottom", offset: -5, fill: "#9ca3af" }}
                />
                <YAxis
                  stroke="#9ca3af"
                  label={{ value: "Height (cm)", angle: -90, position: "insideLeft", fill: "#9ca3af" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="height"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={false}
                  name="Height (cm)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Health Score Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <h5 className="text-sm font-medium text-gray-300 mb-3">Plant Health Score</h5>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  label={{ value: "Days", position: "insideBottom", offset: -5, fill: "#9ca3af" }}
                />
                <YAxis
                  stroke="#9ca3af"
                  domain={[0, 100]}
                  label={{ value: "Health (%)", angle: -90, position: "insideLeft", fill: "#9ca3af" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="health"
                  stroke="#4ade80"
                  strokeWidth={2}
                  fill="url(#healthGradient)"
                  name="Health %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Yield Projection Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <h5 className="text-sm font-medium text-gray-300 mb-3">Yield Projection</h5>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  label={{ value: "Days", position: "insideBottom", offset: -5, fill: "#9ca3af" }}
                />
                <YAxis
                  stroke="#9ca3af"
                  label={{ value: "Yield (kg)", angle: -90, position: "insideLeft", fill: "#9ca3af" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="yield"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  fill="url(#yieldGradient)"
                  name="Yield (kg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Optimal Conditions</div>
                  <div className="text-xl font-bold text-green-400">
                    {Object.entries(params).filter(([key, value]) => {
                      const range = optimalRanges[key as keyof SimulationParams];
                      return value >= range.min && value <= range.max;
                    }).length}/5
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400">Parameters within optimal range</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Growth Rate</div>
                  <div className="text-xl font-bold text-blue-400">
                    {growthData.length > 1
                      ? ((growthData[growthData.length - 1].height - growthData[0].height) / currentDay).toFixed(2)
                      : "0.00"} cm/day
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400">Average daily growth</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Est. Revenue</div>
                  <div className="text-xl font-bold text-yellow-400">
                    ${(predictedYield * 30 * 2.5).toFixed(0)}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400">Based on 30 plants @ $2.5/kg</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Time to Harvest</div>
                  <div className="text-xl font-bold text-purple-400">
                    {90 - currentDay} days
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400">Estimated days remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
