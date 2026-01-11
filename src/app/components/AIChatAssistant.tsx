import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  zones?: Array<{ id: string; name: string; status: string; temp: number; humidity: number; moisture?: number }>;
}

export function AIChatAssistant({ isOpen, onClose, zones = [] }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your GreenMind AI Assistant. I can help you with greenhouse monitoring, zone analysis, and agricultural recommendations. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Zone-specific queries
    if (lowerMessage.includes("zone") || lowerMessage.includes("greenhouse")) {
      const warningZones = zones.filter(z => z.status === "warning" || z.status === "alert");
      
      if (lowerMessage.includes("status") || lowerMessage.includes("how are") || lowerMessage.includes("condition")) {
        if (warningZones.length > 0) {
          const zoneDetails = warningZones.map(z => 
            `${z.name}: Temperature at ${z.temp}°C (${z.temp > 30 ? 'HIGH' : 'normal'}), Humidity ${z.humidity}%`
          ).join("\n");
          return `I'm monitoring ${zones.length} zones. Currently, ${warningZones.length} zone(s) need attention:\n\n${zoneDetails}\n\nRecommendation: Increase ventilation in high-temperature zones to prevent heat stress.`;
        } else {
          return `All ${zones.length} zones are operating within optimal parameters! Temperature ranges from ${Math.min(...zones.map(z => z.temp))}°C to ${Math.max(...zones.map(z => z.temp))}°C. Excellent work!`;
        }
      }

      if (lowerMessage.includes("temperature") || lowerMessage.includes("temp")) {
        const avgTemp = zones.reduce((sum, z) => sum + z.temp, 0) / zones.length;
        const hotZones = zones.filter(z => z.temp > 30);
        return `Current temperature analysis:\n\n• Average: ${avgTemp.toFixed(1)}°C\n• Range: ${Math.min(...zones.map(z => z.temp))}°C - ${Math.max(...zones.map(z => z.temp))}°C\n${hotZones.length > 0 ? `• ⚠️ ${hotZones.length} zone(s) above 30°C: ${hotZones.map(z => z.name).join(", ")}\n\nRecommendation: Open vents and increase air circulation in hot zones.` : '\n✓ All zones within optimal range (18-28°C for potato growth).'}`;
      }

      if (lowerMessage.includes("humidity")) {
        const avgHumidity = zones.reduce((sum, z) => sum + z.humidity, 0) / zones.length;
        return `Humidity levels across zones:\n\n• Average: ${avgHumidity.toFixed(1)}%\n• Range: ${Math.min(...zones.map(z => z.humidity))}% - ${Math.max(...zones.map(z => z.humidity))}%\n\nOptimal humidity for potatoes is 60-70%. ${avgHumidity >= 60 && avgHumidity <= 70 ? '✓ Current levels are ideal!' : avgHumidity < 60 ? '⚠️ Consider increasing irrigation or misting.' : '⚠️ Reduce watering and improve ventilation.'}`;
      }
    }

    // General potato growing questions
    if (lowerMessage.includes("potato") && (lowerMessage.includes("disease") || lowerMessage.includes("problem"))) {
      return `Common potato diseases to watch for:\n\n1. **Late Blight** - Brown spots on leaves, thrives in humid conditions\n2. **Early Blight** - Target-like spots, stress-related\n3. **Scab** - Rough patches on tubers, alkaline soil issue\n\n🛡️ Prevention:\n• Maintain proper air circulation\n• Avoid overhead watering\n• Monitor humidity (keep below 75%)\n• Regular leaf inspections\n\nWould you like specific treatment recommendations?`;
    }

    if (lowerMessage.includes("water") || lowerMessage.includes("irrigation")) {
      return `💧 Watering Guidelines for Potatoes:\n\n• **Frequency**: Every 2-3 days (adjust for weather)\n• **Amount**: 1-2 inches per week\n• **Timing**: Early morning is best\n• **Critical periods**: Tuber formation & bulking\n\n⚠️ Signs of overwatering: Yellowing leaves, soft tubers\n⚠️ Signs of underwatering: Wilting, small tubers\n\nCurrent soil moisture across zones: ${zones.map(z => `${z.name}: ${z.moisture || 70}%`).join(", ")}`;
    }

    if (lowerMessage.includes("harvest") || lowerMessage.includes("ready")) {
      return `🥔 Harvest Readiness Indicators:\n\n✓ **Timing**: 90-120 days after planting\n✓ **Visual signs**: Yellowing/dying foliage\n✓ **Skin test**: Rub potato - skin should not peel off easily\n✓ **Size**: Tubers reached desired market size\n\n📊 Recommended actions:\n1. Stop watering 2 weeks before harvest\n2. Allow plants to die back naturally\n3. Harvest on dry day\n4. Cure potatoes in dark, 60-65°F for 10-14 days\n\nWould you like zone-specific harvest recommendations?`;
    }

    if (lowerMessage.includes("fertilizer") || lowerMessage.includes("nutrients")) {
      return `🌱 Potato Fertilization Guide:\n\n**NPK Requirements**:\n• Nitrogen (N): Moderate - too much delays maturity\n• Phosphorus (P): High - promotes tuber formation\n• Potassium (K): High - improves quality & disease resistance\n\n**Application Schedule**:\n1. Pre-plant: 10-20-20 fertilizer\n2. At emergence: Side-dress with nitrogen\n3. Tuber initiation: High-potassium formula\n\n⚠️ Avoid over-fertilizing - leads to excessive foliage, fewer tubers.`;
    }

    if (lowerMessage.includes("temperature") && (lowerMessage.includes("ideal") || lowerMessage.includes("optimal"))) {
      return `🌡️ Optimal Temperature Ranges for Potatoes:\n\n• **Daytime**: 18-24°C (64-75°F)\n• **Nighttime**: 15-18°C (59-64°F)\n• **Soil**: 15-20°C for best tuber formation\n\n⚠️ Critical thresholds:\n• Above 29°C: Tuber formation slows/stops\n• Below 7°C: Growth severely inhibited\n• Above 35°C: Heat stress, potential crop damage\n\nYour greenhouse control systems should maintain these ranges automatically.`;
    }

    if (lowerMessage.includes("ventilation") || lowerMessage.includes("vent") || lowerMessage.includes("airflow")) {
      return `💨 Ventilation Best Practices:\n\n**Why it's critical**:\n• Regulates temperature\n• Controls humidity\n• Prevents disease\n• Strengthens plant stems\n\n**Recommendations**:\n• Open vents when temp >25°C\n• Ensure cross-ventilation\n• Use fans during low wind periods\n• Night venting reduces humidity\n\n✓ Quick action available: Use "Open All Vents" button for immediate cooling.`;
    }

    if (lowerMessage.includes("alert") || lowerMessage.includes("warning") || lowerMessage.includes("problem")) {
      const warningZones = zones.filter(z => z.status === "warning" || z.status === "alert");
      if (warningZones.length > 0) {
        return `🚨 Current Alerts:\n\n${warningZones.map((z, i) => 
          `${i + 1}. **${z.name}**: ${z.temp > 30 ? `High temperature (${z.temp}°C) - Risk of heat stress` : `Status: ${z.status}`}\n   → Recommended action: ${z.temp > 30 ? 'Open vents, increase air circulation' : 'Monitor closely'}`
        ).join('\n\n')}\n\nI can help you resolve these issues. What would you like to do?`;
      } else {
        return `✅ No active alerts! All zones are operating normally. The system is monitoring continuously and will notify you immediately if any parameters go out of range.`;
      }
    }

    if (lowerMessage.includes("digital twin") || lowerMessage.includes("simulator") || lowerMessage.includes("predict")) {
      return `🤖 Digital Twin Simulator Features:\n\n• **AI Growth Prediction**: Forecast plant development based on environmental parameters\n• **Scenario Testing**: Adjust conditions virtually before implementing\n• **Comparison Mode**: See predicted vs. actual outcomes\n• **Time-lapse Analysis**: View growth progression\n\nAccess it via the "Digital Twin" tab in the left sidebar. It's perfect for planning seasonal changes or testing new growing strategies!`;
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("what can you")) {
      return `I can help you with:\n\n🌡️ **Monitoring**:\n• Zone status & conditions\n• Temperature & humidity analysis\n• Alert management\n\n🥔 **Agriculture**:\n• Growing best practices\n• Disease identification\n• Harvest timing\n• Fertilization guidance\n\n🔧 **Operations**:\n• Ventilation control\n• Irrigation scheduling\n• Climate optimization\n\n💡 Try asking:\n• "What's the status of all zones?"\n• "How should I water my potatoes?"\n• "What temperature is best for potatoes?"\n• "Are there any alerts?"`;
    }

    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return `You're welcome! I'm here 24/7 to help optimize your greenhouse operations. Feel free to ask anything about your potato cultivation! 🌱`;
    }

    // Default response
    return `I understand you're asking about "${userMessage}". I can provide detailed information about:\n\n• Zone monitoring & status\n• Temperature & humidity control\n• Potato growing best practices\n• Disease prevention & treatment\n• Harvest timing & preparation\n• Irrigation & fertilization\n\nCould you please be more specific about what you'd like to know?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(inputValue),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What's the status of all zones?",
    "How should I manage temperature?",
    "When should I harvest?",
    "Any active alerts?",
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div className="relative w-full max-w-md h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-cyan-500/30">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-green-500/20 animate-pulse" />
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-cyan-600 to-green-600 px-6 py-4 flex items-center justify-between border-b border-cyan-400/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Assistant</h3>
              <p className="text-xs text-cyan-100">Powered by GreenMind AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="relative h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                    : "bg-gray-700/50 text-gray-100 border border-cyan-500/20"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs">
                    <Sparkles className="h-3 w-3" />
                    <span>AI Assistant</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700/50 border border-cyan-500/20 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
                <span className="text-gray-300 text-sm">AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="relative px-4 py-2 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs px-3 py-1.5 bg-gray-700/50 hover:bg-cyan-600/30 text-gray-300 hover:text-white rounded-full border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="relative p-4 bg-gray-800/50 border-t border-cyan-500/20">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your greenhouse..."
              className="flex-1 bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 rounded-xl border border-cyan-500/20 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700 text-white px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • AI responses are simulated
          </p>
        </div>
      </div>
    </div>
  );
}
