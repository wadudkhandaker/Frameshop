import React, { useState, useMemo } from 'react';
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
  
  // Auto-select first frame for testing
  React.useEffect(() => {
    if (frames.length > 0 && !selectedFrame) {
      setSelectedFrame(frames[0]);
    }
  }, [frames, selectedFrame]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [sortBy, setSortBy] = useState('width-asc');
  const [hideUnsuitableFrames, setHideUnsuitableFrames] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('frames');
  
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
    const size = standardSizes.find(s => s.label === sizeLabel);
    if (size) {
      setImageWidth(size.width.toString());
      setImageHeight(size.height.toString());
      setSelectedStandardSize(sizeLabel);
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
        <div className="columns is-desktop">
          {/* Left Column - Canvas Preview */}
          <div id="product-preview" className="column sticky top-8">
            <div className="overlay-container" id="canvas-container">
              <div className="frame-engine__container" id="main-canvas">
                <div className="frame-engine__loading-anchor">
                  <FrameCanvas
                    width={parseFloat(imageWidth) || 0}
                    height={parseFloat(imageHeight) || 0}
                    units={units}
                    frame={selectedFrame}
                    image={uploadedImage}
                    matting={selectedMatBoard !== null}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Controls */}
          <div className="column is-half-desktop">
            {/* Mobile Tour Button */}
            <div className="flex justify-center mb-2 md:hidden">
              <button className="btn btn-warning btn-tour-init mobile-tour-button w-40">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Guide Me
              </button>
            </div>

            {/* Dimensions Section */}
            <section className="card dimensions mb-6" id="dimensions">
              <div className="columns is-desktop">
                <div id="dimensions-column" className="column">
                  <div className="dimensions__sizing">
                    {/* Upload Section */}
                    <div className="field is-grouped is-horizontal mb-4" style={{alignItems: 'center'}}>
                      <h4 className="field-label text-lg font-semibold">Printing (Optional)</h4>
                      <div id="uploads-column" className="field-body">
                        <ImageUploader
                          uploadedImage={uploadedImage}
                          setUploadedImage={setUploadedImage}
                          onImageProcessed={setProcessedImageData}
                        />
                      </div>
                    </div>

                    {/* Units Selection */}
                    <div className="field is-grouped is-horizontal mb-4" style={{alignItems: 'center'}}>
                      <h4 className="field-label text-lg font-semibold">Units</h4>
                      <div className="field-body">
                        <div className="field is-grouped" style={{alignItems: 'center'}}>
                          <label className="material-radio">
                            <input 
                              type="radio" 
                              value="cm" 
                              checked={units === 'cm'}
                              onChange={(e) => setUnits(e.target.value as Units)}
                            />
                            <span className="outer">
                              <span className="inner"></span>
                            </span>
                            <span className="material-radio__label">cm</span>
                          </label>
                          <label className="material-radio">
                            <input 
                              type="radio" 
                              value="inch" 
                              checked={units === 'inch'}
                              onChange={(e) => setUnits(e.target.value as Units)}
                            />
                            <span className="outer">
                              <span className="inner"></span>
                            </span>
                            <span className="material-radio__label">inch</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Image Size */}
                    <div className="field is-grouped is-horizontal dimensions__size mb-4" style={{alignItems: 'flex-start'}}>
                      <h4 className="field-label text-lg font-semibold">Image Size</h4>
                      <div className="field-body" style={{flexDirection: 'column'}}>
                        <div className="field is-grouped">
                          <div className="columns w-full">
                            <div className="column flex">
                              <div className="field">
                                <label className="label text-sm font-medium">WIDTH</label>
                                <div className="control">
                                  <input 
                                    type="number" 
                                    step="0.1" 
                                    min="1" 
                                    max="999.99"
                                    value={imageWidth}
                                    onChange={(e) => setImageWidth(e.target.value)}
                                    className="input"
                                  />
                                </div>
                              </div>
                              <span className="mid mx-2 self-end">×</span>
                              <div className="field">
                                <label className="label text-sm font-medium">HEIGHT</label>
                                <div className="control">
                                  <input 
                                    type="number" 
                                    step="0.1" 
                                    min="1" 
                                    max="999.99"
                                    value={imageHeight}
                                    onChange={(e) => setImageHeight(e.target.value)}
                                    className="input"
                                  />
                                </div>
                              </div>
                              <span className="mid ml-2 self-end">{units}</span>
                            </div>
                            <div className="column flex items-end">
                              <div className="select is-fullwidth">
                                <select 
                                  value={selectedStandardSize}
                                  onChange={(e) => handleStandardSizeSelect(e.target.value)}
                                  className="w-full"
                                >
                                  <option value="">Standard Sizes</option>
                                  {standardSizes && standardSizes.map((size) => (
                                    <option key={size.label} value={size.label}>
                                      {size.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="size-help text-sm text-gray-600 mb-2">
                          Min: 10 × 10 cm, Max: 101.5 × 152.5 cm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tab Picker */}
            <div className="tab-picker">
              <ul className="tab-list flex border-b border-gray-200">
                {[
                  { id: 'frames', label: 'Frames' },
                  { id: 'mats', label: 'Mats' },
                  { id: 'glass', label: 'Glass & Backing' },
                  { id: 'printing', label: 'Printing' },
                  { id: 'extras', label: 'Extras' }
                ].map((tab) => (
                  <li key={tab.id} className="tab-item">
                    <span 
                      className={`px-4 py-2 cursor-pointer transition-colors ${
                        activeTab === tab.id 
                          ? 'current-tab border-b-2 border-blue-500 text-blue-600 font-semibold' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={() => setActiveTab(tab.id as TabType)}
                    >
                      {tab.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="card tab-picker__body p-6">
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
            <div id="fs-checkout-box" className="card mt-6">
              <div className="column field is-grouped is-horizontal p-0" style={{flexDirection: 'column'}}>
                <div className="flex items-baseline mb-4">
                  <label id="quantity-label" htmlFor="bulk_option" className="pr-1">
                    Bulk Buy:
                  </label>
                  <div className="select ml-1">
                    <select 
                      name="bulk_option" 
                      id="bulk_option" 
                      value={bulkOption}
                      onChange={(e) => setBulkOption(e.target.value)}
                      className="w-full"
                    >
                      <option value="">Select a pack size</option>
                      <option value="10">Pack of 10 @ $15.12 each - Save 10%</option>
                      <option value="25">Pack of 25 @ $14.28 each - Save 15%</option>
                      <option value="50">Pack of 50 @ $13.44 each - Save 20%</option>
                      <option value="100">Pack of 100 @ $12.60 each - Save 25%</option>
                      <option value="200">Pack of 200 @ $11.76 each - Save 30%</option>
                    </select>
                  </div>
                </div>

                <div id="checkout-row" className="columns">
                  <div id="qty-price" className="column text-center">
                    <div id="quantity-container" className="mb-4">
                      <label id="quantity-label" htmlFor="product-quantity" className="mr-2">
                        Quantity:
                      </label>
                      <input 
                        type="number" 
                        id="product-quantity" 
                        step="1" 
                        min="1" 
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="text-center w-20 px-2 py-1 border rounded"
                      />
                    </div>
                    <div id="checkout-total" className="column">
                      <span id="label-total" className="text-lg">Total:</span>
                      <span id="total-quantity-price" className="text-3xl font-bold text-blue-600 ml-2">
                        ${((getTotalPrice() || 0) * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="column is-full-mobile is-one-third-tablet">
                    <div>
                      <button className="btn btn-success btn-lg btn-block w-full bg-green-600 text-white py-3 px-6 rounded font-semibold">
                        <i className="fa fa-shopping-cart mr-2"></i>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="dashed-break border-t border-dashed border-gray-300 my-4"></div>

                <div>
                  <div className="product-summary">
                    <p className="mb-4">
                      For more custom options. Please
                      <a href="/contact-us" className="text-blue-600 underline ml-1">contact us</a>
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
    </div>
  );
};

export default FrameBuilder;