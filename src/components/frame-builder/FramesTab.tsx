import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Star, DollarSign, ChevronDown, Info, ChevronLeft, ChevronRight, Palette, Crown, Zap, Heart, Sparkles, Gem, TreePine, Home, Clock, Award, Coffee, Sun, Moon, Waves, Flower2, Diamond, Shield } from 'lucide-react';
import { Frame, SortOption } from './types';
import { sortOptions, categories } from './data';
import { useFrames, useFrameCategories, transformStrapiFrame } from '../../hooks/useFrames';

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
  // Fetch frames from Strapi
  const { frames: strapiFrames, loading: framesLoading, error: framesError } = useFrames();
  const { categories: strapiCategories, loading: categoriesLoading } = useFrameCategories();

  // Transform Strapi frames to local Frame type
  const frames = useMemo(() => {
    return strapiFrames.map(transformStrapiFrame);
  }, [strapiFrames]);

  const filteredAndSortedFrames = useMemo(() => {
    let filtered = frames;

    if (activeCategory === 'All') {
      // Show all frames when "All" is selected
      filtered = frames;
    } else if (activeCategory === 'Popular') {
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
  }, [frames, activeCategory, searchTerm, hideUnsuitableFrames, sortBy]);

  const handleFrameSelect = (frame: Frame) => {
    setSelectedFrame(selectedFrame?.id === frame.id ? null : frame);
  };



  const getCategoryIcon = (iconName: string | null) => {
    switch (iconName) {
      case 'star': return <Star className="w-4 h-4" />;
      case 'dollar': return <DollarSign className="w-4 h-4" />;
      case 'palette': return <Palette className="w-4 h-4" />;
      case 'crown': return <Crown className="w-4 h-4" />;
      case 'zap': return <Zap className="w-4 h-4" />;
      case 'heart': return <Heart className="w-4 h-4" />;
      case 'sparkles': return <Sparkles className="w-4 h-4" />;
      case 'gem': return <Gem className="w-4 h-4" />;
      case 'treepine': return <TreePine className="w-4 h-4" />;
      case 'home': return <Home className="w-4 h-4" />;
      case 'clock': return <Clock className="w-4 h-4" />;
      case 'award': return <Award className="w-4 h-4" />;
      case 'coffee': return <Coffee className="w-4 h-4" />;
      case 'sun': return <Sun className="w-4 h-4" />;
      case 'moon': return <Moon className="w-4 h-4" />;
      case 'waves': return <Waves className="w-4 h-4" />;
      case 'flower': return <Flower2 className="w-4 h-4" />;
      case 'diamond': return <Diamond className="w-4 h-4" />;
      case 'shield': return <Shield className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="frame-tab">
      {/* Frame Controls */}
      <div className="columns mb-6">
        <div className="column">
          <div className="form-group">
            <div className="select is-fullwidth">
              <select
                id="frames-order-by"
                title="Sorting Options"
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
            </div>
          </div>
        </div>
        
        <div className="column">
          <div className="form-group">
            <input
              type="text"
              id="frames-search-input"
              title="Frame Search"
              aria-label="Search for frames"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type a frame code or search term"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-4">
        <ul className="FramesTab---tab-list---2iFa6_0 flex flex-wrap gap-2">
          {(strapiCategories.length > 0 ? strapiCategories : categories).map((category) => {
            const categoryName = typeof category === 'string' ? category : category.name;
            const categoryIcon = typeof category === 'string' ? null : category.icon;
            return (
              <li key={categoryName} className="FramesTab---tab---3c_QL_0 list-none">
                <span
                  onClick={() => setActiveCategory(categoryName)}
                  className={`FramesTab---tab-text---3IkZG_0 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                    activeCategory === categoryName
                      ? 'FramesTab---current-tab---3tG84_0 bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50 border-gray-200 hover:border-amber-300'
                  }`}
                >
                  {getCategoryIcon(categoryIcon)}
                  {categoryName}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Frame List Container */}
      <div className="frame-list-container">
        {/* Loading and Error States */}
        {framesLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading frames...</p>
          </div>
        )}
        
        {framesError && (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">Error loading frames: {framesError}</p>
              <p className="text-red-600 text-xs mt-1">Make sure Strapi is running on http://localhost:1337</p>
            </div>
          </div>
        )}
        
        {/* Debug: Show number of frames */}
        {!framesLoading && !framesError && (
          <div className="mb-2 text-sm text-gray-500">
            Showing {filteredAndSortedFrames.length} frames
          </div>
        )}
        
        {!framesLoading && !framesError && (
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-4 pb-4 min-w-max">
              {filteredAndSortedFrames.map((frame) => (
              <div
                key={frame.id}
                className={`frame-card__container flex-shrink-0 ${
                  selectedFrame?.id === frame.id ? 'frame-card--selected' : ''
                }`}
                style={{ width: '200px' }}
              >
                <div
                  className={`frame-card bg-white rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedFrame?.id === frame.id 
                      ? 'border-blue-500 ring-1 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleFrameSelect(frame)}
                >
                  <div className="frame-card__main">
                    <div className="relative">
                      <Link href={`/products/${frame.id}`}>
                        <img
                          src={frame.image}
                          alt={`Frame ${frame.code}`}
                          className="frame-image w-full h-28 object-cover rounded-t-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
                        />
                      </Link>
                      {frame.isOnSale && (
                        <div className="absolute top-1 left-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                          Sale
                        </div>
                      )}
                      {frame.isPopular && (
                        <div className="absolute top-1 right-1 bg-amber-500 text-white p-0.5 rounded">
                          <Star className="w-2.5 h-2.5 fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="p-2 text-center">
                      <div className="frame-card__code font-semibold text-gray-900 text-sm">{frame.code}</div>
                      <div className="frame-card__size text-xs text-gray-600">Width: {frame.width} cm</div>
                      <div className="frame-card__rate text-xs text-gray-600">Price Rate {frame.priceRate}</div>
                    </div>
                  </div>
                  
                  {/* Expanded Frame Info */}
                  {selectedFrame?.id === frame.id && (
                    <div className="frame-card__info frame-card__info--expanded border-t border-gray-200 p-3">
                      <table className="frame-card__info__table w-full text-sm">
                        <thead>
                          <tr>
                            <td colSpan={2} className="title font-semibold text-gray-900 text-center pb-2">
                              {frame.code}
                            </td>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600">
                          <tr className="border-b border-gray-100">
                            <td className="py-1">Width</td>
                            <td className="py-1 text-right">{frame.width} cm</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-1">Depth</td>
                            <td className="py-1 text-right">{frame.depth} cm</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-1">Rebate</td>
                            <td className="py-1 text-right">{frame.rebate} cm</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-1">Material</td>
                            <td className="py-1 text-right">{frame.material}</td>
                          </tr>
                          <tr>
                            <td className="py-1">Colour</td>
                            <td className="py-1 text-right">{frame.color}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hide Unsuitable Frames */}
      <div className="mt-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            aria-label="Hide unsuitable frames"
            checked={hideUnsuitableFrames}
            onChange={(e) => setHideUnsuitableFrames(e.target.checked)}
            className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm text-gray-700">Hide Unsuitable Frames</span>
        </label>
        <button 
          tabIndex={-1} 
          className="tooltip__button ml-2" 
          aria-label="Hide unsuitable frames tooltip"
        >
          <div className="tooltip__content hidden opacity-0">
            <span>Each frame has a maximum length it can support. You can uncheck this option to view the entire collection.</span>
          </div>
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
        </button>
      </div>
    </div>
  );
};

export default FramesTab;