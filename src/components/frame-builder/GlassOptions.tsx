import React, { useState } from 'react';
import { Eye, Shield, Sun, Moon, Droplets, Zap, Star, Crown } from 'lucide-react';

interface GlassOption {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  icon: React.ReactNode;
  features: string[];
  uvProtection: boolean;
  antiGlare: boolean;
  museum: boolean;
}

interface BackingOption {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  thickness: string;
  material: string;
  archival: boolean;
}

const glassOptions: GlassOption[] = [
  {
    id: 'clear',
    name: 'Clear Glass',
    description: 'Standard clear glass for everyday framing',
    priceMultiplier: 1.0,
    icon: <Eye className="w-5 h-5" />,
    features: ['Crystal clear', 'Easy to clean', 'Standard protection'],
    uvProtection: false,
    antiGlare: false,
    museum: false
  },
  {
    id: 'uv',
    name: 'UV Protection Glass',
    description: 'Blocks 99% of harmful UV rays to protect your artwork',
    priceMultiplier: 1.5,
    icon: <Shield className="w-5 h-5" />,
    features: ['99% UV protection', 'Fade prevention', 'Long-term preservation'],
    uvProtection: true,
    antiGlare: false,
    museum: false
  },
  {
    id: 'anti-glare',
    name: 'Anti-Glare Glass',
    description: 'Reduces reflections for better viewing in bright conditions',
    priceMultiplier: 1.3,
    icon: <Sun className="w-5 h-5" />,
    features: ['Reduced reflections', 'Better visibility', 'Professional finish'],
    uvProtection: false,
    antiGlare: true,
    museum: false
  },
  {
    id: 'museum',
    name: 'Museum Quality Glass',
    description: 'Premium glass with UV protection and anti-glare coating',
    priceMultiplier: 2.0,
    icon: <Crown className="w-5 h-5" />,
    features: ['99% UV protection', 'Anti-glare coating', 'Museum quality', 'Maximum clarity'],
    uvProtection: true,
    antiGlare: true,
    museum: true
  }
];

const backingOptions: BackingOption[] = [
  {
    id: 'standard',
    name: 'Standard Backing',
    description: 'Standard cardboard backing for everyday framing',
    priceMultiplier: 1.0,
    thickness: '3mm',
    material: 'Cardboard',
    archival: false
  },
  {
    id: 'foam',
    name: 'Foam Core Backing',
    description: 'Lightweight foam core backing for larger frames',
    priceMultiplier: 1.2,
    thickness: '5mm',
    material: 'Foam Core',
    archival: false
  },
  {
    id: 'archival',
    name: 'Archival Backing',
    description: 'Acid-free archival backing for valuable artwork',
    priceMultiplier: 1.5,
    thickness: '3mm',
    material: 'Acid-free Board',
    archival: true
  },
  {
    id: 'conservation',
    name: 'Conservation Backing',
    description: 'Premium conservation-grade backing for museum pieces',
    priceMultiplier: 2.0,
    thickness: '5mm',
    material: 'Conservation Board',
    archival: true
  }
];

interface GlassOptionsProps {
  selectedGlass: string;
  setSelectedGlass: (glass: string) => void;
  selectedBacking: string;
  setSelectedBacking: (backing: string) => void;
}

const GlassOptions: React.FC<GlassOptionsProps> = ({
  selectedGlass,
  setSelectedGlass,
  selectedBacking,
  setSelectedBacking
}) => {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Glass Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Glass Options</h3>
        <div className="grid grid-cols-1 gap-3">
          {glassOptions.map((glass) => (
            <div
              key={glass.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedGlass === glass.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedGlass(glass.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-md ${
                    selectedGlass === glass.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {glass.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{glass.name}</h4>
                      {glass.museum && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{glass.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {glass.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Protection Icons */}
                    <div className="flex items-center space-x-2 mt-2">
                      {glass.uvProtection && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Shield className="w-3 h-3" />
                          <span className="text-xs">UV Protection</span>
                        </div>
                      )}
                      {glass.antiGlare && (
                        <div className="flex items-center space-x-1 text-blue-600">
                          <Sun className="w-3 h-3" />
                          <span className="text-xs">Anti-Glare</span>
                        </div>
                      )}
                      {glass.museum && (
                        <div className="flex items-center space-x-1 text-purple-600">
                          <Crown className="w-3 h-3" />
                          <span className="text-xs">Museum Quality</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {glass.priceMultiplier}x base price
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(showDetails === glass.id ? null : glass.id);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {showDetails === glass.id ? 'Hide' : 'Show'} Details
                  </button>
                </div>
              </div>
              
              {/* Detailed Information */}
              {showDetails === glass.id && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Technical Specifications</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>UV Protection:</strong> {glass.uvProtection ? '99%' : 'None'}</p>
                      <p><strong>Anti-Glare:</strong> {glass.antiGlare ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <p><strong>Clarity:</strong> {glass.museum ? 'Maximum' : 'Standard'}</p>
                      <p><strong>Thickness:</strong> 2mm</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      <strong>Best for:</strong> {glass.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Backing Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Backing Options</h3>
        <div className="grid grid-cols-1 gap-3">
          {backingOptions.map((backing) => (
            <div
              key={backing.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedBacking === backing.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedBacking(backing.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{backing.name}</h4>
                    {backing.archival && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Archival
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{backing.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                    <div>
                      <p><strong>Material:</strong> {backing.material}</p>
                    </div>
                    <div>
                      <p><strong>Thickness:</strong> {backing.thickness}</p>
                    </div>
                    <div>
                      <p><strong>Archival:</strong> {backing.archival ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {backing.priceMultiplier}x base price
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Recommendations</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• <strong>Photographs:</strong> UV Protection Glass + Archival Backing</p>
          <p>• <strong>Artwork:</strong> Museum Quality Glass + Conservation Backing</p>
          <p>• <strong>Everyday Items:</strong> Clear Glass + Standard Backing</p>
          <p>• <strong>Bright Rooms:</strong> Anti-Glare Glass for better viewing</p>
        </div>
      </div>
    </div>
  );
};

export default GlassOptions;
