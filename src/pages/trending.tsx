import React from 'react';
import Head from 'next/head';
import { useProductsByCategory, transformStrapiProduct } from '../hooks/useProducts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductTiles from '../components/ProductTiles';

export default function TrendingPage() {
  const { products: strapiProducts, loading, error } = useProductsByCategory('trending');

  // Transform Strapi products to local format
  const products = strapiProducts.map(transformStrapiProduct);

  if (loading) {
    return (
      <>
        <Head>
          <title>Trending Products</title>
          <meta name="description" content="Browse our trending sports memorabilia and collectibles" />
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading trending products...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error - Trending Products</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h1>
              <p className="text-gray-600 mb-4">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Trending Products</title>
        <meta name="description" content="Browse our trending sports memorabilia and collectibles" />
        <meta property="og:title" content="Trending Products" />
        <meta property="og:description" content="Browse our trending sports memorabilia and collectibles" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Trending Products</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover what's hot right now! Our most popular and trending sports memorabilia and collectibles.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {products.length} Trending {products.length === 1 ? 'Product' : 'Products'}
                  </h2>
                </div>
                <ProductTiles products={products} />
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Trending Products</h2>
                <p className="text-gray-600 mb-6">
                  Check back soon for our latest trending items!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
