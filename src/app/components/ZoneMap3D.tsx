import { useState } from "react";

interface Zone {
  id: string;
  name: string;
  position: { x: number; z: number };
  status: "good" | "warning" | "alert";
  temp: number;
  humidity: number;
}

interface ZoneMap3DProps {
  onZoneClick: (zoneName: string) => void;
}

function Greenhouse({ zone, onClick }: { zone: Zone; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  const getStatusColor = () => {
    if (hovered) return "#60a5fa";
    switch (zone.status) {
      case "good":
        return "#4ade80";
      case "warning":
        return "#facc15";
      case "alert":
        return "#f87171";
      default:
        return "#9ca3af";
    }
  };

  const color = getStatusColor();

  return (
    <div
      style={{
        position: "absolute",
        left: `${zone.position.x + 200}px`,
        top: `${zone.position.z + 200}px`,
        width: "60px",
        height: "60px",
        transformStyle: "preserve-3d",
        cursor: "pointer",
        transition: "transform 0.2s",
        transform: hovered ? "translateZ(10px) scale(1.1)" : "translateZ(0px) scale(1)",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Greenhouse Base */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: color,
          opacity: 0.7,
          border: `2px solid ${color}`,
          borderRadius: "4px",
          transform: "translateZ(0px)",
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
        }}
      />

      {/* Front Wall */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "40px",
          backgroundColor: color,
          opacity: 0.6,
          border: `1px solid ${color}`,
          transform: "rotateX(90deg) translateZ(30px)",
          transformOrigin: "bottom",
        }}
      />

      {/* Roof */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "40px",
          backgroundColor: color,
          opacity: 0.8,
          border: `1px solid ${color}`,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          transform: "rotateX(90deg) translateZ(60px)",
          transformOrigin: "bottom",
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {zone.name}
      </div>

      {/* Status Indicator */}
      {(zone.status === "warning" || zone.status === "alert") && (
        <div
          style={{
            position: "absolute",
            top: "-45px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "8px",
            height: "8px",
            backgroundColor: zone.status === "warning" ? "#facc15" : "#ef4444",
            borderRadius: "50%",
            boxShadow: `0 0 10px ${zone.status === "warning" ? "#facc15" : "#ef4444"}`,
            animation: "pulse 2s infinite",
          }}
        />
      )}

      {/* Info Tooltip */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          <div>Temp: {zone.temp}°C</div>
          <div>Humidity: {zone.humidity}%</div>
          <div className="text-xs text-gray-400 mt-1">Click to view interior</div>
        </div>
      )}
    </div>
  );
}

export function ZoneMap3D({ onZoneClick }: ZoneMap3DProps) {
  const [rotation, setRotation] = useState({ x: 20, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const zones: Zone[] = [
    { id: "A", name: "Zone A", position: { x: -60, z: 40 }, status: "good", temp: 22, humidity: 65 },
    { id: "B", name: "Zone B", position: { x: -20, z: 40 }, status: "warning", temp: 35, humidity: 45 },
    { id: "C", name: "Zone C", position: { x: 20, z: 40 }, status: "good", temp: 21, humidity: 68 },
    { id: "D", name: "Zone D", position: { x: 60, z: 40 }, status: "good", temp: 23, humidity: 62 },
    { id: "E", name: "Zone E", position: { x: -60, z: -40 }, status: "good", temp: 22, humidity: 67 },
    { id: "F", name: "Zone F", position: { x: -20, z: -40 }, status: "good", temp: 24, humidity: 64 },
    { id: "G", name: "Zone G", position: { x: 20, z: -40 }, status: "good", temp: 23, humidity: 66 },
    { id: "H", name: "Zone H", position: { x: 60, z: -40 }, status: "good", temp: 22, humidity: 65 },
    { id: "I", name: "Zone I", position: { x: -40, z: 0 }, status: "good", temp: 21, humidity: 68 },
    { id: "J", name: "Zone J", position: { x: 40, z: 0 }, status: "good", temp: 23, humidity: 64 },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;

    setRotation({
      x: Math.max(-30, Math.min(60, rotation.x - deltaY * 0.5)),
      y: rotation.y + deltaX * 0.5,
    });

    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        perspective: "1200px",
        backgroundColor: "#1a202c",
      }}
    >
      {/* 3D Scene Container */}
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: "-200px",
          marginTop: "-200px",
          width: "400px",
          height: "400px",
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {/* Ground plane */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            left: "-50px",
            top: "-50px",
            transform: "translateZ(-50px)",
            background: "linear-gradient(45deg, #2d3748 25%, transparent 25%, transparent 75%, #2d3748 75%), linear-gradient(45deg, #2d3748 25%, transparent 25%, transparent 75%, #2d3748 75%)",
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px",
            opacity: 0.3,
          }}
        />

        {/* Greenhouses */}
        {zones.map((zone) => (
          <Greenhouse
            key={zone.id}
            zone={zone}
            onClick={() => onZoneClick(zone.name)}
          />
        ))}
      </div>

      {/* Controls Info */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          Drag to rotate | Click greenhouse to view interior
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-3 rounded-lg text-sm space-y-2">
        <div className="font-bold mb-2">Status Legend</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span>Good</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <span>Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <span>Alert</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
