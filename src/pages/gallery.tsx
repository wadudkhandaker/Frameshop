import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useProducts, transformStrapiProduct } from '../hooks/useProducts';
import { mockTrendingProducts } from '../data/mockProducts';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Gallery() {
  const { products: allProducts, loading, error } = useProducts();
  
  // Use Strapi products if available, otherwise fall back to mock data
  const products = allProducts.length > 0 ? allProducts.map(transformStrapiProduct) : mockTrendingProducts.map(p => ({
    id: p.id,
    name: p.attributes.name,
    slug: p.attributes.slug || p.id.toString(),
    price: p.attributes.price,
    status: p.attributes.status,
    images: [p.attributes.image || '/images/placeholder.jpg'],
    frame: null
  }));

  return (
    <>
      <Head>
        <title>Gallery - All Products | Official Memorabilia</title>
        <meta name="description" content="Browse our complete collection of officially licensed sports memorabilia, frames, and collectables. Find the perfect piece for your collection." />
        <meta name="keywords" content="sports memorabilia gallery, all products, frames, collectables, official memorabilia" />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our complete collection of officially licensed sports memorabilia, frames, and collectables. 
                Find the perfect piece for your collection.
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Error loading products: {error}</p>
                <p className="text-gray-600">Showing mock data instead.</p>
              </div>
            )}

            {/* Products Grid */}
            {!loading && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    All Products ({products.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => {
                    // Handle both Strapi and mock data structures
                    const isStrapiProduct = 'images' in product;
                    const name = isStrapiProduct ? product.name : product.name;
                    const price = isStrapiProduct ? product.price : product.price;
                    const status = isStrapiProduct ? product.status : product.status;
                    const slug = isStrapiProduct ? product.slug : product.slug;
                    const image = isStrapiProduct ? product.images[0] : product.images[0];
                    const productId = isStrapiProduct ? product.id : product.id.toString();
                    
                    return (
                      <Link key={productId} href={`/products/${slug}`}>
                        <div className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                          {/* Product Image */}
                          <div className="relative overflow-hidden">
                            <img
                              src={image || '/images/placeholder.jpg'}
                              alt={name}
                              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            
                            {/* Status Badges */}
                            {status === 'sold-out' && (
                              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Sold Out
                              </div>
                            )}
                            {status === 'limited' && (
                              <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Limited Stock
                              </div>
                            )}
                            {status === 'trending' && (
                              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Trending
                              </div>
                            )}
                            {status === 'new' && (
                              <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                New
                              </div>
                            )}
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                              {name}
                            </h3>
                            <div className="flex justify-between items-center">
                              <p className="text-xl font-bold text-red-600">
                                {price > 0 ? `$${price.toFixed(2)}` : 'Contact for price'}
                              </p>
                              <span className="text-sm text-gray-500">
                                {isStrapiProduct && product.frame ? 
                                  `${product.frame.material} ${product.frame.color}` : 
                                  'Premium Quality'
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                
                {/* Empty State */}
                {products.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">Check back later for new additions to our collection.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
