import React from 'react';
import Link from 'next/link';
import { mockTrendingProducts } from '../data/mockProducts';

const TrendingProducts: React.FC = () => {
  const products = mockTrendingProducts;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending</h2>
          <p className="text-lg text-gray-600">Discover our most popular items</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const status = product.attributes.status;
            const productSlug = product.attributes.slug || product.id.toString();
            
            return (
              <Link key={product.id} href={`/products/${productSlug}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={product.attributes.image || '/images/placeholder.jpg'}
                      alt={product.attributes.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {status === 'sold-out' && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Sold Out
                      </div>
                    )}
                    {status === 'limited' && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Almost Gone
                      </div>
                    )}
                    {status === 'trending' && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Trending
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.attributes.name}
                  </h3>
                  <p className="text-xl font-bold text-blue-600">
                    {product.attributes.price > 0 ? `$${product.attributes.price}` : 'Contact for price'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts; 