import React from 'react';
import { useCart } from '@/contexts/CartContext';

const CartButton: React.FC = () => {
  const { openCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={openCart}
      className="flex items-center hover:text-gray-300 transition-colors"
      aria-label="Open shopping cart"
    >
      <span>Basket ({totalItems})</span>
    </button>
  );
};

export default CartButton;
