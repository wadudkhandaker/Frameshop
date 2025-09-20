import React, { useState } from 'react';
import { Truck, Shield, Clock, Gift, Heart, Star, Zap, Crown, CheckCircle } from 'lucide-react';

interface ExtraOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: 'shipping' | 'protection' | 'personalization' | 'services';
  popular?: boolean;
}

const extraOptions: ExtraOption[] = [
  // Shipping Options
  {
    id: 'standard-shipping',
    name: 'Standard Shipping',
    description: 'Regular shipping with tracking (5-7 business days)',
    price: 15.00,
    icon: <Truck className="w-5 h-5" />,
    category: 'shipping'
  },
  {
    id: 'express-shipping',
    name: 'Express Shipping',
    description: 'Fast shipping with tracking (2-3 business days)',
    price: 25.00,
    icon: <Zap className="w-5 h-5" />,
    category: 'shipping',
    popular: true
  },
  {
    id: 'overnight-shipping',
    name: 'Overnight Shipping',
    description: 'Next day delivery (1 business day)',
    price: 45.00,
    icon: <Clock className="w-5 h-5" />,
    category: 'shipping'
  },
  
  // Protection Options
  {
    id: 'frame-protection',
    name: 'Frame Protection',
    description: 'Additional protection for fragile frames during shipping',
    price: 12.00,
    icon: <Shield className="w-5 h-5" />,
    category: 'protection'
  },
  {
    id: 'insurance',
    name: 'Shipping Insurance',
    description: 'Full value insurance coverage for your framed artwork',
    price: 8.00,
    icon: <Shield className="w-5 h-5" />,
    category: 'protection',
    popular: true
  },
  
  // Personalization Options
  {
    id: 'custom-plaque',
    name: 'Custom Plaque',
    description: 'Personalized brass plaque with your message',
    price: 18.00,
    icon: <Star className="w-5 h-5" />,
    category: 'personalization'
  },
  {
    id: 'gift-wrapping',
    name: 'Gift Wrapping',
    description: 'Beautiful gift wrapping with ribbon and card',
    price: 12.00,
    icon: <Gift className="w-5 h-5" />,
    category: 'personalization'
  },
  {
    id: 'gift-card',
    name: 'Gift Card',
    description: 'Include a personalized gift card with your message',
    price: 5.00,
    icon: <Heart className="w-5 h-5" />,
    category: 'personalization'
  },
  
  // Services
  {
    id: 'white-glove',
    name: 'White Glove Service',
    description: 'Professional delivery and setup service',
    price: 75.00,
    icon: <Crown className="w-5 h-5" />,
    category: 'services'
  },
  {
    id: 'installation',
    name: 'Installation Service',
    description: 'Professional wall mounting and installation',
    price: 50.00,
    icon: <Shield className="w-5 h-5" />,
    category: 'services'
  }
];

interface ExtrasOptionsProps {
  selectedExtras: string[];
  setSelectedExtras: (extras: string[]) => void;
}

const ExtrasOptions: React.FC<ExtrasOptionsProps> = ({
  selectedExtras,
  setSelectedExtras
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(
      selectedExtras.includes(extraId)
        ? selectedExtras.filter(id => id !== extraId)
        : [...selectedExtras, extraId]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'shipping': return <Truck className="w-4 h-4" />;
      case 'protection': return <Shield className="w-4 h-4" />;
      case 'personalization': return <Heart className="w-4 h-4" />;
      case 'services': return <Crown className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const filteredExtras = activeCategory === 'all' 
    ? extraOptions 
    : extraOptions.filter(extra => extra.category === activeCategory);

  const totalExtrasPrice = selectedExtras.reduce((total, extraId) => {
    const extra = extraOptions.find(e => e.id === extraId);
    return total + (extra?.price || 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Services & Extras</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { id: 'all', label: 'All Options' },
            { id: 'shipping', label: 'Shipping' },
            { id: 'protection', label: 'Protection' },
            { id: 'personalization', label: 'Personalization' },
            { id: 'services', label: 'Services' }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category.id)}
              <span className="ml-2">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Extras Options */}
      <div className="grid grid-cols-1 gap-3">
        {filteredExtras.map((extra) => (
          <div
            key={extra.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedExtras.includes(extra.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleExtraToggle(extra.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-md ${
                  selectedExtras.includes(extra.id) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {extra.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{extra.name}</h4>
                    {extra.popular && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{extra.description}</p>
                  
                  {/* Category Badge */}
                  <div className="mt-2">
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {extra.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900">
                    ${extra.price.toFixed(2)}
                  </p>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedExtras.includes(extra.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedExtras.includes(extra.id) && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Extras Summary */}
      {selectedExtras.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3">Selected Extras</h4>
          <div className="space-y-2">
            {selectedExtras.map((extraId) => {
              const extra = extraOptions.find(e => e.id === extraId);
              return extra ? (
                <div key={extraId} className="flex justify-between items-center text-sm">
                  <span className="text-blue-800">{extra.name}</span>
                  <span className="font-medium text-blue-900">${extra.price.toFixed(2)}</span>
                </div>
              ) : null;
            })}
            <div className="border-t border-blue-200 pt-2 mt-2">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-blue-900">Total Extras</span>
                <span className="text-blue-900">${totalExtrasPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• <strong>For Gifts:</strong> Gift Wrapping + Gift Card</p>
          <p>• <strong>For Valuable Art:</strong> Shipping Insurance + Frame Protection</p>
          <p>• <strong>For Large Frames:</strong> White Glove Service + Installation</p>
          <p>• <strong>For Special Occasions:</strong> Custom Plaque + Express Shipping</p>
        </div>
      </div>

      {/* Popular Combinations */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Popular Combinations</h4>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedExtras(['express-shipping', 'insurance', 'gift-wrapping'])}
            className="w-full text-left p-2 bg-white rounded border hover:border-yellow-300 transition-colors"
          >
            <div className="font-medium text-sm">Gift Package</div>
            <div className="text-xs text-gray-600">Express Shipping + Insurance + Gift Wrapping</div>
          </button>
          <button
            onClick={() => setSelectedExtras(['insurance', 'frame-protection', 'white-glove'])}
            className="w-full text-left p-2 bg-white rounded border hover:border-yellow-300 transition-colors"
          >
            <div className="font-medium text-sm">Premium Protection</div>
            <div className="text-xs text-gray-600">Insurance + Frame Protection + White Glove Service</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtrasOptions;
