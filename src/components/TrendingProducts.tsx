import React from 'react';
import Link from 'next/link';
import { useTrendingProducts, transformStrapiProduct } from '../hooks/useProducts';
import { mockTrendingProducts } from '../data/mockProducts';

const TrendingProducts: React.FC = () => {
  const { products: trendingProducts, loading, error } = useTrendingProducts();
  
  // Use Strapi trending products if available, otherwise fall back to mock data
  const products = trendingProducts.length > 0 ? trendingProducts.map(transformStrapiProduct) : mockTrendingProducts.map(p => ({
    id: p.id,
    attributes: {
      name: p.attributes.name,
      price: p.attributes.price,
      status: p.attributes.status,
      slug: p.attributes.slug || p.id.toString(),
      image: p.attributes.image || '/images/placeholder.jpg'
    }
  }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending</h2>
          <p className="text-lg text-gray-600">Discover our most popular items</p>
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading trending products...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Error loading trending products: {error}</p>
            <p className="text-gray-600">Showing mock data instead.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            // Handle both Strapi and mock data structures
            const isStrapiProduct = 'name' in product;
            const name = isStrapiProduct ? product.name : product.attributes.name;
            const price = isStrapiProduct ? product.price : product.attributes.price;
            const status = isStrapiProduct ? product.status : product.attributes.status;
            const slug = isStrapiProduct ? product.slug : product.attributes.slug || product.id.toString();
            const image = isStrapiProduct ? product.images[0] : product.attributes.image;
            const productId = isStrapiProduct ? product.id : product.id.toString();
            
            return (
              <Link key={productId} href={`/products/${slug}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={image || '/images/placeholder.jpg'}
                      alt={name}
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
                    {name}
                  </h3>
                  <p className="text-xl font-bold text-blue-600">
                    {price > 0 ? `$${price.toFixed(2)}` : 'Contact for price'}
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