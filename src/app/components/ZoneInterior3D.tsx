import { useState } from "react";

interface ZoneInterior3DProps {
  zoneName: string;
  onBack: () => void;
}

function PotatoPlant({ 
  position, 
  index 
}: { 
  position: { x: number; z: number }; 
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const baseColor = hovered ? "#5eb377" : "#4a9960";
  const leafColor = hovered ? "#6bc585" : "#52b371";

  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x + 200}px`,
        top: `${position.z + 200}px`,
        width: "30px",
        height: "30px",
        transformStyle: "preserve-3d",
        cursor: "pointer",
        transition: "transform 0.2s",
        transform: hovered ? "translateZ(5px) scale(1.2)" : "translateZ(0px) scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Soil mound */}
      <div
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          left: "5px",
          top: "5px",
          backgroundColor: hovered ? "#8b6f47" : "#6b4423",
          borderRadius: "50%",
          transform: "translateZ(0px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        }}
      />

      {/* Stem */}
      <div
        style={{
          position: "absolute",
          width: "3px",
          height: "25px",
          left: "13.5px",
          top: "-10px",
          backgroundColor: baseColor,
          transform: "translateZ(5px)",
          borderRadius: "2px",
        }}
      />

      {/* Leaves */}
      <div
        style={{
          position: "absolute",
          width: "15px",
          height: "8px",
          left: "0px",
          top: "-5px",
          backgroundColor: leafColor,
          transform: "rotateZ(-30deg) translateZ(8px)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "15px",
          height: "8px",
          right: "0px",
          top: "-8px",
          backgroundColor: leafColor,
          transform: "rotateZ(30deg) translateZ(8px)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "12px",
          height: "8px",
          left: "9px",
          top: "-12px",
          backgroundColor: leafColor,
          transform: "translateZ(10px)",
          borderRadius: "50%",
        }}
      />

      {/* Top cluster */}
      <div
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          left: "10px",
          top: "-20px",
          backgroundColor: hovered ? "#7dd89f" : "#6bc585",
          transform: "translateZ(12px)",
          borderRadius: "50%",
          boxShadow: `0 0 8px ${hovered ? "#7dd89f" : "#6bc585"}`,
        }}
      />

      {/* Hover info */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          Plant {index + 1}
        </div>
      )}
    </div>
  );
}

export function ZoneInterior3D({ zoneName, onBack }: ZoneInterior3DProps) {
  const [rotation, setRotation] = useState({ x: 30, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Create a 5x6 grid of potato plants
  const plants: Array<{ row: number; col: number; x: number; z: number }> = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 5; col++) {
      plants.push({
        row,
        col,
        x: col * 60 - 120,
        z: row * 60 - 150,
      });
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;

    setRotation({
      x: Math.max(10, Math.min(60, rotation.x - deltaY * 0.5)),
      y: rotation.y + deltaX * 0.5,
    });

    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full h-full relative">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Zone Map
      </button>

      {/* Zone info */}
      <div className="absolute top-4 right-4 z-10 bg-gray-900/90 text-white px-4 py-3 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg">{zoneName}</h3>
        <p className="text-sm text-gray-300">{plants.length} Potato Plants</p>
        <div className="mt-2 pt-2 border-t border-gray-700 text-xs space-y-1">
          <div className="flex justify-between">
            <span>Rows:</span>
            <span className="font-semibold">6</span>
          </div>
          <div className="flex justify-between">
            <span>Columns:</span>
            <span className="font-semibold">5</span>
          </div>
        </div>
      </div>

      {/* 3D Scene */}
      <div
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          perspective: "1200px",
          background: "linear-gradient(to bottom, #2d3748 0%, #1a202c 100%)",
        }}
      >
        <div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: "-200px",
            marginTop: "-150px",
            width: "400px",
            height: "400px",
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {/* Floor */}
          <div
            style={{
              position: "absolute",
              width: "500px",
              height: "500px",
              left: "-50px",
              top: "-50px",
              transform: "translateZ(-20px)",
              background: "#6b4423",
              backgroundImage: "radial-gradient(circle, #8b6f47 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              border: "2px solid #4a3f35",
            }}
          />

          {/* Row markers */}
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div
              key={`row-${row}`}
              style={{
                position: "absolute",
                left: "-80px",
                top: `${row * 60 - 150 + 200}px`,
                transform: "translateZ(10px)",
                color: "#a0aec0",
                fontSize: "12px",
                fontWeight: "bold",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              R{row + 1}
            </div>
          ))}

          {/* Potato plants */}
          {plants.map((plant, index) => (
            <PotatoPlant
              key={index}
              position={{ x: plant.x, z: plant.z }}
              index={index}
            />
          ))}

          {/* Zone label */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "-120px",
              transform: "translateX(-50%) translateZ(30px)",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {zoneName} - Interior View
          </div>
        </div>
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
          Drag to rotate | Hover over plants for details
        </div>
      </div>

      {/* Plant Stats */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-3 rounded-lg text-sm">
        <div className="font-bold mb-2">Plant Health</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span>Healthy: {plants.length}</span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            All plants growing well
          </div>
        </div>
      </div>
    </div>
  );
}
