import React from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  status: string;
  description?: string;
  shortDescription?: string;
  images: string[];
  frame: {
    id: string;
    name: string;
    code: string;
    width: number;
    depth: number;
    rebate: number;
    material: string;
    color: string;
    priceRate: number;
    maxLength: number;
    category: string;
    isPopular: boolean;
    isOnSale: boolean;
  } | null;
}

interface ProductTilesProps {
  products: Product[];
}

export default function ProductTiles({ products }: ProductTilesProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <section className="products py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.slug}`}
              className="product-card group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.images[0] || '/images/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  {product.status === 'limited' && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      LIMITED
                    </span>
                  )}
                  {product.status === 'in-stock' && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                      IN STOCK
                    </span>
                  )}
                  {product.status === 'out-of-stock' && (
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-bold">
                      OUT OF STOCK
                    </span>
                  )}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                {product.frame && (
                  <p className="text-sm text-gray-600 mb-2">
                    {product.frame.material} {product.frame.color} Frame
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-600">
                    ${product.price}.00
                  </span>
                  <span className="text-sm text-gray-500">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 