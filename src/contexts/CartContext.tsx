import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isAnimating: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getLastAddedItem: () => CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setLastAddedItem({ ...existingItem, quantity: existingItem.quantity + 1 });
        return updatedItems;
      } else {
        // Add new item
        const itemToAdd = { ...newItem, quantity: 1 };
        setLastAddedItem(itemToAdd);
        return [...prevItems, itemToAdd];
      }
    });
    setIsOpen(true);
    // Start animation after a tiny delay to ensure DOM is updated
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setLastAddedItem(null);
  };

  const openCart = () => {
    setIsOpen(true);
    // Start animation after a tiny delay to ensure DOM is updated
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };
  
  const closeCart = () => {
    setIsAnimating(false);
    // Close the panel after animation completes
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getLastAddedItem = () => lastAddedItem;

  const value: CartContextType = {
    items,
    isOpen,
    isAnimating,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    getTotalItems,
    getTotalPrice,
    getLastAddedItem,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
