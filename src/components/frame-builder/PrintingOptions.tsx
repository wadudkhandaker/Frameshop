import React, { useState } from 'react';
import { Printer, Palette, Download, Upload, Zap, Crown, Star, CheckCircle } from 'lucide-react';

interface PrintOption {
  id: string;
  name: string;
  description: string;
  pricePerSqCm: number;
  icon: React.ReactNode;
  features: string[];
  quality: 'standard' | 'premium' | 'professional';
  turnaround: string;
}

interface PrintSize {
  id: string;
  name: string;
  width: number;
  height: number;
  price: number;
}

const printOptions: PrintOption[] = [
  {
    id: 'standard',
    name: 'Standard Print',
    description: 'High-quality digital print on premium paper',
    pricePerSqCm: 0.15,
    icon: <Printer className="w-5 h-5" />,
    features: ['300 DPI resolution', 'Color accurate', 'Fast turnaround'],
    quality: 'standard',
    turnaround: '2-3 days'
  },
  {
    id: 'premium',
    name: 'Premium Print',
    description: 'Professional-grade print with enhanced color depth',
    pricePerSqCm: 0.25,
    icon: <Star className="w-5 h-5" />,
    features: ['600 DPI resolution', 'Enhanced color', 'Premium paper', 'Color matching'],
    quality: 'premium',
    turnaround: '3-5 days'
  },
  {
    id: 'professional',
    name: 'Professional Print',
    description: 'Museum-quality archival print for fine art',
    pricePerSqCm: 0.40,
    icon: <Crown className="w-5 h-5" />,
    features: ['1200 DPI resolution', 'Archival inks', 'Museum paper', 'Color calibrated', 'Longevity guarantee'],
    quality: 'professional',
    turnaround: '5-7 days'
  }
];

const printSizes: PrintSize[] = [
  { id: '4x6', name: '4" × 6"', width: 10.16, height: 15.24, price: 2.50 },
  { id: '5x7', name: '5" × 7"', width: 12.7, height: 17.78, price: 3.50 },
  { id: '8x10', name: '8" × 10"', width: 20.32, height: 25.4, price: 6.00 },
  { id: '11x14', name: '11" × 14"', width: 27.94, height: 35.56, price: 12.00 },
  { id: '16x20', name: '16" × 20"', width: 40.64, height: 50.8, price: 25.00 },
  { id: '20x24', name: '20" × 24"', width: 50.8, height: 60.96, price: 40.00 },
  { id: 'custom', name: 'Custom Size', width: 0, height: 0, price: 0 }
];

interface PrintingOptionsProps {
  selectedPrintOption: string;
  setSelectedPrintOption: (option: string) => void;
  selectedPrintSize: string;
  setSelectedPrintSize: (size: string) => void;
  customWidth: string;
  setCustomWidth: (width: string) => void;
  customHeight: string;
  setCustomHeight: (height: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const PrintingOptions: React.FC<PrintingOptionsProps> = ({
  selectedPrintOption,
  setSelectedPrintOption,
  selectedPrintSize,
  setSelectedPrintSize,
  customWidth,
  setCustomWidth,
  customHeight,
  setCustomHeight,
  quantity,
  setQuantity
}) => {
  const [showSizeDetails, setShowSizeDetails] = useState<string | null>(null);

  const calculatePrintPrice = () => {
    if (selectedPrintSize === 'custom') {
      const width = parseFloat(customWidth) || 0;
      const height = parseFloat(customHeight) || 0;
      const area = width * height;
      const option = printOptions.find(opt => opt.id === selectedPrintOption);
      return area * (option?.pricePerSqCm || 0) * quantity;
    } else {
      const size = printSizes.find(s => s.id === selectedPrintSize);
      const option = printOptions.find(opt => opt.id === selectedPrintOption);
      if (size && option) {
        const area = size.width * size.height;
        return area * option.pricePerSqCm * quantity;
      }
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Print Quality Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Print Quality</h3>
        <div className="grid grid-cols-1 gap-3">
          {printOptions.map((option) => (
            <div
              key={option.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedPrintOption === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPrintOption(option.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-md ${
                    selectedPrintOption === option.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{option.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        option.quality === 'professional' ? 'bg-purple-100 text-purple-800' :
                        option.quality === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {option.quality}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {option.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>{option.turnaround}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Palette className="w-3 h-3" />
                        <span>${option.pricePerSqCm}/cm²</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSizeDetails(showSizeDetails === option.id ? null : option.id);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {showSizeDetails === option.id ? 'Hide' : 'Show'} Details
                  </button>
                </div>
              </div>
              
              {/* Detailed Information */}
              {showSizeDetails === option.id && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Technical Specifications</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Resolution:</strong> {option.features[0]}</p>
                      <p><strong>Color Accuracy:</strong> {option.features[1]}</p>
                    </div>
                    <div>
                      <p><strong>Paper Type:</strong> {option.quality === 'professional' ? 'Museum' : 'Premium'}</p>
                      <p><strong>Turnaround:</strong> {option.turnaround}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Print Sizes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Print Size</h3>
        <div className="grid grid-cols-2 gap-3">
          {printSizes.map((size) => (
            <div
              key={size.id}
              className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                selectedPrintSize === size.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPrintSize(size.id)}
            >
              <div className="text-center">
                <h4 className="font-medium text-gray-900">{size.name}</h4>
                {size.id !== 'custom' && (
                  <>
                    <p className="text-sm text-gray-600">
                      {size.width}cm × {size.height}cm
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      ${size.price.toFixed(2)}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Size Input */}
        {selectedPrintSize === 'custom' && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Custom Dimensions</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Enter width"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Enter height"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Custom size pricing: ${printOptions.find(opt => opt.id === selectedPrintOption)?.pricePerSqCm}/cm²
            </p>
          </div>
        )}
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
          >
            +
          </button>
          <span className="text-sm text-gray-600">copies</span>
        </div>
      </div>

      {/* Price Calculation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Print Pricing</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• <strong>Print Option:</strong> {printOptions.find(opt => opt.id === selectedPrintOption)?.name}</p>
          <p>• <strong>Size:</strong> {selectedPrintSize === 'custom' ? `${customWidth}cm × ${customHeight}cm` : printSizes.find(s => s.id === selectedPrintSize)?.name}</p>
          <p>• <strong>Quantity:</strong> {quantity}</p>
          <div className="border-t border-blue-200 pt-2 mt-2">
            <p className="font-semibold">
              <strong>Total Print Cost:</strong> ${calculatePrintPrice().toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">File Requirements</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• <strong>Format:</strong> JPEG, PNG, TIFF, PDF</p>
          <p>• <strong>Resolution:</strong> Minimum 300 DPI for best quality</p>
          <p>• <strong>Color Space:</strong> RGB or CMYK</p>
          <p>• <strong>File Size:</strong> Maximum 50MB</p>
          <div className="mt-3">
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <Upload className="w-4 h-4" />
              <span>Upload Print File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintingOptions;
