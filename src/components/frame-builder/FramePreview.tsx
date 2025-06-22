import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Eye, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';
import { Frame, MatBoard, MatStyle, MatWidthType } from './types';

interface FramePreviewProps {
  uploadedImage: string | null;
  selectedFrame: Frame | null;
  selectedMatBoard: MatBoard | null;
  matStyle: MatStyle;
  matWidthType: MatWidthType;
  uniformWidth: string;
  customWidths: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  imageWidth: string;
  imageHeight: string;
}

interface CanvasState {
  zoom: number;
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
  lastMouseX: number;
  lastMouseY: number;
}

const FramePreview: React.FC<FramePreviewProps> = ({
  uploadedImage,
  selectedFrame,
  selectedMatBoard,
  matStyle,
  matWidthType,
  uniformWidth,
  customWidths,
  imageWidth,
  imageHeight
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  const [containerSize, setContainerSize] = useState({ width: 600, height: 600 });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Calculate frame dimensions
  const calculateFrameDimensions = useCallback(() => {
    const imgWidth = parseFloat(imageWidth) || 10.2;
    const imgHeight = parseFloat(imageHeight) || 15.3;
    
    // Calculate mat dimensions
    let matTop = 0, matBottom = 0, matLeft = 0, matRight = 0;
    
    if (matStyle !== '0' && selectedMatBoard) {
      if (matWidthType === 'uniform') {
        const width = parseFloat(uniformWidth) || 5;
        matTop = matBottom = matLeft = matRight = width;
      } else {
        matTop = parseFloat(customWidths.top) || 5;
        matBottom = parseFloat(customWidths.bottom) || 5;
        matLeft = parseFloat(customWidths.left) || 5;
        matRight = parseFloat(customWidths.right) || 5;
      }
    }

    // Frame width
    const frameWidth = selectedFrame ? selectedFrame.width : 2;

    // Calculate total dimensions
    const totalMatWidth = matLeft + matRight;
    const totalMatHeight = matTop + matBottom;
    const totalFrameWidth = frameWidth * 2;
    
    const outsideWidth = imgWidth + totalMatWidth + totalFrameWidth;
    const outsideHeight = imgHeight + totalMatHeight + totalFrameWidth;

    return {
      image: { width: imgWidth, height: imgHeight },
      outside: { width: outsideWidth, height: outsideHeight },
      mat: { top: matTop, bottom: matBottom, left: matLeft, right: matRight },
      frame: { width: frameWidth },
      aspectRatio: outsideWidth / outsideHeight
    };
  }, [imageWidth, imageHeight, matStyle, matWidthType, uniformWidth, customWidths, selectedFrame, selectedMatBoard]);

  // Update container size
  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      const parentElement = containerRef.current.parentElement;
      if (parentElement) {
        const parentRect = parentElement.getBoundingClientRect();
        // Account for padding (p-6 = 24px on each side)
        const availableWidth = parentRect.width - 48; // 24px * 2
        const maxSize = Math.min(availableWidth, 600);
        const size = Math.max(maxSize, 300); // Minimum size of 300px
        setContainerSize({ width: size, height: size });
      }
    }
  }, []);

  // Get frame color
  const getFrameColor = useCallback((color: string): string => {
    const colorMap: Record<string, string> = {
      'black': '#2d2d2d',
      'white': '#f8f8f8',
      'raw oak': '#d4a574',
      'gold': '#d4af37',
      'silver': '#c0c0c0'
    };
    return colorMap[color.toLowerCase()] || '#8b7355';
  }, []);

  // Main rendering function
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = containerSize.width;
    canvas.height = containerSize.height;

    // Clear canvas
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions
    const dimensions = calculateFrameDimensions();
    
    // Calculate scale to fit canvas with padding
    const padding = 40;
    const availableWidth = (canvas.width - padding * 2) * canvasState.zoom;
    const availableHeight = (canvas.height - padding * 2) * canvasState.zoom;
    
    const scaleX = availableWidth / dimensions.outside.width;
    const scaleY = availableHeight / dimensions.outside.height;
    const scale = Math.min(scaleX, scaleY);

    // Calculate display dimensions
    const displayWidth = dimensions.outside.width * scale;
    const displayHeight = dimensions.outside.height * scale;
    const frameDisplayWidth = dimensions.frame.width * scale;
    const matLeft = dimensions.mat.left * scale;
    const matRight = dimensions.mat.right * scale;
    const matTop = dimensions.mat.top * scale;
    const matBottom = dimensions.mat.bottom * scale;
    const imageDisplayWidth = dimensions.image.width * scale;
    const imageDisplayHeight = dimensions.image.height * scale;

    // Calculate positions (centered)
    const centerX = canvas.width / 2 + canvasState.offsetX;
    const centerY = canvas.height / 2 + canvasState.offsetY;
    
    const frameX = centerX - displayWidth / 2;
    const frameY = centerY - displayHeight / 2;
    const matX = frameX + frameDisplayWidth;
    const matY = frameY + frameDisplayWidth;
    const imageX = matX + matLeft;
    const imageY = matY + matTop;

    // Draw shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(frameX, frameY, displayWidth, displayHeight);
    ctx.restore();

    // Draw frame
    if (selectedFrame) {
      const frameColor = getFrameColor(selectedFrame.color);
      
      // Outer frame
      ctx.fillStyle = frameColor;
      ctx.fillRect(frameX, frameY, displayWidth, displayHeight);
      
      // Frame highlights and shadows for depth
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(frameX, frameY, displayWidth, frameDisplayWidth / 4); // Top highlight
      ctx.fillRect(frameX, frameY, frameDisplayWidth / 4, displayHeight); // Left highlight
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(frameX, frameY + displayHeight - frameDisplayWidth / 4, displayWidth, frameDisplayWidth / 4); // Bottom shadow
      ctx.fillRect(frameX + displayWidth - frameDisplayWidth / 4, frameY, frameDisplayWidth / 4, displayHeight); // Right shadow
    }

    // Draw mat
    if (matStyle !== '0' && selectedMatBoard) {
      const matColor = selectedMatBoard.color;
      const matDisplayWidth = imageDisplayWidth + matLeft + matRight;
      const matDisplayHeight = imageDisplayHeight + matTop + matBottom;
      
      // Mat background
      ctx.fillStyle = matColor;
      ctx.fillRect(matX, matY, matDisplayWidth, matDisplayHeight);
      
      // Mat bevel effect
      const bevelSize = 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillRect(imageX - bevelSize, imageY - bevelSize, imageDisplayWidth + bevelSize * 2, bevelSize); // Top bevel
      ctx.fillRect(imageX - bevelSize, imageY - bevelSize, bevelSize, imageDisplayHeight + bevelSize * 2); // Left bevel
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(imageX - bevelSize, imageY + imageDisplayHeight, imageDisplayWidth + bevelSize * 2, bevelSize); // Bottom bevel
      ctx.fillRect(imageX + imageDisplayWidth, imageY - bevelSize, bevelSize, imageDisplayHeight + bevelSize * 2); // Right bevel
    }

    // Draw image or placeholder
    if (uploadedImage && imageRef.current) {
      ctx.drawImage(imageRef.current, imageX, imageY, imageDisplayWidth, imageDisplayHeight);
      
      // Glass reflection effect
      const gradient = ctx.createLinearGradient(imageX, imageY, imageX + imageDisplayWidth, imageY + imageDisplayHeight);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(imageX, imageY, imageDisplayWidth, imageDisplayHeight);
    } else {
      // Placeholder
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(imageX, imageY, imageDisplayWidth, imageDisplayHeight);
      
      // Placeholder icon and text
      const iconSize = Math.min(imageDisplayWidth, imageDisplayHeight) * 0.2;
      const centerImageX = imageX + imageDisplayWidth / 2;
      const centerImageY = imageY + imageDisplayHeight / 2;
      
      // Draw layered squares
      ctx.fillStyle = '#4361ee';
      ctx.fillRect(centerImageX - iconSize * 0.6, centerImageY - iconSize * 0.6, iconSize, iconSize);
      
      ctx.fillStyle = '#7209b7';
      ctx.fillRect(centerImageX - iconSize * 0.2, centerImageY - iconSize * 0.2, iconSize, iconSize);
      
      // Text
      const fontSize = Math.max(Math.min(imageDisplayWidth * 0.05, 14), 10);
      ctx.fillStyle = '#4361ee';
      ctx.font = `${fontSize}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      
      const textY = centerImageY + iconSize * 1.2;
      ctx.fillText(`Image Size: ${dimensions.image.width.toFixed(1)} × ${dimensions.image.height.toFixed(1)} cm`, centerImageX, textY);
      ctx.fillText(`Outside: ${dimensions.outside.width.toFixed(1)} × ${dimensions.outside.height.toFixed(1)} cm`, centerImageX, textY + fontSize * 1.5);
    }

    // Loading overlay
    if (isLoading) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);
    }
  }, [
    containerSize,
    canvasState,
    calculateFrameDimensions,
    selectedFrame,
    selectedMatBoard,
    matStyle,
    uploadedImage,
    isLoading,
    getFrameColor
  ]);

  // Mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setCanvasState(prev => ({
      ...prev,
      isDragging: true,
      lastMouseX: e.clientX - rect.left,
      lastMouseY: e.clientY - rect.top
    }));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasState.isDragging) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const deltaX = mouseX - canvasState.lastMouseX;
    const deltaY = mouseY - canvasState.lastMouseY;

    setCanvasState(prev => ({
      ...prev,
      offsetX: prev.offsetX + deltaX,
      offsetY: prev.offsetY + deltaY,
      lastMouseX: mouseX,
      lastMouseY: mouseY
    }));
  }, [canvasState.isDragging, canvasState.lastMouseX, canvasState.lastMouseY]);

  const handleMouseUp = useCallback(() => {
    setCanvasState(prev => ({ ...prev, isDragging: false }));
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setCanvasState(prev => ({
      ...prev,
      isDragging: true,
      lastMouseX: touch.clientX - rect.left,
      lastMouseY: touch.clientY - rect.top
    }));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!canvasState.isDragging || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    const deltaX = touchX - canvasState.lastMouseX;
    const deltaY = touchY - canvasState.lastMouseY;

    setCanvasState(prev => ({
      ...prev,
      offsetX: prev.offsetX + deltaX,
      offsetY: prev.offsetY + deltaY,
      lastMouseX: touchX,
      lastMouseY: touchY
    }));
    
    // Prevent page scrolling while dragging
    e.preventDefault();
  }, [canvasState.isDragging, canvasState.lastMouseX, canvasState.lastMouseY]);

  const handleTouchEnd = useCallback(() => {
    setCanvasState(prev => ({ ...prev, isDragging: false }));
  }, []);

  // Control functions
  const zoomIn = () => setCanvasState(prev => ({ ...prev, zoom: Math.min(3, prev.zoom * 1.2) }));
  const zoomOut = () => setCanvasState(prev => ({ ...prev, zoom: Math.max(0.5, prev.zoom / 1.2) }));
  const resetView = () => setCanvasState({ zoom: 1, offsetX: 0, offsetY: 0, isDragging: false, lastMouseX: 0, lastMouseY: 0 });

  // Effects
  useEffect(() => {
    updateContainerSize();
    const handleResize = () => updateContainerSize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateContainerSize]);

  useEffect(() => {
    if (uploadedImage) {
      setIsLoading(true);
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
        imageRef.current = null;
      };
      img.src = uploadedImage;
    } else {
      imageRef.current = null;
    }
  }, [uploadedImage]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  const dimensions = calculateFrameDimensions();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Frame Preview</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {Math.round(canvasState.zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative max-w-full"
        style={{ height: containerSize.height, width: containerSize.width, margin: '0 auto' }}
      >
        <canvas
          ref={canvasRef}
          className="cursor-grab active:cursor-grabbing max-w-full max-h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'none' }} // Prevents touch gestures from interfering
        />
        
        {/* Drag indicator overlay */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1.5 shadow-sm">
          <Move className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      
      {/* Dimensions Display */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center justify-center gap-2 text-sm text-gray-600">
          <Eye className="w-4 h-4" />
          <span>Frame Preview</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
          <div>
            <span className="font-medium">Image:</span> {dimensions.image.width.toFixed(1)} × {dimensions.image.height.toFixed(1)} cm
          </div>
          <div>
            <span className="font-medium">Outside:</span> {dimensions.outside.width.toFixed(1)} × {dimensions.outside.height.toFixed(1)} cm
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Click and drag to pan • Use buttons above to zoom in/out
        </div>
      </div>
    </div>
  );
};

export default FramePreview;