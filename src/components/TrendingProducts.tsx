import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string;
  status?: 'sold-out' | 'limited';
}

const trendingProducts: Product[] = [
  {
    id: '5661',
    name: 'Travis Boak Signed Career Guernsey',
    price: '',
    image: 'https://officialmemorabiliaau.b-cdn.net/products/11994-369.jpg',
    link: '/travis-boak-signed-career-guernsey-5661.phtml',
    status: 'sold-out'
  },
  {
    id: '5662',
    name: 'Travis Boak Signed Career Retrospective Lithograph',
    price: '$495.00',
    image: 'https://officialmemorabiliaau.b-cdn.net/products/11996-369.jpg',
    link: '/travis-boak-signed-career-retrospective-lithograph-5662.phtml'
  },
  {
    id: '5368',
    name: 'Nat Fyfe Signed Career Retro Guernsey Display',
    price: '$995.00',
    image: 'https://officialmemorabiliaau.b-cdn.net/products/12033-369.jpg',
    link: '/nat-fyfe-signed-career-retro-guernsey-display-5368.phtml'
  },
  {
    id: '5369',
    name: 'Nat Fyfe Signed Career Lithograph',
    price: '',
    image: 'https://officialmemorabiliaau.b-cdn.net/products/10969-369.jpg',
    link: '/nat-fyfe-signed-career-lithograph-5369.phtml',
    status: 'sold-out'
  },
  {
    id: '5671',
    name: 'All Blacks 2025 Squad Signed Boxed Jersey',
    price: '$695.00',
    image: 'https://officialmemorabiliaau.b-cdn.net/products/12036-369.jpg',
    link: '/all-blacks-2025-squad-signed-boxed-jersey-5671.phtml'
  },
  {
    id: '5649',
    name: 'Queensland 2025 Try Scorers Framed Jersey',
    price: '$1,495.00',
    image: 'https://officialmemorabiliaau.b-cdn.net/products/11953-369.jpg',
    link: '/queensland-2025-try-scorers-framed-jersey-5649.phtml',
    status: 'limited'
  }
];

export default function TrendingProducts() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending</h2>
        </div>
        
        <div className="productListStatic grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trendingProducts.map((product) => (
            <div key={product.id} className="item relative group">
              <Link href={product.link} className="block">
                <div className="imgWrapper relative overflow-hidden">
                  <img 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    src={product.image}
                    alt={product.name}
                  />
                  
                  {/* Status Tags */}
                  {product.status === 'sold-out' && (
                    <div className="productTagSoldOut absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold">
                      <p>Sold <span>Out</span></p>
                    </div>
                  )}
                  
                  {product.status === 'limited' && (
                    <div className="productTagLimitedRemaining absolute top-2 left-2 bg-orange-600 text-white px-2 py-1 text-xs font-semibold">
                      <p>Almost Gone</p>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-900 mb-2 line-clamp-2">{product.name}</p>
                  {product.price && (
                    <p className="price priceData text-lg font-semibold text-gray-900">{product.price}</p>
                  )}
                </div>
              </Link>
              
              {/* Wishlist Button */}
              <button 
                className="wishListHeartInactive absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors duration-200"
                type="button"
                value="Favourite"
                data-id={product.id}
                aria-label="Add to favorites"
              >
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 