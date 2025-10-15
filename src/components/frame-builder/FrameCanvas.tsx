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
  matWidthType: 'uniform' | 'custom';
  customWidths: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  matStyle: '0' | '1' | '2'; // None, Single, Double
  bottomSelectedMatBoard: MatBoard | null;
  bottomMatWidth: number;
  vGroove: boolean;
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
  matWidthType,
  customWidths,
  matStyle,
  bottomSelectedMatBoard,
  bottomMatWidth,
  vGroove,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate dynamic canvas size based on picture box size
    // Picture box size from input (in cm)
    const pictureBoxWidthCm = Number(width) || 20; // Default to 20cm if not set
    const pictureBoxHeightCm = Number(height) || 30; // Default to 30cm if not set
    
    // Convert picture box to pixels (25 pixels per cm for zoomed in view)
    const cmToPixel = 25; // Increased from 15 to 25 for closer view
    const pictureBoxWidthPx = pictureBoxWidthCm * cmToPixel;
    const pictureBoxHeightPx = pictureBoxHeightCm * cmToPixel;
    
    // Calculate frame border (inversely proportional to size)
    const minDimension = Math.min(pictureBoxWidthCm, pictureBoxHeightCm);
    const isFloatCanvas = frame?.material === 'Floating';
    
    // Frame border calculation to match frameshop.com.au exactly
    let frameBorderCm;
    if (minDimension < 20) {
      // Small prints (4x6): use 1.5cm border to match frameshop.com.au
      frameBorderCm = 1.5;
    } else if (minDimension < 50) {
      // Medium prints: use proportional scaling but with minimum
      frameBorderCm = Math.max(1.0, (frame?.width || 3) * 15 / minDimension);
    } else if (minDimension < 85) {
      // A1 size: use 1.5cm border to match frameshop style
      frameBorderCm = 1.5;
    } else {
      // A0 and larger: use 1.5cm border to match frameshop.com.au exactly
      frameBorderCm = 1.5;
    }
    
    // Float canvas frames are 50% thinner
    if (isFloatCanvas) {
      frameBorderCm = frameBorderCm * 0.5;
    }
    
    const frameBorderPx = frameBorderCm * cmToPixel; // Convert to pixels using same scale
    
    // Calculate additional space needed for mats
    let additionalWidth = 0;
    let additionalHeight = 0;
    
    if (matStyle === '1' && selectedMatBoard) {
      // Single mat - add space for mat width (uniform or custom)
      if (matWidthType === 'custom') {
        const leftWidth = (parseFloat(customWidths.left) || 0) * cmToPixel;
        const rightWidth = (parseFloat(customWidths.right) || 0) * cmToPixel;
        const topWidth = (parseFloat(customWidths.top) || 0) * cmToPixel;
        const bottomWidth = (parseFloat(customWidths.bottom) || 0) * cmToPixel;
        additionalWidth = leftWidth + rightWidth;
        additionalHeight = topWidth + bottomWidth;
      } else {
        const matPadding = (matWidth || 0) * cmToPixel;
        additionalWidth = matPadding * 2;
        additionalHeight = matPadding * 2;
      }
    } else if (matStyle === '2' && selectedMatBoard) {
      // Double mat - add space for both top mat and bottom mat
      if (matWidthType === 'custom') {
        const leftWidth = (parseFloat(customWidths.left) || 0) * cmToPixel;
        const rightWidth = (parseFloat(customWidths.right) || 0) * cmToPixel;
        const topWidth = (parseFloat(customWidths.top) || 0) * cmToPixel;
        const bottomWidth = (parseFloat(customWidths.bottom) || 0) * cmToPixel;
        const bottomMatPadding = (bottomMatWidth || 0) * cmToPixel;
        additionalWidth = leftWidth + rightWidth + (bottomMatPadding * 2);
        additionalHeight = topWidth + bottomWidth + (bottomMatPadding * 2);
      } else {
        const topMatPadding = (matWidth || 0) * cmToPixel;
        const bottomMatPadding = (bottomMatWidth || 0) * cmToPixel;
        additionalWidth = (topMatPadding + bottomMatPadding) * 2;
        additionalHeight = (topMatPadding + bottomMatPadding) * 2;
      }
    }
    
    // Calculate canvas size: picture box + frame borders + mat space + padding
    const padding = 40; // Padding around the entire frame
    const canvasWidth = pictureBoxWidthPx + (frameBorderPx * 2) + additionalWidth + (padding * 2);
    const canvasHeight = pictureBoxHeightPx + (frameBorderPx * 2) + additionalHeight + (padding * 2);
    
    // Apply reasonable limits
    const maxCanvasWidth = 1500;
    const maxCanvasHeight = 2000;
    const finalCanvasWidth = Math.min(canvasWidth, maxCanvasWidth);
    const finalCanvasHeight = Math.min(canvasHeight, maxCanvasHeight);
    
    canvas.width = finalCanvasWidth;
    canvas.height = finalCanvasHeight;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, finalCanvasWidth, finalCanvasHeight);

    if (!frame) return;

    // Use pre-calculated values from canvas size calculation above
    // frameWidth already calculated: frameBorderPx
    // pictureBoxDisplay already calculated: pictureBoxWidthPx, pictureBoxHeightPx
    const frameWidth = frameBorderPx;
    
    // Calculate total frame dimensions (picture box + frame borders)
    const totalFrameWidth = pictureBoxWidthPx + (frameWidth * 2);
    const totalFrameHeight = pictureBoxHeightPx + (frameWidth * 2);
    
    // Center the frame on the canvas
    const frameX = (finalCanvasWidth - totalFrameWidth) / 2;
    const frameY = (finalCanvasHeight - totalFrameHeight) / 2;
    
    // Display dimensions are the same as picture box dimensions
    let displayWidth = pictureBoxWidthPx;
    let displayHeight = pictureBoxHeightPx;

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

    // Draw inner shadow based on frame material (skip for float canvas)
    if (!isFloatCanvas) {
      if (frame.material === 'Wood') {
        drawWoodGradientInnerShadow(ctx, imageX, imageY, displayWidth, displayHeight);
      } else {
        drawStandardInnerShadow(ctx, imageX, imageY, displayWidth, displayHeight);
      }
    }

    // Draw mat board based on mat style (draw this first, before picture box)
    if (matStyle !== '0' && selectedMatBoard && matWidth > 0) {
      drawMatBoard(ctx, frameX, frameY, totalFrameWidth, totalFrameHeight, frameWidth, matWidth, selectedMatBoard, matStyle, bottomSelectedMatBoard, bottomMatWidth, vGroove);
    }

    // Calculate picture box coordinates based on mat style and width type
    let pictureBoxX = imageX;
    let pictureBoxY = imageY;
    let pictureBoxWidth = displayWidth;
    let pictureBoxHeight = displayHeight;
    
    // For Float for Canvas: add 15px gap, picture size same as frame inner size
    if (isFloatCanvas) {
      const floatGap = 15; // 15px gap between picture and frame
      
      // Draw the gap area with a subtle background color
      ctx.fillStyle = '#f5f5f5'; // Light gray for the gap
      ctx.fillRect(imageX, imageY, displayWidth, displayHeight);
      
      // Add subtle inner shadow in the gap to create depth
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(imageX, imageY, displayWidth, displayHeight);
      ctx.restore();
      
      pictureBoxX = imageX + floatGap;
      pictureBoxY = imageY + floatGap;
      pictureBoxWidth = displayWidth - (floatGap * 2);
      pictureBoxHeight = displayHeight - (floatGap * 2);
    } else if (matStyle === '1' && selectedMatBoard && matWidth > 0) {
      // Single mat - use dynamic mat width (uniform or custom)
      if (matWidthType === 'custom') {
        // Custom widths: use individual side widths
        const leftPadding = parseFloat(customWidths.left) * 20;
        const rightPadding = parseFloat(customWidths.right) * 20;
        const topPadding = parseFloat(customWidths.top) * 20;
        const bottomPadding = parseFloat(customWidths.bottom) * 20;
        pictureBoxX = imageX + leftPadding;
        pictureBoxY = imageY + topPadding;
        pictureBoxWidth = displayWidth - (leftPadding + rightPadding);
        pictureBoxHeight = displayHeight - (topPadding + bottomPadding);
      } else {
        // Uniform width
        const matPadding = matWidth * 20; // Convert cm to pixels (20 pixels per cm)
        pictureBoxX = imageX + matPadding;
        pictureBoxY = imageY + matPadding;
        pictureBoxWidth = displayWidth - (matPadding * 2);
        pictureBoxHeight = displayHeight - (matPadding * 2);
      }
    } else if (matStyle === '2' && selectedMatBoard && matWidth > 0) {
      // Double mat - use dynamic mat width (uniform or custom)
      if (matWidthType === 'custom') {
        // Custom widths: use individual side widths
        const leftPadding = parseFloat(customWidths.left) * 20;
        const rightPadding = parseFloat(customWidths.right) * 20;
        const topPadding = parseFloat(customWidths.top) * 20;
        const bottomPadding = parseFloat(customWidths.bottom) * 20;
        pictureBoxX = imageX + leftPadding;
        pictureBoxY = imageY + topPadding;
        pictureBoxWidth = displayWidth - (leftPadding + rightPadding);
        pictureBoxHeight = displayHeight - (topPadding + bottomPadding);
      } else {
        // Uniform width
        const matPadding = matWidth * 20; // Convert cm to pixels (20 pixels per cm)
        pictureBoxX = imageX + matPadding;
        pictureBoxY = imageY + matPadding;
        pictureBoxWidth = displayWidth - (matPadding * 2);
        pictureBoxHeight = displayHeight - (matPadding * 2);
      }
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

    // Draw size information like frameshop.com.au - use actual picture box dimensions
    drawSizeInfo(ctx, pictureBoxX, pictureBoxY, pictureBoxWidth, pictureBoxHeight, displayWidth, displayHeight, width, height, units, frame, frameWidth);

  }, [width, height, units, frame, image, matting, selectedMatBoard, matWidth, matWidthType, customWidths, matStyle, bottomSelectedMatBoard, bottomMatWidth, vGroove]);

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
  matStyle: '0' | '1' | '2',
  bottomMatBoard: MatBoard | null,
  bottomMatWidth: number,
  vGroove: boolean
) => {
  // Calculate mat board dimensions from the matWidth prop
  const matWidthPixels = matWidth * 20; // Convert cm to pixels (20 pixels per cm)
  const matX = frameX + frameWidth;
  const matY = frameY + frameWidth;
  const matW = totalFrameWidth - (frameWidth * 2);
  const matH = totalFrameHeight - (frameWidth * 2);

  if (matStyle === '1') {
    // Single mat - draw one mat layer
    // console.log('Drawing single mat');
    drawSingleMat(ctx, matX, matY, matW, matH, matWidthPixels, matBoard, vGroove);
  } else if (matStyle === '2') {
    // Double mat - draw two mat layers with different colors
    // console.log('Drawing double mat');
    drawDoubleMat(ctx, matX, matY, matW, matH, matWidthPixels, matBoard, bottomMatBoard, bottomMatWidth, matWidthType, customWidths, vGroove);
  }
};

const drawSingleMat = (
  ctx: CanvasRenderingContext2D,
  matX: number,
  matY: number,
  matW: number,
  matH: number,
  matWidthPixels: number,
  matBoard: MatBoard,
  vGroove: boolean
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
  
  // Draw V-Groove effect if enabled (white border box with 50px gap from picture box)
  if (vGroove) {
    ctx.save();
    ctx.strokeStyle = '#ffffff'; // White border
    ctx.lineWidth = 4;
    
    // Calculate V-Groove coordinates (35px gap around picture box)
    const vGrooveGap = 35;
    const vGrooveX = pictureBoxX - vGrooveGap;
    const vGrooveY = pictureBoxY - vGrooveGap;
    const vGrooveW = pictureBoxW + (vGrooveGap * 2);
    const vGrooveH = pictureBoxH + (vGrooveGap * 2);
    
    // Draw V-Groove rectangle (white border only, no fill)
    ctx.strokeRect(vGrooveX, vGrooveY, vGrooveW, vGrooveH);
    ctx.restore();
  }
};

const drawDoubleMat = (
  ctx: CanvasRenderingContext2D,
  matX: number,
  matY: number,
  matW: number,
  matH: number,
  matWidthPixels: number,
  topMatBoard: MatBoard,
  bottomMatBoard: MatBoard | null,
  bottomMatWidth: number,
  matWidthType: 'uniform' | 'custom',
  customWidths: { top: string; bottom: string; left: string; right: string; },
  vGroove: boolean
) => {
  // console.log('drawDoubleMat called with:', { matWidthPixels, bottomMatBoard, bottomMatWidth });
  
  // Calculate picture box coordinates based on width type
  let pictureBoxX, pictureBoxY, pictureBoxW, pictureBoxH;
  
  if (matWidthType === 'custom') {
    // Custom widths: use individual side widths
    const leftPadding = parseFloat(customWidths.left) * 20;
    const rightPadding = parseFloat(customWidths.right) * 20;
    const topPadding = parseFloat(customWidths.top) * 20;
    const bottomPadding = parseFloat(customWidths.bottom) * 20;
    pictureBoxX = matX + leftPadding;
    pictureBoxY = matY + topPadding;
    pictureBoxW = matW - (leftPadding + rightPadding);
    pictureBoxH = matH - (topPadding + bottomPadding);
  } else {
    // Uniform width
    pictureBoxX = matX + matWidthPixels;
    pictureBoxY = matY + matWidthPixels;
    pictureBoxW = matW - (matWidthPixels * 2);
    pictureBoxH = matH - (matWidthPixels * 2);
  }
  
  // 1. Fill mat area with top mat color (same as single mat)
  ctx.fillStyle = topMatBoard.color;
  ctx.fillRect(matX, matY, matW, matH);
  
  // 2. Draw white border around the picture box (4px wide) - EXACT same as single mat
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
  
  // 3. Add inner shadow effect on the white border around picture box - EXACT same as single mat
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
  
  // 4. Draw bottom mat box (if bottom mat is selected and width > 0) - this is the only difference
  // Declare bottom mat box variables outside the if block so they're accessible for V-Groove
  let bottomMatBoxX = 0, bottomMatBoxY = 0, bottomMatBoxW = 0, bottomMatBoxH = 0;
  
  if (bottomMatBoard && bottomMatWidth > 0) {
    let bottomMatBoxSize = bottomMatWidth * 10; // Convert cm to pixels (10 pixels per cm - even smaller bottom mat box)
    
    // Limit bottom mat box size to not exceed the available mat area around picture box
    const availableWidth = Math.min(matWidthPixels, pictureBoxW * 0.5); // Maximum half of picture box width
    const availableHeight = Math.min(matWidthPixels, pictureBoxH * 0.5); // Maximum half of picture box height
    const maxBottomMatSize = Math.min(availableWidth, availableHeight);
    bottomMatBoxSize = Math.min(bottomMatBoxSize, maxBottomMatSize);
    
    bottomMatBoxX = pictureBoxX - bottomMatBoxSize;
    bottomMatBoxY = pictureBoxY - bottomMatBoxSize;
    bottomMatBoxW = pictureBoxW + (bottomMatBoxSize * 2);
    bottomMatBoxH = pictureBoxH + (bottomMatBoxSize * 2);
    
    // Fill bottom mat box with bottom mat color
    ctx.fillStyle = bottomMatBoard.color;
    ctx.fillRect(bottomMatBoxX, bottomMatBoxY, bottomMatBoxW, bottomMatBoxH);
    
    // Draw white border around bottom mat box (4px)
    ctx.fillStyle = '#ffffff';
    const whiteBorderWidth = 4;
    
    // Top white border
    ctx.fillRect(bottomMatBoxX - whiteBorderWidth, bottomMatBoxY - whiteBorderWidth, bottomMatBoxW + (whiteBorderWidth * 2), whiteBorderWidth);
    // Bottom white border
    ctx.fillRect(bottomMatBoxX - whiteBorderWidth, bottomMatBoxY + bottomMatBoxH, bottomMatBoxW + (whiteBorderWidth * 2), whiteBorderWidth);
    // Left white border
    ctx.fillRect(bottomMatBoxX - whiteBorderWidth, bottomMatBoxY - whiteBorderWidth, whiteBorderWidth, bottomMatBoxH + (whiteBorderWidth * 2));
    // Right white border
    ctx.fillRect(bottomMatBoxX + bottomMatBoxW, bottomMatBoxY - whiteBorderWidth, whiteBorderWidth, bottomMatBoxH + (whiteBorderWidth * 2));
  }
  
  // Draw V-Groove effect if enabled (white border box with 50px gap from bottom mat box or picture box)
  if (vGroove) {
    ctx.save();
    ctx.strokeStyle = '#ffffff'; // White border
    ctx.lineWidth = 4;
    
    // Calculate V-Groove coordinates based on whether bottom mat exists
    let vGrooveX, vGrooveY, vGrooveW, vGrooveH;
    
    if (bottomMatBoard && bottomMatWidth > 0) {
      // For double mat: V-Groove around bottom mat box with 35px gap
      const vGrooveGap = 35;
      vGrooveX = bottomMatBoxX - vGrooveGap;
      vGrooveY = bottomMatBoxY - vGrooveGap;
      vGrooveW = bottomMatBoxW + (vGrooveGap * 2);
      vGrooveH = bottomMatBoxH + (vGrooveGap * 2);
    } else {
      // For single mat: V-Groove around picture box with 35px gap
      const vGrooveGap = 35;
      vGrooveX = pictureBoxX - vGrooveGap;
      vGrooveY = pictureBoxY - vGrooveGap;
      vGrooveW = pictureBoxW + (vGrooveGap * 2);
      vGrooveH = pictureBoxH + (vGrooveGap * 2);
    }
    
    // Draw V-Groove rectangle (white border only, no fill)
    ctx.strokeRect(vGrooveX, vGrooveY, vGrooveW, vGrooveH);
    ctx.restore();
  }
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
    pictureBoxX: number,
    pictureBoxY: number,
    pictureBoxWidth: number,
    pictureBoxHeight: number,
    displayWidth: number,
    displayHeight: number,
    originalWidth: number,
    originalHeight: number,
    units: string,
    frame: Frame,
    actualFrameWidthPx: number
  ) => {
    // Calculate the three different size measurements like frameshop.com.au
    const numOriginalWidth = Number(originalWidth) || 0;
    const numOriginalHeight = Number(originalHeight) || 0;
    
    // 1. Image Size: Original image dimensions
    const imageSize = `${numOriginalWidth.toFixed(1)} x ${numOriginalHeight.toFixed(1)} ${units}`;
    
    // 2. Visible (approx): Image size minus rebate (frame overlap)
    const rebateSize = frame.rebate * 2; // Rebate affects both sides
    const visibleWidth = numOriginalWidth - rebateSize;
    const visibleHeight = numOriginalHeight - rebateSize;
    const visibleSize = `${visibleWidth.toFixed(1)} x ${visibleHeight.toFixed(1)} ${units}`;
    
    // 3. Outside (approx): Image size plus actual frame width (converted back to cm)
    const actualFrameWidthCm = actualFrameWidthPx / 25; // Convert pixels back to cm using our scale
    const frameWidthTotal = actualFrameWidthCm * 2; // Frame width on both sides
    const outsideWidth = numOriginalWidth + frameWidthTotal;
    const outsideHeight = numOriginalHeight + frameWidthTotal;
    const outsideSize = `${outsideWidth.toFixed(1)} x ${outsideHeight.toFixed(1)} ${units}`;
    

    // Draw size information in the center of the picture box
    ctx.fillStyle = '#666666';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    
    const centerX = pictureBoxX + pictureBoxWidth / 2;
    const centerY = pictureBoxY + pictureBoxHeight / 2;
    
    // Display the three size measurements like frameshop.com.au
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
    <div className={`relative ${className}`} style={{ minHeight: '600px', padding: '40px', overflow: 'hidden' }}>
      <div className="flex justify-center items-center h-full">
        <canvas
          ref={canvasRef}
          className="block max-w-full max-h-full"
          style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '500px' }}
        />
      </div>
    </div>
  );
};
