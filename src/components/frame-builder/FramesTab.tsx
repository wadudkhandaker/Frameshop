import React, { useMemo } from 'react';
import { Search, Star, DollarSign, Info, Palette, Crown, Zap, Heart, Sparkles, Gem, TreePine, Home, Clock, Award, Coffee, Sun, Moon, Waves, Flower2, Diamond, Shield, Box, Image } from 'lucide-react';
import { Frame } from './types';
import { categories } from './data';
import { FrameCard } from './FrameCard';

interface FramesTabProps {
  selectedFrame: Frame | null;
  setSelectedFrame: (frame: Frame | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  hideUnsuitableFrames: boolean;
  setHideUnsuitableFrames: (hide: boolean) => void;
  frames: Frame[];
  loading?: boolean;
}

const FramesTab: React.FC<FramesTabProps> = ({
  selectedFrame,
  setSelectedFrame,
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  hideUnsuitableFrames,
  setHideUnsuitableFrames,
  frames,
  loading = false
}) => {

  // Filter and sort frames
  const filteredAndSortedFrames = useMemo(() => {
    let filtered = frames;

    // Filter by category
    if (activeCategory !== 'Popular') {
      filtered = filtered.filter(frame => 
        frame.category.includes(activeCategory)
      );
    } else {
      filtered = filtered.filter(frame => frame.category.includes('Popular'));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(frame =>
        frame.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        frame.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        frame.material.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Hide unsuitable frames if option is enabled
    if (hideUnsuitableFrames) {
      // For now, show all frames - can add length filtering later
    }

    // Sort frames
    switch (sortBy) {
      case 'width-asc':
        filtered.sort((a, b) => a.width - b.width);
        break;
      case 'width-desc':
        filtered.sort((a, b) => b.width - a.width);
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.priceRate - b.priceRate);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.priceRate - a.priceRate);
        break;
    }

    return filtered;
  }, [frames, activeCategory, searchTerm, hideUnsuitableFrames, sortBy]);

  const handleFrameSelect = (frame: Frame) => {
    setSelectedFrame(selectedFrame?.id === frame.id ? null : frame);
  };

  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Popular': <Star className="w-3 h-3" />,
      'On Sale': <DollarSign className="w-3 h-3" />,
      '3D Frame': <Box className="w-3 h-3" />,
      'Float for Canvas': <Image className="w-3 h-3" />,
      'Black': <Palette className="w-3 h-3" />,
      'White': <Palette className="w-3 h-3" />,
      'Raw Timber': <TreePine className="w-3 h-3" />,
      'Stains': <Palette className="w-3 h-3" />,
      'Gold': <Crown className="w-3 h-3" />,
      'Silver': <Gem className="w-3 h-3" />,
      'Colourful': <Sparkles className="w-3 h-3" />,
      'Aluminium': <Shield className="w-3 h-3" />,
    };
    return iconMap[categoryName] || <Palette className="w-3 h-3" />;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading frames...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Search and Sort Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search frames..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="width-asc">Width: Small to Large</option>
            <option value="width-desc">Width: Large to Small</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.filter(category => category.name !== 'All').map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeCategory === category.name
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category.name)}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Frame List Container */}
      <div className="frame-list-container">
        {/* Debug: Show number of frames */}
        {frames.length > 0 && (
          <div className="mb-2 text-sm text-gray-500">
            Showing {filteredAndSortedFrames.length} frames
          </div>
        )}
        
        {frames.length > 0 && (
          <div className="frame-selection-container overflow-x-auto overflow-y-hidden bg-white h-64 w-full">
            <div className="flex gap-2 pb-4 min-w-max h-full">
              {filteredAndSortedFrames.map((frame) => (
                <FrameCard
                  key={frame.id}
                  frame={frame}
                  isSelected={selectedFrame?.id === frame.id}
                  onClick={() => handleFrameSelect(frame)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Hide Unsuitable Frames */}
        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="hide-unsuitable"
            checked={hideUnsuitableFrames}
            onChange={(e) => setHideUnsuitableFrames(e.target.checked)}
            className="text-blue-600"
          />
          <label htmlFor="hide-unsuitable" className="text-sm text-gray-700">
            Hide Unsuitable Frames
          </label>
          <button className="text-blue-600 hover:text-blue-800">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FramesTab;