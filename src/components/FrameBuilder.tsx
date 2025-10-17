import React, { useState, useMemo, useEffect } from 'react';
import { 
  Frame, 
  MatBoard, 
  TabType, 
  MatStyle, 
  ImageOverlap, 
  MatCategory, 
  MatWidthType, 
  Units 
} from './frame-builder/types';
import { standardSizes } from './frame-builder/data';
import FramesTab from './frame-builder/FramesTab';
import MatsTab from './frame-builder/MatsTab';
import ImageUploader from './frame-builder/ImageUploader';
import { FrameCanvas } from './frame-builder/FrameCanvas';
import { FrameCanvas3D } from './frame-builder/FrameCanvas3D';
import PricingEngine from './frame-builder/PricingEngine';
import MaterialOptions from './frame-builder/MaterialOptions';
import GlassOptions from './frame-builder/GlassOptions';
import PrintingOptions from './frame-builder/PrintingOptions';
import ExtrasOptions from './frame-builder/ExtrasOptions';
import { useFrames } from '../hooks/useFrames';

const FrameBuilder: React.FC = () => {
  // Fetch frames from Strapi
  const { frames: strapiFrames, loading: framesLoading } = useFrames();
  
  // Use frames directly from the hook (already in the correct format)
  const frames = useMemo(() => {
    if (!strapiFrames || !Array.isArray(strapiFrames)) {
      return [];
    }
    return strapiFrames;
  }, [strapiFrames]);

  // Frame selection states
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [sortBy, setSortBy] = useState('width-asc');
  const [hideUnsuitableFrames, setHideUnsuitableFrames] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('frames');
  
  // Auto-select first frame for testing
  React.useEffect(() => {
    if (frames.length > 0 && !selectedFrame) {
      setSelectedFrame(frames[0]);
    }
  }, [frames, selectedFrame]);

  // Auto-switch away from mats tab when 3D frame is selected
  useEffect(() => {
    const is3DFrame = selectedFrame?.material === '3D';
    const isFloatingFrame = selectedFrame?.material === 'Floating';
    if ((is3DFrame || isFloatingFrame) && activeTab === 'mats') {
      setActiveTab('frames');
    }
  }, [selectedFrame, activeTab]);

  // Image upload states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImageData, setProcessedImageData] = useState<{
    original: string;
    processed: string;
    width: number;
    height: number;
    aspectRatio: number;
  } | null>(null);
  
  // Dimensions states
  const [units, setUnits] = useState<Units>('cm');
  const [imageWidth, setImageWidth] = useState<string>('10.2');
  const [imageHeight, setImageHeight] = useState<string>('15.3');
  const [selectedStandardSize, setSelectedStandardSize] = useState<string>('');

  // Clear selected standard size when switching frame types
  useEffect(() => {
    // Only run when frame changes, not when size changes
    if (!selectedFrame) return;
    
    // Check if current selected size is valid for the selected frame type
    if (selectedStandardSize && selectedFrame?.material === '3D') {
      // For 3D frames, check if selected size is one of the allowed sizes
      const selectedSize = standardSizes.find(s => s.label === selectedStandardSize);
      const isValidFor3D = selectedSize && ['4x6', '11x14', '18x24'].includes(selectedSize.name);
      if (!isValidFor3D) {
        setSelectedStandardSize('');
      }
    } else if (selectedStandardSize && selectedFrame?.material !== '3D') {
      // If switching from 3D to regular frame, don't clear the selection
      // All sizes are valid for regular frames
    }
  }, [selectedFrame]); // Only depend on selectedFrame, not selectedStandardSize
  
  // Mat states
  const [matStyle, setMatStyle] = useState<MatStyle>('1');
  const [imageOverlap, setImageOverlap] = useState<ImageOverlap>('PHOTO');
  const [vGroove, setVGroove] = useState(false);
  const [activeMatCategory, setActiveMatCategory] = useState<MatCategory>('white-core');
  const [selectedMatBoard, setSelectedMatBoard] = useState<MatBoard | null>(null);
  const [matWidthType, setMatWidthType] = useState<MatWidthType>('uniform');
  const [uniformWidth, setUniformWidth] = useState<string>('5');
  const [customWidths, setCustomWidths] = useState({
    top: '5',
    bottom: '5',
    left: '5',
    right: '5'
  });
  
  // Bottom mat states (for double mat)
  const [bottomActiveMatCategory, setBottomActiveMatCategory] = useState<MatCategory>('white-core');
  const [bottomSelectedMatBoard, setBottomSelectedMatBoard] = useState<MatBoard | null>(null);
  const [bottomUniformWidth, setBottomUniformWidth] = useState<string>('2');
  
  // Glass and Backing states
  const [selectedGlass, setSelectedGlass] = useState<string>('clear');
  const [selectedBacking, setSelectedBacking] = useState<string>('standard');
  
  // Printing states
  const [selectedPrintOption, setSelectedPrintOption] = useState<string>('standard');
  const [selectedPrintSize, setSelectedPrintSize] = useState<string>('8x10');
  const [printCustomWidth, setPrintCustomWidth] = useState<string>('');
  const [printCustomHeight, setPrintCustomHeight] = useState<string>('');
  const [printQuantity, setPrintQuantity] = useState<number>(1);
  
  // Extras states
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  // Checkout states
  const [quantity, setQuantity] = useState<number>(1);
  const [bulkOption, setBulkOption] = useState<string>('');

  const handleStandardSizeSelect = (sizeLabel: string) => {
    setSelectedStandardSize(sizeLabel); // Always set the selected value first
    const size = standardSizes.find(s => s.label === sizeLabel);
    if (size) {
      setImageWidth(size.width.toString());
      setImageHeight(size.height.toString());
    }
  };

  // Calculate total price for checkout
  const getTotalPrice = () => {
    if (!selectedFrame) return 0;
    
    const width = parseFloat(imageWidth) || 0;
    const height = parseFloat(imageHeight) || 0;
    const matWidth = matWidthType === 'uniform' 
      ? parseFloat(uniformWidth) || 0
      : Math.max(
          parseFloat(customWidths.top) || 0,
          parseFloat(customWidths.bottom) || 0,
          parseFloat(customWidths.left) || 0,
          parseFloat(customWidths.right) || 0
        );

    const frameWidth = width + (matWidth * 2);
    const frameHeight = height + (matWidth * 2);
    const framePerimeter = (frameWidth + frameHeight) * 2;
    
    const frameTotal = (framePerimeter / 100) * selectedFrame.priceRate;
    const glassTotal = (frameWidth * frameHeight) * 0.03;
    const backingTotal = (frameWidth * frameHeight) * 0.01;
    const labor = 25;
    
    return frameTotal + glassTotal + backingTotal + labor;
  };

  return (
    <div id="custom-framing-wrapper" className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="fs-page-title text-3xl font-bold text-blue-900 mb-2">Custom Picture Frames Online</h1>
          <h3 className="text-lg text-gray-600 text-center">
            Standard and Custom sized picture frames, designed by you.
          </h3>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Canvas Preview */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              {/* Conditional rendering: 3D Canvas for 3D frames, regular Canvas for others */}
              {selectedFrame?.material === '3D' ? (
                <FrameCanvas3D
                  key={`3d-${imageWidth}-${imageHeight}-${selectedFrame?.id}`}
                  width={parseFloat(imageWidth) || 0}
                  height={parseFloat(imageHeight) || 0}
                  units={units}
                  frame={selectedFrame}
                  image={uploadedImage}
                  className="w-full"
                />
              ) : (
                <FrameCanvas
                  width={parseFloat(imageWidth) || 0}
                  height={parseFloat(imageHeight) || 0}
                  units={units}
                  frame={selectedFrame}
                  image={uploadedImage}
                  matting={selectedMatBoard !== null}
                selectedMatBoard={selectedMatBoard}
                  matWidth={matWidthType === 'uniform' 
                    ? parseFloat(uniformWidth) || 0
                    : Math.max(
                        parseFloat(customWidths.top) || 0,
                        parseFloat(customWidths.bottom) || 0,
                        parseFloat(customWidths.left) || 0,
                        parseFloat(customWidths.right) || 0
                      )
                  }
                matWidthType={matWidthType}
                customWidths={customWidths}
                  matStyle={matStyle}
                  bottomSelectedMatBoard={bottomSelectedMatBoard}
                  bottomMatWidth={parseFloat(bottomUniformWidth) || 2}
                  vGroove={vGroove}
                  className="w-full"
                />
              )}
            </div>
          </div>

          {/* Right Column - Controls */}
          <div className="order-1 lg:order-2">
            {/* Mobile Tour Button */}
            <div className="flex justify-center mb-2 md:hidden">
              <button className="btn btn-warning btn-tour-init mobile-tour-button w-40">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Guide Me
              </button>
            </div>

            {/* Dimensions Section */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-6">
                {/* Upload Section */}
                <div className="flex items-center space-x-4">
                  <h4 className="text-lg font-semibold text-gray-800 whitespace-nowrap">Printing (Optional)</h4>
                  <ImageUploader
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
                    onImageProcessed={setProcessedImageData}
                  />
                </div>

                {/* Units Selection */}
                <div className="flex items-center space-x-4">
                  <h4 className="text-lg font-semibold text-gray-800 whitespace-nowrap">Units</h4>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        value="cm" 
                        checked={units === 'cm'}
                        onChange={(e) => setUnits(e.target.value as Units)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">cm</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        value="inch" 
                        checked={units === 'inch'}
                        onChange={(e) => setUnits(e.target.value as Units)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">inch</span>
                    </label>
                  </div>
                </div>

                {/* Image Size */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Image Size</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">WIDTH</label>
                        <input 
                          type="number" 
                          step="0.1" 
                          min="1" 
                          max="999.99"
                          value={imageWidth}
                          onChange={(e) => setImageWidth(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <span className="text-gray-500 mb-2">×</span>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">HEIGHT</label>
                        <input 
                          type="number" 
                          step="0.1" 
                          min="1" 
                          max="999.99"
                          value={imageHeight}
                          onChange={(e) => setImageHeight(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <span className="text-sm text-gray-500 mb-2">{units}</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Standard Sizes</label>
                      <select 
                        value={selectedStandardSize}
                        onChange={(e) => handleStandardSizeSelect(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select standard size</option>
                        {(() => {
                          // Filter standard sizes based on frame type
                          let filteredSizes = standardSizes;
                          
                          if (selectedFrame?.material === '3D') {
                            // For 3D frames, only show 3 specific sizes
                            filteredSizes = standardSizes.filter(size => 
                              size.name === '4x6' || 
                              size.name === '11x14' || 
                              size.name === '18x24'
                            );
                          }
                          
                          return filteredSizes.map((size) => (
                            <option key={size.label} value={size.label}>
                              {size.label}
                            </option>
                          ));
                        })()}
                      </select>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Min: 10 × 10 cm, Max: 101.5 × 152.5 cm
                  </div>
                </div>
              </div>
            </section>

            {/* Tab Picker */}
            <div className="bg-white rounded-lg shadow-sm">
              <ul className="flex border-b border-gray-200">
                  {[
                    { id: 'frames', label: 'Frames' },
                    { id: 'mats', label: 'Mats' },
                    { id: 'glass', label: 'Glass & Backing' },
                    { id: 'printing', label: 'Printing' },
                    { id: 'extras', label: 'Extras' }
                  ].map((tab) => {
                    const is3DFrame = selectedFrame?.material === '3D';
                    const isFloatingFrame = selectedFrame?.material === 'Floating';
                    const isDisabled = tab.id === 'mats' && (is3DFrame || isFloatingFrame);
                    
                    return (
                      <li key={tab.id} className="flex-1">
                        <button
                          className={`w-full px-4 py-3 text-sm font-medium transition-colors ${
                            activeTab === tab.id 
                              ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' 
                              : isDisabled
                              ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                          onClick={() => !isDisabled && setActiveTab(tab.id as TabType)}
                          disabled={isDisabled}
                        >
                          {tab.label}
                        </button>
                      </li>
                    );
                  })}
              </ul>

              <div className="p-6">
                {activeTab === 'frames' && (
                  <FramesTab
                    selectedFrame={selectedFrame}
                    setSelectedFrame={setSelectedFrame}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    hideUnsuitableFrames={hideUnsuitableFrames}
                    setHideUnsuitableFrames={setHideUnsuitableFrames}
                    frames={frames}
                  />
                )}

                {activeTab === 'mats' && (
                  <MatsTab
                    matStyle={matStyle}
                    setMatStyle={setMatStyle}
                    imageOverlap={imageOverlap}
                    setImageOverlap={setImageOverlap}
                    vGroove={vGroove}
                    setVGroove={setVGroove}
                    is3DFrame={selectedFrame?.material === '3D'}
                    isFloatingFrame={selectedFrame?.material === 'Floating'}
                    activeMatCategory={activeMatCategory}
                    setActiveMatCategory={setActiveMatCategory}
                    selectedMatBoard={selectedMatBoard}
                    setSelectedMatBoard={setSelectedMatBoard}
                    matWidthType={matWidthType}
                    setMatWidthType={setMatWidthType}
                    uniformWidth={uniformWidth}
                    setUniformWidth={setUniformWidth}
                    customWidths={customWidths}
                    setCustomWidths={setCustomWidths}
                    bottomActiveMatCategory={bottomActiveMatCategory}
                    setBottomActiveMatCategory={setBottomActiveMatCategory}
                    bottomSelectedMatBoard={bottomSelectedMatBoard}
                    setBottomSelectedMatBoard={setBottomSelectedMatBoard}
                    bottomUniformWidth={bottomUniformWidth}
                    setBottomUniformWidth={setBottomUniformWidth}
                  />
                )}

                {activeTab === 'glass' && (
                  <GlassOptions
                    selectedGlass={selectedGlass}
                    setSelectedGlass={setSelectedGlass}
                    selectedBacking={selectedBacking}
                    setSelectedBacking={setSelectedBacking}
                  />
                )}

                {activeTab === 'printing' && (
                  <PrintingOptions
                    selectedPrintOption={selectedPrintOption}
                    setSelectedPrintOption={setSelectedPrintOption}
                    selectedPrintSize={selectedPrintSize}
                    setSelectedPrintSize={setSelectedPrintSize}
                    customWidth={printCustomWidth}
                    setCustomWidth={setPrintCustomWidth}
                    customHeight={printCustomHeight}
                    setCustomHeight={setPrintCustomHeight}
                    quantity={printQuantity}
                    setQuantity={setPrintQuantity}
                  />
                )}

                {activeTab === 'extras' && (
                  <ExtrasOptions
                    selectedExtras={selectedExtras}
                    setSelectedExtras={setSelectedExtras}
                  />
                )}
              </div>
            </div>

            {/* Checkout Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <div className="space-y-4">
                {/* Bulk Buy */}
                <div className="flex items-center space-x-3">
                  <label htmlFor="bulk_option" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Bulk Buy:
                  </label>
                  <select 
                    name="bulk_option" 
                    id="bulk_option" 
                    value={bulkOption}
                    onChange={(e) => setBulkOption(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a pack size</option>
                    <option value="10">Pack of 10 @ $15.12 each - Save 10%</option>
                    <option value="25">Pack of 25 @ $14.28 each - Save 15%</option>
                    <option value="50">Pack of 50 @ $13.44 each - Save 20%</option>
                    <option value="100">Pack of 100 @ $12.60 each - Save 25%</option>
                    <option value="200">Pack of 200 @ $11.76 each - Save 30%</option>
                  </select>
                </div>

                {/* Quantity and Total Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <label htmlFor="product-quantity" className="text-sm font-medium text-gray-700">
                      Quantity:
                    </label>
                    <input 
                      type="number" 
                      id="product-quantity" 
                      step="1" 
                      min="1" 
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium text-gray-700">Total:</span>
                    <span className="text-3xl font-bold text-blue-600">
                      ${((getTotalPrice() || 0) * quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold flex items-center space-x-2 transition-colors">
                    <i className="fa fa-shopping-cart"></i>
                    <span>Add to cart</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-gray-300 my-4"></div>

                {/* Product Summary */}
                <div>
                  <p className="text-center text-gray-600 mb-4">
                    For more custom options. Please{' '}
                    <a href="/contact-us" className="text-blue-600 underline hover:text-blue-800">
                      contact us
                    </a>
                  </p>
                  
                  <PricingEngine
              selectedFrame={selectedFrame}
              selectedMatBoard={selectedMatBoard}
                    matStyle={matStyle}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
                    uniformWidth={uniformWidth}
                    customWidths={customWidths}
                    matWidthType={matWidthType}
                    quantity={quantity}
                    selectedGlass={selectedGlass}
                    selectedBacking={selectedBacking}
                    selectedExtras={selectedExtras}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameBuilder;