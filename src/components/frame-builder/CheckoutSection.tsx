import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Frame, MatBoard } from './types';
import { bulkOptions } from './data';

interface CheckoutSectionProps {
  selectedFrame: Frame | null;
  selectedMatBoard: MatBoard | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  bulkOption: string;
  setBulkOption: (option: string) => void;
  imageWidth: string;
  imageHeight: string;
}

const CheckoutSection: React.FC<CheckoutSectionProps> = ({
  selectedFrame,
  quantity,
  setQuantity,
  bulkOption,
  setBulkOption,
  imageWidth,
  imageHeight
}) => {
  const calculateTotal = () => {
    const basePrice = 16.80;
    const bulkMultiplier = bulkOption ? parseInt(bulkOption) : 1;
    return (basePrice * quantity * bulkMultiplier).toFixed(2);
  };

  const calculateFramePrice = () => {
    if (!selectedFrame) return 12.80;
    return 12.80; // Base frame price
  };

  const calculateGlassPrice = () => {
    return 4.00; // Base glass price
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Checkout</h3>
      
      {/* Bulk Buy */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="bulk-select" className="text-sm font-medium text-gray-700">
            Bulk Buy:
          </label>
          <select
            id="bulk-select"
            value={bulkOption}
            onChange={(e) => setBulkOption(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Select a pack size</option>
            {bulkOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantity and Total */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center"
            min="1"
          />
        </div>
        <div className="flex items-end">
          <div>
            <span className="text-sm text-gray-700">Total: </span>
            <span className="text-xl font-bold text-gray-900">${calculateTotal()}</span>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Add to cart
      </button>

      {/* Product Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Product Summary</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2"></th>
                <th className="text-left py-2">Product Summary</th>
                <th className="text-left py-2">Price Breakdown</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              <tr className="border-b">
                <td className="py-2">Frame</td>
                <td className="py-2">{selectedFrame?.code || '224F'}</td>
                <td className="py-2">${calculateFramePrice().toFixed(2)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Glass</td>
                <td className="py-2">Clear Glass</td>
                <td className="py-2">${calculateGlassPrice().toFixed(2)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Backing</td>
                <td className="py-2">MDF (Wood)</td>
                <td className="py-2">$0.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Hanger</td>
                <td className="py-2">Standback + Hanger</td>
                <td className="py-2"></td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Image Size</td>
                <td className="py-2">{imageWidth} x {imageHeight} cm</td>
                <td className="py-2"></td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Glass Size (approx)</td>
                <td className="py-2">{imageWidth} x {imageHeight} cm</td>
                <td className="py-2"></td>
              </tr>
              <tr>
                <td className="py-2">Outside Size (approx)</td>
                <td className="py-2">{(parseFloat(imageWidth) + 3).toFixed(1)} x {(parseFloat(imageHeight) + 3).toFixed(1)} cm</td>
                <td className="py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          For more custom options. Please{' '}
          <a href="/contact-us" className="text-amber-600 hover:text-amber-700">contact us</a>
        </p>
      </div>
    </div>
  );
};

export default CheckoutSection;