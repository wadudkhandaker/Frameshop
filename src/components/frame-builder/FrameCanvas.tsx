import React, { useRef, useEffect } from 'react';
import { Frame, MatBoard } from './types';

interface FrameCanvasProps {
  width: number;
  height: number;
  units: 'cm' | 'inch';
  frame: Frame | null;
  image: string | null;
  matting: boolean;
  selectedMatBoard: MatBoard | null;
  matWidth: number;
  matStyle: '0' | '1' | '2'; // None, Single, Double
  className?: string;
}

export const FrameCanvas: React.FC<FrameCanvasProps> = ({
  width,
  height,
  units,
  frame,
  image,
  matting,
  selectedMatBoard,
  matWidth,
  matStyle,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match frameshop.com.au
    const canvasWidth = 600;
    const canvasHeight = 800;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!frame) return;

    // Calculate frame dimensions based on image size
    const imageWidth = Number(width) || 0;
    const imageHeight = Number(height) || 0;
    const frameWidth = frame.width * 50; // Convert cm to pixels (50px per cm for much bigger borders)
    
    // Calculate display size (maintain aspect ratio, fit in canvas)
    const maxDisplayWidth = canvasWidth * 0.7;
    const maxDisplayHeight = canvasHeight * 0.7;
    const aspectRatio = imageWidth / imageHeight;
    
    let displayWidth, displayHeight;
    if (aspectRatio > maxDisplayWidth / maxDisplayHeight) {
      displayWidth = maxDisplayWidth;
      displayHeight = displayWidth / aspectRatio;
    } else {
      displayHeight = maxDisplayHeight;
      displayWidth = displayHeight * aspectRatio;
    }

    // Center the frame
    const frameX = (canvasWidth - displayWidth - frameWidth * 2) / 2;
    const frameY = (canvasHeight - displayHeight - frameWidth * 2) / 2;
    const totalFrameWidth = displayWidth + frameWidth * 2;
    const totalFrameHeight = displayHeight + frameWidth * 2;

    // Draw shadow first
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 12;
    
    // Shadow rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(frameX, frameY, totalFrameWidth, totalFrameHeight);
    ctx.restore();

    // Draw frame
    drawFrame(ctx, frameX, frameY, totalFrameWidth, totalFrameHeight, frameWidth, frame);

    // Draw image area
    const imageX = frameX + frameWidth;
    const imageY = frameY + frameWidth;

    // Draw inner shadow based on frame material
    if (frame.material === 'Wood') {
      drawWoodGradientInnerShadow(ctx, imageX, imageY, displayWidth, displayHeight);
    } else {
      drawStandardInnerShadow(ctx, imageX, imageY, displayWidth, displayHeight);
    }

    // Draw mat board based on mat style (draw this first, before picture box)
    if (matStyle !== '0' && selectedMatBoard) {
      drawMatBoard(ctx, frameX, frameY, totalFrameWidth, totalFrameHeight, frameWidth, matWidth, selectedMatBoard, matStyle);
    }

    // Calculate picture box coordinates (same for both image and no-image cases)
    let pictureBoxX = imageX;
    let pictureBoxY = imageY;
    let pictureBoxWidth = displayWidth;
    let pictureBoxHeight = displayHeight;
    
    if (matStyle === '1' && selectedMatBoard) {
      // Single mat - fixed mat area size
      const matPadding = 60; // Fixed pixel size for consistent mat area
      pictureBoxX = imageX + matPadding;
      pictureBoxY = imageY + matPadding;
      pictureBoxWidth = displayWidth - (matPadding * 2);
      pictureBoxHeight = displayHeight - (matPadding * 2);
    } else if (matStyle === '2' && selectedMatBoard) {
      // Double mat - same mat area size as single mat
      const matPadding = 60; // Same fixed pixel size as single mat
      pictureBoxX = imageX + matPadding;
      pictureBoxY = imageY + matPadding;
      pictureBoxWidth = displayWidth - (matPadding * 2);
      pictureBoxHeight = displayHeight - (matPadding * 2);
    }

    // Draw white background for picture box (always)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(pictureBoxX, pictureBoxY, pictureBoxWidth, pictureBoxHeight);

    // Draw white border around picture box
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(pictureBoxX, pictureBoxY, pictureBoxWidth, pictureBoxHeight);

    if (image) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.rect(pictureBoxX, pictureBoxY, pictureBoxWidth, pictureBoxHeight);
        ctx.clip();
        
        // Calculate image scaling to fit in the picture box
        const imgAspect = img.width / img.height;
        const areaAspect = pictureBoxWidth / pictureBoxHeight;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgAspect > areaAspect) {
          drawHeight = pictureBoxHeight;
          drawWidth = drawHeight * imgAspect;
          drawX = pictureBoxX - (drawWidth - pictureBoxWidth) / 2;
          drawY = pictureBoxY;
        } else {
          drawWidth = pictureBoxWidth;
          drawHeight = drawWidth / imgAspect;
          drawX = pictureBoxX;
          drawY = pictureBoxY - (drawHeight - pictureBoxHeight) / 2;
        }
        
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
      };
      img.src = image;
    }
    
    // Draw inner shadow over the picture box based on material
    ctx.save();
    if (frame.material === 'Wood') {
      drawWoodGradientInnerShadow(ctx, pictureBoxX, pictureBoxY, pictureBoxWidth, pictureBoxHeight);
    } else {
      drawStandardInnerShadow(ctx, pictureBoxX, pictureBoxY, pictureBoxWidth, pictureBoxHeight);
    }
    ctx.restore();

    // Draw size information like frameshop.com.au
    drawSizeInfo(ctx, imageX, imageY, displayWidth, displayHeight, width, height, units, frame);

  }, [width, height, units, frame, image, matting, selectedMatBoard, matWidth, matStyle]);

  const drawWoodGradientInnerShadow = (
    ctx: CanvasRenderingContext2D,
    imageX: number,
    imageY: number,
    displayWidth: number,
    displayHeight: number
  ) => {
    ctx.save();
    
    // First layer: 2px deep shadow (darkest)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    
    // Draw 2px deep shadow on all sides
    ctx.fillRect(imageX, imageY, displayWidth, 2); // Top
    ctx.fillRect(imageX, imageY, 2, displayHeight); // Left
    ctx.fillRect(imageX, imageY + displayHeight - 2, displayWidth, 2); // Bottom
    ctx.fillRect(imageX + displayWidth - 2, imageY, 2, displayHeight); // Right
    
    // Second layer: 3px medium shadow with gradient effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    
    // Draw 3px medium shadow (overlapping the 2px shadow)
    ctx.fillRect(imageX, imageY, displayWidth, 3); // Top
    ctx.fillRect(imageX, imageY, 3, displayHeight); // Left
    ctx.fillRect(imageX, imageY + displayHeight - 3, displayWidth, 3); // Bottom
    ctx.fillRect(imageX + displayWidth - 3, imageY, 3, displayHeight); // Right
    
    // Third layer: Light blur shadow for smooth transition
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 16;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    
    // Draw light blur shadow for gradient effect
    ctx.fillRect(imageX, imageY, displayWidth, 4); // Top
    ctx.fillRect(imageX, imageY, 4, displayHeight); // Left
    ctx.fillRect(imageX, imageY + displayHeight - 4, displayWidth, 4); // Bottom
    ctx.fillRect(imageX + displayWidth - 4, imageY, 4, displayHeight); // Right
    
    ctx.restore();
  };

  const drawStandardInnerShadow = (
    ctx: CanvasRenderingContext2D,
    imageX: number,
    imageY: number,
    displayWidth: number,
    displayHeight: number
  ) => {
    ctx.save();
    
    // Simple 2px shadow for non-wood materials
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    
    // Draw 2px shadow on all sides
    ctx.fillRect(imageX, imageY, displayWidth, 2); // Top
    ctx.fillRect(imageX, imageY, 2, displayHeight); // Left
    ctx.fillRect(imageX, imageY + displayHeight - 2, displayWidth, 2); // Bottom
    ctx.fillRect(imageX + displayWidth - 2, imageY, 2, displayHeight); // Right
    
    ctx.restore();
  };

const drawMatBoard = (
  ctx: CanvasRenderingContext2D,
  frameX: number,
  frameY: number,
  totalFrameWidth: number,
  totalFrameHeight: number,
  frameWidth: number,
  matWidth: number,
  matBoard: MatBoard,
  matStyle: '0' | '1' | '2'
) => {
  // Calculate mat board dimensions - use fixed size for consistent mat area
  const matWidthPixels = 60; // Fixed pixel size for consistent mat area
  const matX = frameX + frameWidth;
  const matY = frameY + frameWidth;
  const matW = totalFrameWidth - (frameWidth * 2);
  const matH = totalFrameHeight - (frameWidth * 2);

  if (matStyle === '1') {
    // Single mat - draw one mat layer
    drawSingleMat(ctx, matX, matY, matW, matH, matWidthPixels, matBoard);
  } else if (matStyle === '2') {
    // Double mat - draw two mat layers with different colors
    drawDoubleMat(ctx, matX, matY, matW, matH, matWidthPixels, matBoard);
  }
};

const drawSingleMat = (
  ctx: CanvasRenderingContext2D,
  matX: number,
  matY: number,
  matW: number,
  matH: number,
  matWidthPixels: number,
  matBoard: MatBoard
) => {
  // Draw single mat: white border (bigger) + mat area with top mat color
  const pictureBoxX = matX + matWidthPixels;
  const pictureBoxY = matY + matWidthPixels;
  const pictureBoxW = matW - (matWidthPixels * 2);
  const pictureBoxH = matH - (matWidthPixels * 2);
  
  // 1. Fill mat area with top mat color
  ctx.fillStyle = matBoard.color;
  ctx.fillRect(matX, matY, matW, matH);
  
  // 2. Draw white border around the picture box (4px wide)
  ctx.fillStyle = '#ffffff'; // White border
  const borderWidth = 4; // 4px wide border
  
  // Top white border around picture box
  ctx.fillRect(pictureBoxX - borderWidth, pictureBoxY - borderWidth, pictureBoxW + (borderWidth * 2), borderWidth);
  // Bottom white border around picture box
  ctx.fillRect(pictureBoxX - borderWidth, pictureBoxY + pictureBoxH, pictureBoxW + (borderWidth * 2), borderWidth);
  // Left white border around picture box
  ctx.fillRect(pictureBoxX - borderWidth, pictureBoxY - borderWidth, borderWidth, pictureBoxH + (borderWidth * 2));
  // Right white border around picture box
  ctx.fillRect(pictureBoxX + pictureBoxW, pictureBoxY - borderWidth, borderWidth, pictureBoxH + (borderWidth * 2));
  
  // 3. Add inner shadow effect on the white border around picture box
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // More prominent shadow for 4px border
  
  // Inner shadow on the inside edges of the white border around picture box
  // Top inner shadow
  ctx.fillRect(pictureBoxX, pictureBoxY, pictureBoxW, 3);
  // Bottom inner shadow
  ctx.fillRect(pictureBoxX, pictureBoxY + pictureBoxH - 3, pictureBoxW, 3);
  // Left inner shadow
  ctx.fillRect(pictureBoxX, pictureBoxY, 3, pictureBoxH);
  // Right inner shadow
  ctx.fillRect(pictureBoxX + pictureBoxW - 3, pictureBoxY, 3, pictureBoxH);
  
  ctx.restore();
};

const drawDoubleMat = (
  ctx: CanvasRenderingContext2D,
  matX: number,
  matY: number,
  matW: number,
  matH: number,
  matWidthPixels: number,
  matBoard: MatBoard
) => {
  // Double mat: same mat area with top mat color + border with bottom mat color
  const pictureBoxX = matX + matWidthPixels;
  const pictureBoxY = matY + matWidthPixels;
  const pictureBoxW = matW - (matWidthPixels * 2);
  const pictureBoxH = matH - (matWidthPixels * 2);
  
  // 1. Fill mat area with top mat color (same as single mat)
  ctx.fillStyle = matBoard.color;
  ctx.fillRect(matX, matY, matW, matH);
  
  // 2. Draw border with bottom mat color (2px bigger than mat area)
  const bottomMatColor = adjustMatColor(matBoard.color, -30);
  ctx.fillStyle = bottomMatColor;
  const borderWidth = matWidthPixels + 2; // 2px bigger
  
  // Top border with bottom mat color
  ctx.fillRect(matX - 2, matY - 2, matW + 4, borderWidth);
  // Bottom border with bottom mat color
  ctx.fillRect(matX - 2, matY + matH - borderWidth + 2, matW + 4, borderWidth);
  // Left border with bottom mat color
  ctx.fillRect(matX - 2, matY - 2, borderWidth, matH + 4);
  // Right border with bottom mat color
  ctx.fillRect(matX + matW - borderWidth + 2, matY - 2, borderWidth, matH + 4);
};

const adjustMatColor = (color: string, amount: number): string => {
  // Simple color adjustment for double mat effect
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const drawWoodenFrame = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  thickness: number,
  baseColor: string,
  colour: string
) => {
  // Create wood grain gradient
  const woodGradient = ctx.createLinearGradient(x, y, x + w, y);
  const lightWood = adjustColor(baseColor, 25);
  const mediumWood = baseColor;
  const darkWood = adjustColor(baseColor, -20);
  
  woodGradient.addColorStop(0, lightWood);
  woodGradient.addColorStop(0.3, mediumWood);
  woodGradient.addColorStop(0.6, darkWood);
  woodGradient.addColorStop(0.8, mediumWood);
  woodGradient.addColorStop(1, lightWood);
  
  ctx.fillStyle = woodGradient;
  ctx.fillRect(x, y, w, h);
  
  // Add wood grain texture
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  
  // Draw vertical wood grain lines
  ctx.strokeStyle = adjustColor(baseColor, -35);
  ctx.lineWidth = 0.8;
  ctx.globalAlpha = 0.6;
  
  for (let i = 0; i < w / 3; i += 2) {
    const grainX = x + i;
    const variation = Math.sin(i * 0.1) * 2;
    ctx.beginPath();
    ctx.moveTo(grainX, y);
    ctx.quadraticCurveTo(grainX + variation, y + h / 2, grainX, y + h);
    ctx.stroke();
  }
  
  // Draw horizontal wood rings
  ctx.strokeStyle = adjustColor(baseColor, -25);
  ctx.lineWidth = 1.2;
  ctx.globalAlpha = 0.4;
  
  for (let i = 0; i < h / 8; i++) {
    const ringY = y + (i * 8) + Math.random() * 3;
    const curve = Math.sin(i * 0.5) * 10;
    ctx.beginPath();
    ctx.moveTo(x, ringY);
    ctx.quadraticCurveTo(x + w / 2 + curve, ringY + 2, x + w, ringY);
    ctx.stroke();
  }
  
  // Add wood knots and imperfections
  ctx.fillStyle = adjustColor(baseColor, -40);
  ctx.globalAlpha = 0.3;
  
  // Add random knots
  for (let i = 0; i < 2; i++) {
    const knotX = x + (w * (0.2 + i * 0.3)) + (Math.random() - 0.5) * 15;
    const knotY = y + (h * (0.3 + i * 0.2)) + (Math.random() - 0.5) * 15;
    const knotSize = 2 + Math.random() * 3;
    ctx.beginPath();
    ctx.ellipse(knotX, knotY, knotSize, knotSize * 0.7, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
};

const drawFrame = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  thickness: number,
  frame: Frame
) => {
  // Get frame colors for gradient
  const baseColor = getFrameColor(frame);
  
  // Draw frame based on material
  if (frame.material === 'Wood') {
    // Draw wooden frame with texture
    drawWoodenFrame(ctx, x, y, w, h, thickness, baseColor, frame.color);
  } else {
    // Draw standard frame with solid color
    ctx.fillStyle = baseColor;
    ctx.fillRect(x, y, w, h);
  }
  
  // Draw inner cutout
  ctx.clearRect(x + thickness, y + thickness, w - thickness * 2, h - thickness * 2);
  
  // Draw corner lines
  drawCornerLines(ctx, x, y, w, h, thickness, baseColor);
};

  const getFrameColor = (frame: Frame): string => {
    const colorMap: { [key: string]: string } = {
      'Black': '#2c2c2c',
      'White': '#f8f8f8',
      'Raw Oak': '#d4a574',
      'Black Grain': '#3c3c3c',
      'White Grain': '#f0f0f0',
      'Silver': '#c0c0c0',
      'Gold': '#daa520',
      'Antique Gold': '#b8860b',
      'Red': '#dc2626',
      'Blue': '#2563eb',
      'Green': '#16a34a',
    };

    return colorMap[frame.color] || '#d4a574';
  };

  const drawCornerLines = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    thickness: number,
    baseColor: string
  ) => {
    // Draw just 4 corner lines - one in each corner
    const imageX = x + thickness;
    const imageY = y + thickness;
    const imageW = w - thickness * 2;
    const imageH = h - thickness * 2;
    
    ctx.strokeStyle = adjustColor(baseColor, -30);
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;
    
    // Top-left corner lines
    ctx.beginPath();
    ctx.moveTo(imageX, imageY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Top-right corner lines
    ctx.beginPath();
    ctx.moveTo(imageX + imageW, imageY);
    ctx.lineTo(x + w, y);
    ctx.stroke();
    
    // Bottom-left corner lines
    ctx.beginPath();
    ctx.moveTo(imageX, imageY + imageH);
    ctx.lineTo(x, y + h);
    ctx.stroke();
    
    // Bottom-right corner lines
    ctx.beginPath();
    ctx.moveTo(imageX + imageW, imageY + imageH);
    ctx.lineTo(x + w, y + h);
    ctx.stroke();
    
    ctx.globalAlpha = 1;
  };

  const drawSizeInfo = (
    ctx: CanvasRenderingContext2D,
    imageX: number,
    imageY: number,
    displayWidth: number,
    displayHeight: number,
    width: number,
    height: number,
    units: string,
    frame: Frame
  ) => {
    // Ensure width and height are numbers
    const numWidth = Number(width) || 0;
    const numHeight = Number(height) || 0;
    
    // Calculate sizes like frameshop.com.au
    const imageSize = `${numWidth} x ${numHeight} ${units}`;
    const rebateSize = frame.rebate * 2;
    const visibleWidth = numWidth - rebateSize;
    const visibleHeight = numHeight - rebateSize;
    const visibleSize = `${visibleWidth.toFixed(1)} x ${visibleHeight.toFixed(1)} ${units}`;
    const outsideWidth = numWidth + (frame.width * 2);
    const outsideHeight = numHeight + (frame.width * 2);
    const outsideSize = `${outsideWidth.toFixed(1)} x ${outsideHeight.toFixed(1)} ${units}`;

    // Draw size information in the center
    ctx.fillStyle = '#666666';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    
    const centerX = imageX + displayWidth / 2;
    const centerY = imageY + displayHeight / 2;
    
    ctx.fillText(`Image Size: ${imageSize}`, centerX, centerY - 20);
    ctx.fillText(`Visible (approx): ${visibleSize}`, centerX, centerY);
    ctx.fillText(`Outside (approx): ${outsideSize}`, centerX, centerY + 20);
  };

  const adjustColor = (color: string, amount: number): string => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className={`relative ${className}`} style={{ minHeight: '600px', padding: '40px' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto mx-auto block"
        style={{ maxWidth: '600px', maxHeight: '800px' }}
      />
    </div>
  );
};
