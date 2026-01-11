import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ZoneDetailPageProps {
  zone: string;
  onClose: () => void;
}

export function ZoneDetailPage({ zone, onClose }: ZoneDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

  // 20 different plant part images
  const plantParts = [
    { id: 1, name: 'Main Leaf Structure', category: 'Leaves', url: 'https://images.unsplash.com/photo-1622484966097-6f2cd8c96f27?w=800' },
    { id: 2, name: 'Leaf Veins Detail', category: 'Leaves', url: 'https://images.unsplash.com/photo-1673266092296-fc80639bca62?w=800' },
    { id: 3, name: 'Leaf Edge Texture', category: 'Leaves', url: 'https://images.unsplash.com/photo-1622484966097-6f2cd8c96f27?w=800' },
    { id: 4, name: 'Young Leaf', category: 'Leaves', url: 'https://images.unsplash.com/photo-1673266092296-fc80639bca62?w=800' },
    { id: 5, name: 'Mature Leaf', category: 'Leaves', url: 'https://images.unsplash.com/photo-1622484966097-6f2cd8c96f27?w=800' },
    { id: 6, name: 'Primary Stem', category: 'Stems', url: 'https://images.unsplash.com/photo-1662627568121-1d1c92fff2d5?w=800' },
    { id: 7, name: 'Stem Joint', category: 'Stems', url: 'https://images.unsplash.com/photo-1662627568121-1d1c92fff2d5?w=800' },
    { id: 8, name: 'Stem Texture', category: 'Stems', url: 'https://images.unsplash.com/photo-1662627568121-1d1c92fff2d5?w=800' },
    { id: 9, name: 'Branch Connection', category: 'Stems', url: 'https://images.unsplash.com/photo-1662627568121-1d1c92fff2d5?w=800' },
    { id: 10, name: 'Flower Bud', category: 'Flowers', url: 'https://images.unsplash.com/photo-1646725410579-ffb91222149e?w=800' },
    { id: 11, name: 'Blooming Flower', category: 'Flowers', url: 'https://images.unsplash.com/photo-1646725410579-ffb91222149e?w=800' },
    { id: 12, name: 'Petal Detail', category: 'Flowers', url: 'https://images.unsplash.com/photo-1646725410579-ffb91222149e?w=800' },
    { id: 13, name: 'Seedling Sprout', category: 'Growth', url: 'https://images.unsplash.com/photo-1646342425012-f098cd304508?w=800' },
    { id: 14, name: 'Young Plant', category: 'Growth', url: 'https://images.unsplash.com/photo-1646342425012-f098cd304508?w=800' },
    { id: 15, name: 'Root System', category: 'Roots', url: 'https://images.unsplash.com/photo-1635739056558-6d8b9249ca93?w=800' },
    { id: 16, name: 'Root Hair Detail', category: 'Roots', url: 'https://images.unsplash.com/photo-1635739056558-6d8b9249ca93?w=800' },
    { id: 17, name: 'Tuber Formation', category: 'Tubers', url: 'https://images.unsplash.com/photo-1635739056558-6d8b9249ca93?w=800' },
    { id: 18, name: 'Developing Potato', category: 'Tubers', url: 'https://images.unsplash.com/photo-1635739056558-6d8b9249ca93?w=800' },
    { id: 19, name: 'Mature Potato', category: 'Tubers', url: 'https://images.unsplash.com/photo-1635739056558-6d8b9249ca93?w=800' },
    { id: 20, name: 'Overall Plant Health', category: 'Overview', url: 'https://images.unsplash.com/photo-1622484966097-6f2cd8c96f27?w=800' }
  ];

  const categories = ['All', 'Leaves', 'Stems', 'Flowers', 'Growth', 'Roots', 'Tubers', 'Overview'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredParts = activeCategory === 'All' 
    ? plantParts 
    : plantParts.filter(part => part.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Zone {zone} - Plant Analysis Gallery</h1>
                    <p className="text-sm text-gray-400">20 detailed images of potato plant components</p>
                  </div>
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 rounded-lg p-1 flex gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'carousel'
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-900/50 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-2 text-xs opacity-70">
                    ({plantParts.filter(p => p.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 h-[calc(100vh-200px)] overflow-y-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-4 gap-4">
            {filteredParts.map((part, index) => (
              <div
                key={part.id}
                className="group relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedImage(index)}
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={part.url}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-400 font-medium">{part.category}</span>
                      </div>
                      <h3 className="text-white font-semibold text-sm">{part.name}</h3>
                      <button className="mt-2 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-medium text-white transition-colors">
                        View Full Size
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-3 bg-gray-900/70">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Part #{part.id}</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-gray-400">HD</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {filteredParts.map((part, index) => (
              <div
                key={part.id}
                className="mb-6 bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700"
              >
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={part.url}
                    alt={part.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-cyan-600/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-medium">
                      {part.category}
                    </span>
                    <span className="text-gray-500 text-sm">Part #{part.id} of 20</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{part.name}</h3>
                  <p className="text-gray-400 text-sm">
                    High-resolution image of {part.name.toLowerCase()} captured with macro lens for detailed analysis.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Size Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-w-6xl w-full">
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-cyan-500/30">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={filteredParts[selectedImage].url}
                  alt={filteredParts[selectedImage].name}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="p-6 bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{filteredParts[selectedImage].name}</h3>
                    <p className="text-gray-400">{filteredParts[selectedImage].category} • Part #{filteredParts[selectedImage].id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                      disabled={selectedImage === 0}
                      className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImage(Math.min(filteredParts.length - 1, selectedImage + 1))}
                      disabled={selectedImage === filteredParts.length - 1}
                      className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
