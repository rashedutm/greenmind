import { useState } from "react";
import { X } from "lucide-react";
import aerialImage from "@/assets/1b8fa6d76ec9d5d9b791d7accd5841b746a453e0.png";
import interiorImage from "@/assets/3aa66c00c3ec1864fa6ca67fa37da1ac4b80b64c.png";

interface Zone {
  id: string;
  name: string;
  position: { left: string; top: string; width: string; height: string };
}

interface AerialZoneMapProps {
  onZoneClick?: (zoneName: string) => void;
}

export function AerialZoneMap({ onZoneClick }: AerialZoneMapProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Define clickable zones based on the aerial image
  const zones: Zone[] = [
    { id: "1-left", name: "Zone 1", position: { left: "4%", top: "28%", width: "12%", height: "18%" } },
    { id: "1-top", name: "Zone 1", position: { left: "43%", top: "8%", width: "14%", height: "16%" } },
    { id: "2-left", name: "Zone 2", position: { left: "13%", top: "16%", width: "10%", height: "15%" } },
    { id: "2-middle", name: "Zone 2", position: { left: "24%", top: "12%", width: "11%", height: "16%" } },
    { id: "3-left", name: "Zone 3", position: { left: "8%", top: "42%", width: "12%", height: "18%" } },
    { id: "3-right", name: "Zone 3", position: { left: "56%", top: "18%", width: "13%", height: "16%" } },
    { id: "9", name: "Zone 9", position: { left: "20%", top: "37%", width: "11%", height: "16%" } },
    { id: "10-middle", name: "Zone 10", position: { left: "33%", top: "42%", width: "11%", height: "18%" } },
    { id: "10-right", name: "Zone 10", position: { left: "78%", top: "36%", width: "12%", height: "16%" } },
    { id: "19", name: "Zone 19", position: { left: "53%", top: "35%", width: "13%", height: "18%" } },
    { id: "6", name: "Zone 6", position: { left: "75%", top: "18%", width: "12%", height: "16%" } },
  ];

  const handleZoneClick = (zoneName: string) => {
    setSelectedZone(zoneName);
    if (onZoneClick) {
      onZoneClick(zoneName);
    }
  };

  const closeModal = () => {
    setSelectedZone(null);
  };

  return (
    <>
      {/* Aerial View Container */}
      <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
        {/* Background Image */}
        <img
          src={aerialImage}
          alt="Aerial view of greenhouse zones"
          className="w-full h-full object-cover"
        />

        {/* Clickable Zone Overlays */}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={`absolute cursor-pointer transition-all duration-200 ${
              hoveredZone === zone.id
                ? "bg-cyan-400/40 border-2 border-cyan-400 shadow-lg shadow-cyan-400/50"
                : "bg-transparent border-2 border-transparent hover:bg-cyan-400/20"
            }`}
            style={{
              left: zone.position.left,
              top: zone.position.top,
              width: zone.position.width,
              height: zone.position.height,
            }}
            onClick={() => handleZoneClick(zone.name)}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            {/* Zone Label - show on hover */}
            {hoveredZone === zone.id && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded-md text-sm font-semibold whitespace-nowrap pointer-events-none">
                {zone.name}
                <div className="text-xs text-cyan-400 mt-1">Click to view interior</div>
              </div>
            )}
          </div>
        ))}

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            Hover over zones and click to view greenhouse interior
          </div>
        </div>
      </div>

      {/* Modal for Interior View */}
      {selectedZone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full mx-4 bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedZone} - Interior View</h3>
                <p className="text-green-100 text-sm mt-1">Inside greenhouse perspective</p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Interior Image */}
            <div className="p-6 bg-gray-800">
              <img
                src={interiorImage}
                alt={`${selectedZone} interior view`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-gray-300 text-sm">
                  <span className="font-semibold text-white">{selectedZone}</span> - Active greenhouse operations
                </div>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
