import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { cmsApi, Product } from '../../lib/cms';
import { getStrapiImageUrl } from '../../lib/cms';

interface ProductPageProps {
  product: Product | null;
}

export default function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const imageUrl = getStrapiImageUrl(product.attributes.image);
  const status = product.attributes.status;

  return (
    <>
      <Head>
        <title>{product.attributes.name} - Official Memorabilia</title>
        <meta name="description" content={product.attributes.description || product.attributes.name} />
        <meta property="og:title" content={product.attributes.name} />
        <meta property="og:description" content={product.attributes.description || product.attributes.name} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={imageUrl || '/images/placeholder.jpg'}
                  alt={product.attributes.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {status === 'sold-out' && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sold Out
                  </div>
                )}
                {status === 'limited' && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Limited Stock
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.attributes.name}
                  </h1>
                  {product.attributes.category?.data && (
                    <p className="text-blue-600 font-medium">
                      {product.attributes.category.data.attributes.name}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-blue-600">
                    ${product.attributes.price}
                  </span>
                  {status === 'trending' && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      Trending
                    </span>
                  )}
                </div>

                {product.attributes.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <div 
                      className="text-gray-600 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.attributes.description }}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {status === 'in-stock' && (
                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  )}
                  
                  {status === 'limited' && (
                    <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                      Buy Now - Limited Stock
                    </button>
                  )}

                  {status === 'sold-out' && (
                    <button className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed">
                      Sold Out
                    </button>
                  )}

                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Add to Wishlist
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>SKU:</span>
                      <span>{product.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="capitalize">{status?.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Added:</span>
                      <span>{new Date(product.attributes.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await cmsApi.getProducts();
    const paths = products.map((product) => ({
      params: { slug: product.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const product = await cmsApi.getProduct(slug);

    return {
      props: {
        product,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: {
        product: null,
      },
      revalidate: 60,
    };
  }
}; 