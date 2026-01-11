import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlantVideoMonitorProps {
  type?: 'healthy' | 'diseased' | 'roots';
  className?: string;
}

export function PlantVideoMonitor({ type = 'healthy', className = '' }: PlantVideoMonitorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const videoConfigs = {
    healthy: {
      imageUrl: 'https://images.unsplash.com/photo-1622484966097-6f2cd8c96f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwcGxhbnQlMjBsZWFmJTIwY2xvc2V1cCUyMG1hY3JvfGVufDF8fHx8MTc2ODE0MTA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Healthy Leaf Monitor',
      status: 'Normal',
      statusColor: 'green',
      description: 'Macro view of healthy plant tissue'
    },
    diseased: {
      imageUrl: 'https://images.unsplash.com/photo-1728297753604-d2e129bdb226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNlYXNlZCUyMHBsYW50JTIwbGVhZiUyMGRpc2Vhc2V8ZW58MXx8fHwxNzY4MTQxMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Disease Alert Monitor',
      status: 'Warning',
      statusColor: 'red',
      description: 'Early detection of plant disease'
    },
    roots: {
      imageUrl: 'https://images.unsplash.com/photo-1635739056558-6d8b9249ca93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBwbGFudCUyMHJvb3RzJTIwY2xvc2V1cHxlbnwxfHx8fDE3NjgxNDEwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Root System Monitor',
      status: 'Normal',
      statusColor: 'cyan',
      description: 'Underground root development'
    }
  };

  const config = videoConfigs[type];

  return (
    <div className={`bg-gray-900/50 backdrop-blur-md rounded-xl border border-${config.statusColor}-500/30 overflow-hidden ${className}`}>
      {/* Header */}
      <div className={`bg-gray-800/70 px-4 py-3 border-b border-${config.statusColor}-500/30 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-${config.statusColor}-600/20 flex items-center justify-center`}>
            <svg className={`w-6 h-6 text-${config.statusColor}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{config.title}</h4>
            <p className="text-xs text-gray-400">{config.description}</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg bg-${config.statusColor}-600/20 border border-${config.statusColor}-500/30`}>
          <div className={`w-2 h-2 rounded-full bg-${config.statusColor}-500 ${type === 'diseased' ? 'animate-pulse' : ''}`}></div>
          <span className={`text-xs font-medium text-${config.statusColor}-400`}>{config.status}</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative aspect-video bg-black group">
        {/* Background Image with Zoom Effect */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: `scale(${zoomLevel})`,
            transition: 'transform 2s ease-in-out'
          }}
        >
          <ImageWithFallback 
            src={config.imageUrl}
            alt={config.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Scan Lines */}
        {isPlaying && (
          <>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-down opacity-70"></div>
            <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-scan-right opacity-70"></div>
          </>
        )}

        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>

        {/* Center Focus Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={`w-32 h-32 rounded-full border-2 border-${config.statusColor}-400/50 ${isPlaying ? 'animate-ping' : ''}`}></div>
        </div>

        {/* Overlay Info */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Zoom Level</div>
          <div className={`text-lg font-bold text-${config.statusColor}-400`}>{zoomLevel.toFixed(1)}x</div>
        </div>

        {/* Control Overlay (appears on hover) */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying) {
                // Start zoom animation
                const interval = setInterval(() => {
                  setZoomLevel(prev => {
                    if (prev >= 3) {
                      clearInterval(interval);
                      setTimeout(() => setZoomLevel(1), 500);
                      return prev;
                    }
                    return prev + 0.05;
                  });
                }, 50);
              } else {
                setZoomLevel(1);
              }
            }}
            className={`p-4 rounded-full bg-${config.statusColor}-600 hover:bg-${config.statusColor}-500 transition-colors`}
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Live Status Indicator */}
        {isPlaying && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-white">LIVE</span>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="px-4 py-3 bg-gray-800/50 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-400">
            <span className="text-gray-500">Resolution:</span> 4K Ultra HD
          </div>
          <div className="text-gray-400">
            <span className="text-gray-500">FPS:</span> 60
          </div>
          <div className="text-gray-400">
            <span className="text-gray-500">Mode:</span> Macro
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-down {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes scan-right {
          0% { left: 0; }
          100% { left: 100%; }
        }
        .animate-scan-down {
          animation: scan-down 2s linear infinite;
        }
        .animate-scan-right {
          animation: scan-right 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
