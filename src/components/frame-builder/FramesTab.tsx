import React, { useMemo } from 'react';
import { Search, Star, DollarSign, ChevronDown, Info } from 'lucide-react';
import { Frame, SortOption } from './types';
import { frames, sortOptions, categories } from './data';

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
  setHideUnsuitableFrames
}) => {
  const filteredAndSortedFrames = useMemo(() => {
    let filtered = frames;

    if (activeCategory === 'Popular') {
      filtered = filtered.filter(frame => frame.isPopular);
    } else if (activeCategory === 'On Sale') {
      filtered = filtered.filter(frame => frame.isOnSale);
    } else {
      filtered = filtered.filter(frame => frame.category.includes(activeCategory));
    }

    if (searchTerm) {
      filtered = filtered.filter(frame =>
        frame.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        frame.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        frame.material.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (hideUnsuitableFrames) {
      filtered = filtered.filter(frame => (frame.maxLength || 0) >= 200);
    }

    const sortOption = sortOptions.find(option => option.value === sortBy);
    if (sortOption) {
      filtered.sort(sortOption.sortFn);
    }

    return filtered;
  }, [activeCategory, searchTerm, hideUnsuitableFrames, sortBy]);

  const handleFrameSelect = (frame: Frame) => {
    setSelectedFrame(selectedFrame?.id === frame.id ? null : frame);
  };

  return (
    <div>
      {/* Frame Controls */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mb-2">
            Sort Options
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white pr-10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="frame-search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Frames
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="frame-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type a frame code or search term"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 flex items-center gap-2 ${
                activeCategory === category.name
                  ? 'bg-amber-600 text-white border-b-2 border-amber-600'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              {category.icon === 'star' && <Star className="w-4 h-4" />}
              {category.icon === 'dollar' && <DollarSign className="w-4 h-4" />}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Frame Grid - Fixed height with scrolling */}
      <div className="overflow-y-auto max-h-[500px] pr-2 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredAndSortedFrames.map((frame) => (
            <div
              key={frame.id}
              className={`bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                selectedFrame?.id === frame.id 
                  ? 'border-amber-500 ring-2 ring-amber-200' 
                  : 'border-gray-200 hover:border-amber-300'
              }`}
              onClick={() => handleFrameSelect(frame)}
            >
              <div className="relative">
                <img
                  src={frame.image}
                  alt={`Frame ${frame.code}`}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                {frame.isOnSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Sale
                  </div>
                )}
                {frame.isPopular && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white p-1 rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{frame.code}</p>
                  <p className="text-sm text-gray-600">Width: {frame.width} cm</p>
                  <p className="text-sm text-gray-600">Price Rate {frame.priceRate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Unsuitable Frames */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="hide-unsuitable"
          checked={hideUnsuitableFrames}
          onChange={(e) => setHideUnsuitableFrames(e.target.checked)}
          className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
        />
        <label htmlFor="hide-unsuitable" className="text-sm text-gray-700">
          Hide Unsuitable Frames
        </label>
        <div className="relative group">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Each frame has a maximum length it can support. You can uncheck this option to view the entire collection.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FramesTab;