import React, { useMemo } from 'react';
import { Frame, MatBoard } from './types';

interface PricingEngineProps {
  selectedFrame: Frame | null;
  selectedMatBoard: MatBoard | null;
  matStyle: string;
  imageWidth: string;
  imageHeight: string;
  uniformWidth: string;
  customWidths: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  matWidthType: 'uniform' | 'custom';
  quantity: number;
  selectedGlass?: string;
  selectedBacking?: string;
  selectedExtras?: string[];
}

interface PriceBreakdown {
  frame: {
    perimeter: number;
    rate: number;
    total: number;
  };
  mat: {
    area: number;
    rate: number;
    total: number;
  };
  glass: {
    area: number;
    rate: number;
    total: number;
  };
  backing: {
    area: number;
    rate: number;
    total: number;
  };
  extras: {
    items: string[];
    total: number;
  };
  labor: number;
  subtotal: number;
  tax: number;
  total: number;
}

const PricingEngine: React.FC<PricingEngineProps> = ({
  selectedFrame,
  selectedMatBoard,
  matStyle,
  imageWidth,
  imageHeight,
  uniformWidth,
  customWidths,
  matWidthType,
  quantity,
  selectedGlass = 'clear',
  selectedBacking = 'standard',
  selectedExtras = []
}) => {
  const priceBreakdown = useMemo((): PriceBreakdown => {
    const width = parseFloat(imageWidth) || 0;
    const height = parseFloat(imageHeight) || 0;
    
    if (width <= 0 || height <= 0) {
      return {
        frame: { perimeter: 0, rate: 0, total: 0 },
        mat: { area: 0, rate: 0, total: 0 },
        glass: { area: 0, rate: 0, total: 0 },
        backing: { area: 0, rate: 0, total: 0 },
        extras: { items: [], total: 0 },
        labor: 0,
        subtotal: 0,
        tax: 0,
        total: 0
      };
    }

    // Calculate frame dimensions (including mat)
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

    // Frame pricing
    const frameRate = selectedFrame?.priceRate || 0;
    const frameTotal = (framePerimeter / 100) * frameRate; // Convert cm to meters

    // Mat pricing
    const matArea = frameWidth * frameHeight;
    const matRate = selectedMatBoard ? 0.05 : 0; // $0.05 per cm²
    const matTotal = matArea * matRate;

    // Glass pricing with options
    const glassArea = frameWidth * frameHeight;
    const glassRates = {
      'clear': 0.03,
      'uv': 0.045,
      'anti-glare': 0.04,
      'museum': 0.06
    };
    const glassRate = glassRates[selectedGlass as keyof typeof glassRates] || 0.03;
    const glassTotal = glassArea * glassRate;

    // Backing pricing with options
    const backingArea = frameWidth * frameHeight;
    const backingRates = {
      'standard': 0.01,
      'foam': 0.012,
      'archival': 0.015,
      'conservation': 0.02
    };
    const backingRate = backingRates[selectedBacking as keyof typeof backingRates] || 0.01;
    const backingTotal = backingArea * backingRate;

    // Extras pricing
    const extrasPrices = {
      'standard-shipping': 15.00,
      'express-shipping': 25.00,
      'overnight-shipping': 45.00,
      'frame-protection': 12.00,
      'insurance': 8.00,
      'custom-plaque': 18.00,
      'gift-wrapping': 12.00,
      'gift-card': 5.00,
      'white-glove': 75.00,
      'installation': 50.00
    };
    const extrasTotal = selectedExtras.reduce((total, extra) => {
      return total + (extrasPrices[extra as keyof typeof extrasPrices] || 0);
    }, 0);

    // Labor cost
    const baseLabor = 25; // Base labor cost
    const complexityMultiplier = selectedMatBoard ? 1.5 : 1; // More complex with mats
    const frameArea = frameWidth * frameHeight;
    const sizeMultiplier = Math.max(1, (frameArea / 10000)); // Larger frames cost more
    const labor = baseLabor * complexityMultiplier * sizeMultiplier;

    // Calculate totals
    const subtotal = frameTotal + matTotal + glassTotal + backingTotal + labor + extrasTotal;
    const tax = subtotal * 0.1; // 10% tax
    const total = (subtotal + tax) * quantity;

    return {
      frame: {
        perimeter: framePerimeter,
        rate: frameRate,
        total: frameTotal
      },
      mat: {
        area: matArea,
        rate: matRate,
        total: matTotal
      },
      glass: {
        area: glassArea,
        rate: glassRate,
        total: glassTotal
      },
      backing: {
        area: backingArea,
        rate: backingRate,
        total: backingTotal
      },
      extras: {
        items: selectedExtras,
        total: extrasTotal
      },
      labor,
      subtotal,
      tax,
      total
    };
  }, [
    selectedFrame,
    selectedMatBoard,
    imageWidth,
    imageHeight,
    uniformWidth,
    customWidths,
    matWidthType,
    quantity
  ]);

  const frameArea = useMemo(() => {
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
    return frameWidth * frameHeight;
  }, [imageWidth, imageHeight, uniformWidth, customWidths, matWidthType]);

  if (!selectedFrame) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
        <p className="text-gray-500 text-center py-8">
          Select a frame to see pricing details
        </p>
      </div>
    );
  }

  return (
    <div className="product-summary">
      <table className="table is-striped is-narrow w-full">
        <thead>
          <tr>
            <td></td>
            <td className="font-semibold">Product Summary</td>
            <td className="font-semibold">Price Breakdown</td>
          </tr>
        </thead>
        <tbody>
          <tr className="product-summary__row">
            <td className="font-medium">Frame</td>
            <td className="">{selectedFrame?.code || 'Not selected'}</td>
            <td>${priceBreakdown.frame.total.toFixed(2)}</td>
          </tr>
          <tr className="product-summary__row">
            <td className="font-medium">Glass</td>
            <td className="">Clear Glass</td>
            <td>${priceBreakdown.glass.total.toFixed(2)}</td>
          </tr>
          <tr className="product-summary__row">
            <td className="font-medium">Backing</td>
            <td className="">MDF (Wood)</td>
            <td>${priceBreakdown.backing.total.toFixed(2)}</td>
          </tr>
          <tr className="product-summary__row">
            <td className="font-medium">Hanger</td>
            <td className="">Standback + Hanger</td>
            <td></td>
          </tr>
          <tr className="product-summary__row">
            <td className="font-medium">Image Size</td>
            <td className="">{imageWidth} x {imageHeight} cm</td>
            <td></td>
          </tr>
          <tr className="product-summary__row">
            <td className="font-medium">Glass Size (approx)</td>
            <td className="">{imageWidth} x {imageHeight} cm</td>
            <td></td>
          </tr>
          <tr className="product-summary__row">
            <td className="font-medium">Outside Size (approx)</td>
            <td className="">{(parseFloat(imageWidth) + 6).toFixed(1)} x {(parseFloat(imageHeight) + 6).toFixed(1)} cm</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PricingEngine;
