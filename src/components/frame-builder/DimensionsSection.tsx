import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Units, StandardSize } from './types';
import { standardSizes } from './data';

interface DimensionsSectionProps {
  units: Units;
  setUnits: (units: Units) => void;
  imageWidth: string;
  setImageWidth: (width: string) => void;
  imageHeight: string;
  setImageHeight: (height: string) => void;
  selectedStandardSize: string;
  setSelectedStandardSize: (size: string) => void;
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  onStandardSizeSelect: (sizeLabel: string) => void;
}

const DimensionsSection: React.FC<DimensionsSectionProps> = ({
  units,
  setUnits,
  imageWidth,
  setImageWidth,
  imageHeight,
  setImageHeight,
  selectedStandardSize,
  uploadedImage,
  setUploadedImage,
  onStandardSizeSelect
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h3>
      
      {/* Image Upload */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Printing (Optional)</label>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/bmp, image/tiff, image/gif"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-amber-400 transition-colors flex flex-col items-center"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-gray-600">Upload Image</span>
        </button>
        {uploadedImage && (
          <div className="mt-4 relative">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <button
              onClick={() => setUploadedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Units */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="cm"
              checked={units === 'cm'}
              onChange={(e) => setUnits(e.target.value as Units)}
              className="mr-2"
            />
            cm
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="inch"
              checked={units === 'inch'}
              onChange={(e) => setUnits(e.target.value as Units)}
              className="mr-2"
            />
            inch
          </label>
        </div>
      </div>

      {/* Image Size */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Size</label>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">WIDTH</label>
              <input
                type="number"
                value={imageWidth}
                onChange={(e) => setImageWidth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                step="0.1"
                min="1"
                max="999.99"
              />
            </div>
            <span className="text-gray-500 mt-6">×</span>
            <div>
              <label className="block text-xs text-gray-500 mb-1">HEIGHT</label>
              <input
                type="number"
                value={imageHeight}
                onChange={(e) => setImageHeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                step="0.1"
                min="1"
                max="999.99"
              />
            </div>
            <span className="text-gray-500 mt-6">{units}</span>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">STANDARD SIZES</label>
            <select
              value={selectedStandardSize}
              onChange={(e) => onStandardSizeSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Standard Sizes</option>
              {standardSizes.map((size) => (
                <option key={size.label} value={size.label}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Min: 10 x 10 cm, Max: 101.5 x 152.5 cm
        </p>
      </div>
    </div>
  );
};

export default DimensionsSection;