import React, { useState } from 'react';
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
import DimensionsSection from './frame-builder/DimensionsSection';
import FramePreview from './frame-builder/FramePreview';
import FramesTab from './frame-builder/FramesTab';
import MatsTab from './frame-builder/MatsTab';
import CheckoutSection from './frame-builder/CheckoutSection';

const FrameBuilder: React.FC = () => {
  // Frame selection states
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [sortBy, setSortBy] = useState('width-asc');
  const [hideUnsuitableFrames, setHideUnsuitableFrames] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('frames');
  
  // Image upload states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Picture Frames Online</h1>
          <h3 className="text-lg text-gray-600">
            Standard and Custom sized picture frames, designed by you.
          </h3>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Preview */}
          <div className="space-y-6">
            <FramePreview
              uploadedImage={uploadedImage}
              selectedFrame={selectedFrame}
              selectedMatBoard={selectedMatBoard}
              matStyle={matStyle}
              matWidthType={matWidthType}
              uniformWidth={uniformWidth}
              customWidths={customWidths}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
            />
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            <DimensionsSection
              units={units}
              setUnits={setUnits}
              imageWidth={imageWidth}
              setImageWidth={setImageWidth}
              imageHeight={imageHeight}
              setImageHeight={setImageHeight}
              selectedStandardSize={selectedStandardSize}
              setSelectedStandardSize={setSelectedStandardSize}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
              onStandardSizeSelect={handleStandardSizeSelect}
            />

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'frames', label: 'Frames' },
                    { id: 'mats', label: 'Mats' },
                    { id: 'glass', label: 'Glass & Backing' },
                    { id: 'printing', label: 'Printing' },
                    { id: 'extras', label: 'Extras' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-amber-500 text-amber-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

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
                  <div className="text-center py-8 text-gray-500">
                    Glass & Backing options will be displayed here
                  </div>
                )}

                {activeTab === 'printing' && (
                  <div className="text-center py-8 text-gray-500">
                    Printing options will be displayed here
                  </div>
                )}

                {activeTab === 'extras' && (
                  <div className="text-center py-8 text-gray-500">
                    Extra options will be displayed here
                  </div>
                )}
              </div>
            </div>

            <CheckoutSection
              selectedFrame={selectedFrame}
              selectedMatBoard={selectedMatBoard}
              quantity={quantity}
              setQuantity={setQuantity}
              bulkOption={bulkOption}
              setBulkOption={setBulkOption}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameBuilder;