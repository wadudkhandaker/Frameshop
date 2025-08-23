import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ShoppingCart, User, Heart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Sports Memorabilia', href: '/sports-memorabilia', submenu: [
      { name: 'Rugby', href: '/sports-memorabilia/rugby' },
      { name: 'Soccer', href: '/sports-memorabilia/soccer' },
      { name: 'Tennis', href: '/sports-memorabilia/tennis' },
      { name: 'Cricket', href: '/sports-memorabilia/cricket' },
      { name: 'Basketball', href: '/sports-memorabilia/basketball' }
    ]},
    { name: 'Specials', href: '/specials', submenu: [
      { name: 'Sports Memorabilia', href: '/specials/sports-memorabilia' },
      { name: 'Canvas Artworks', href: '/specials/canvas-artworks' }
    ]},
    { name: 'Charity Auctions', href: '/charity-auctions' },
    { name: 'Pick up & Delivery', href: '/pickup-delivery' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Gift Card', href: '/gift-card' }
  ];

  return (
    <header className="bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <Link href="/login" className="hover:text-gray-300 transition-colors">
                Login
              </Link>
              <Link href="/gift-card" className="hover:text-gray-300 transition-colors">
                Gift Card
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/favourites" className="flex items-center hover:text-gray-300 transition-colors">
                <Heart className="w-4 h-4 mr-1" />
                <span>Favourites 0</span>
              </Link>
              <Link href="/basket" className="flex items-center hover:text-gray-300 transition-colors">
                <ShoppingCart className="w-4 h-4 mr-1" />
                <span>Basket 0</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Shop Logo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name} className="relative group">
                  <Link 
                    href={item.href}
                    className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm"
                  >
                    {item.name}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-200 rounded-md py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Phone Number and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Phone Number */}
            <div className="hidden md:flex items-center">
              <Phone className="w-5 h-5 mr-2 text-red-600" />
              <span className="text-lg font-bold text-gray-900">1300 676 020</span>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 