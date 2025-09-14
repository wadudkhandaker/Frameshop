import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useProductsByCategory, transformStrapiProduct } from '../../hooks/useProducts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductTiles from '../../components/ProductTiles';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { products: strapiProducts, loading, error } = useProductsByCategory(category as string);

  // Transform Strapi products to local format
  const products = strapiProducts.map(transformStrapiProduct);

  // Category display names
  const categoryNames: { [key: string]: string } = {
    'trending': 'Trending Products',
    'rugby': 'Rugby Memorabilia',
    'soccer': 'Soccer Memorabilia',
    'tennis': 'Tennis Memorabilia',
    'cricket': 'Cricket Memorabilia',
    'basketball': 'Basketball Memorabilia',
    'sports-memorabilia': 'Sports Memorabilia',
    'canvas-artworks': 'Canvas Artworks'
  };

  const categoryName = categoryNames[category as string] || (category as string) || 'Category';

  if (loading) {
    return (
      <>
        <Head>
          <title>{categoryName} - Category</title>
          <meta name="description" content={`Browse our collection of ${(categoryName || 'products').toLowerCase()}`} />
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading {categoryName.toLowerCase()}...</p>
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
          <title>Error - Category</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Category</h1>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => router.back()}
                className="text-blue-600 hover:text-blue-800"
              >
                Go Back
              </button>
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
        <title>{categoryName} - Category</title>
        <meta name="description" content={`Browse our collection of ${(categoryName || 'products').toLowerCase()}`} />
        <meta property="og:title" content={`${categoryName} - Category`} />
        <meta property="og:description" content={`Browse our collection of ${(categoryName || 'products').toLowerCase()}`} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        {/* <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryName}</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our premium collection of {(categoryName || 'products').toLowerCase()}. 
                Each piece is carefully crafted and officially licensed.
              </p>
            </div>
          </div>
        </section> */}

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
                  </h2>
                </div>
                <ProductTiles products={products} />
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h2>
                <p className="text-gray-600 mb-6">
                  We don't have any products in this category yet. Check back soon!
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Products
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
