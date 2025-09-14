import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

const CartPanel: React.FC = () => {
  const {
    items,
    isOpen,
    isAnimating,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    getLastAddedItem
  } = useCart();

  const lastAddedItem = getLastAddedItem();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={closeCart}
      />
      
      {/* Cart Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out ${
        isAnimating ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Cart ({getTotalItems()})
            </h3>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Success Message */}
          {lastAddedItem && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 m-4 rounded-r-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    {lastAddedItem.name} added to cart
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto cart-scroll">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some items to get started</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 p-1 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>

                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Link href={`/products/${item.slug}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md border border-gray-200"
                        />
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.slug}`}>
                        <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                          {item.name}
                        </h4>
                      </Link>
                      <p className="text-lg font-semibold text-red-600 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.size && (
                        <p className="text-xs text-gray-500 mt-1">
                          Size: {item.size}
                        </p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end space-y-2">
                      <label className="text-xs text-gray-500">Qty:</label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-12 text-center border-0 focus:ring-0 text-sm"
                          min="1"
                          max="99"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-red-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              
              <Link
                href="/checkout"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors text-center block"
                onClick={closeCart}
              >
                Next Step
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPanel;
