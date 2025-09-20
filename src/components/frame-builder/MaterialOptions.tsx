import React, { useState } from 'react';
import { Palette, Droplets, Sparkles, Crown, Zap, Heart, Gem, TreePine } from 'lucide-react';
import { Frame } from './types';

interface MaterialOptionsProps {
  selectedFrame: Frame | null;
  setSelectedFrame: (frame: Frame | null) => void;
  frames: Frame[];
}

interface MaterialOption {
  id: string;
  name: string;
  type: 'wood' | 'metal' | 'composite' | 'acrylic';
  colors: string[];
  icon: React.ReactNode;
  description: string;
  priceMultiplier: number;
}

const materialOptions: MaterialOption[] = [
  {
    id: 'wood',
    name: 'Wood Frames',
    type: 'wood',
    colors: ['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DEB887', '#F5DEB3', '#2F4F4F', '#696969'],
    icon: <TreePine className="w-5 h-5" />,
    description: 'Classic wooden frames with natural grain patterns',
    priceMultiplier: 1.0
  },
  {
    id: 'metal',
    name: 'Metal Frames',
    type: 'metal',
    colors: ['#C0C0C0', '#FFD700', '#CD7F32', '#000000', '#FFFFFF', '#FF6347', '#4169E1', '#32CD32'],
    icon: <Zap className="w-5 h-5" />,
    description: 'Sleek metal frames with modern finishes',
    priceMultiplier: 1.2
  },
  {
    id: 'composite',
    name: 'Composite Frames',
    type: 'composite',
    colors: ['#2F4F4F', '#696969', '#A9A9A9', '#D3D3D3', '#F5F5F5', '#FFE4B5', '#F0E68C', '#98FB98'],
    icon: <Crown className="w-5 h-5" />,
    description: 'Durable composite materials with various textures',
    priceMultiplier: 0.8
  },
  {
    id: 'acrylic',
    name: 'Acrylic Frames',
    type: 'acrylic',
    colors: ['#FF69B4', '#00CED1', '#FF4500', '#9370DB', '#32CD32', '#FFD700', '#FF1493', '#00BFFF'],
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Modern acrylic frames with vibrant colors',
    priceMultiplier: 1.5
  }
];

const MaterialOptions: React.FC<MaterialOptionsProps> = ({
  selectedFrame,
  setSelectedFrame,
  frames
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('wood');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleMaterialSelect = (materialId: string) => {
    setSelectedMaterial(materialId);
    setSelectedColor('');
    
    // Find a frame with the selected material type
    const materialFrames = frames.filter(frame => 
      frame.material.toLowerCase().includes(materialId.toLowerCase())
    );
    
    if (materialFrames.length > 0) {
      setSelectedFrame(materialFrames[0]);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    
    // Find a frame with the selected color
    const colorFrames = frames.filter(frame => 
      frame.color.toLowerCase().includes(color.toLowerCase()) ||
      frame.material.toLowerCase().includes(selectedMaterial.toLowerCase())
    );
    
    if (colorFrames.length > 0) {
      setSelectedFrame(colorFrames[0]);
    }
  };

  const getMaterialFrames = (materialType: string) => {
    return frames.filter(frame => 
      frame.material.toLowerCase().includes(materialType.toLowerCase())
    );
  };

  const getColorFrames = (color: string) => {
    return frames.filter(frame => 
      frame.color.toLowerCase().includes(color.toLowerCase())
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Palette className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Material & Color Options</h3>
      </div>

      {/* Material Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Choose Material</h4>
        <div className="grid grid-cols-2 gap-3">
          {materialOptions.map((material) => (
            <button
              key={material.id}
              onClick={() => handleMaterialSelect(material.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMaterial === material.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-md ${
                  selectedMaterial === material.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {material.icon}
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{material.name}</p>
                  <p className="text-sm text-gray-500">{material.description}</p>
                  <p className="text-xs text-gray-400">
                    {getMaterialFrames(material.id).length} options available
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      {selectedMaterial && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Choose Color</h4>
          <div className="grid grid-cols-8 gap-2">
            {materialOptions
              .find(m => m.id === selectedMaterial)
              ?.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    selectedColor === color
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
          </div>
        </div>
      )}

      {/* Available Frames */}
      {selectedMaterial && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Available {materialOptions.find(m => m.id === selectedMaterial)?.name}
          </h4>
          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {getMaterialFrames(selectedMaterial).map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedFrame?.id === frame.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: frame.color }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{frame.code}</p>
                    <p className="text-xs text-gray-500">{frame.color}</p>
                    <p className="text-xs text-gray-500">${frame.priceRate.toFixed(2)}/m</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Material Info */}
      {selectedMaterial && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            {materialOptions.find(m => m.id === selectedMaterial)?.icon}
            <h5 className="font-medium text-gray-900">
              {materialOptions.find(m => m.id === selectedMaterial)?.name} Details
            </h5>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {materialOptions.find(m => m.id === selectedMaterial)?.description}
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Price multiplier: {materialOptions.find(m => m.id === selectedMaterial)?.priceMultiplier}x</p>
            <p>• Available frames: {getMaterialFrames(selectedMaterial).length}</p>
            <p>• Material type: {selectedMaterial}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialOptions;
