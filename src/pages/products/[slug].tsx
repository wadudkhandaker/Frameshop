import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Facebook, Twitter, Instagram, Heart, ShoppingCart, ZoomIn, ChevronLeft, ChevronRight, Truck, Calendar, Phone, Package, Clock, AlertCircle, Plane, HelpCircle } from 'lucide-react';
import { useProduct, transformStrapiProduct } from '../../hooks/useProducts';
import { mockTrendingProducts } from '../../data/mockProducts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  status: string;
  description?: string;
  shortDescription?: string;
  deliveryInfo?: string;
  specifications?: string;
  financingInfo?: string;
  badges?: Array<{
    id: number;
    name: string;
    color?: string;
  }>;
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

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { product: strapiProduct, loading, error } = useProduct(slug as string);
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('delivery');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('delivery');


  // Transform Strapi product to local Product type, or use mock data as fallback
  const product = strapiProduct ? transformStrapiProduct(strapiProduct) : 
    (() => {
      // Fallback to mock data if Strapi product not found
      const mockProduct = mockTrendingProducts.find(p => p.id.toString() === slug);
      if (mockProduct) {
        return {
          id: mockProduct.id.toString(),
          name: mockProduct.attributes.name,
          slug: mockProduct.attributes.slug || mockProduct.id.toString(),
          sku: `P${mockProduct.id}${String.fromCharCode(65 + mockProduct.id)}`,
          price: mockProduct.attributes.price,
          status: mockProduct.attributes.status,
          description: mockProduct.attributes.name,
          shortDescription: mockProduct.attributes.name,
          images: [mockProduct.attributes.image],
          frame: {
            id: mockProduct.id.toString(),
            name: mockProduct.attributes.name.split(' - ')[0] || 'Mock Frame',
            code: mockProduct.attributes.name.split(' - ')[0] || 'MOCK',
            width: 5,
            depth: 3,
            rebate: 1,
            material: mockProduct.attributes.name.includes('Wood') ? 'Wood' : 'Aluminum',
            color: mockProduct.attributes.name.includes('Oak') ? 'Oak' : 'Black',
            priceRate: Math.round(mockProduct.attributes.price / 10),
            maxLength: 200,
            category: 'Popular',
            isPopular: true,
            isOnSale: false,
          },
          financingInfo: 'Or up to 6 months interest free. Fees apply.',
          badges: [
            { id: 1, name: 'AFL', color: 'blue' },
            { id: 2, name: 'PREMIER STOCKIST', color: 'green' },
            { id: 3, name: 'FRAMESHOP', color: 'orange' }
          ],
          deliveryInfo: `# DELIVERY

## Shipping & Delivery Information
- Standard dispatch timeframes are approximately **20-25 business days**, unless otherwise specified.
- Dispatch times may be extended during peak periods (September to December, Holiday season).
- We recommend contacting our Customer Concierge Team for specific timeframes before placing an order.

## Tracking & Delivery
- Tracking details are sent via email once an order is dispatched.
- All items are shipped via courier, PO Boxes are not accepted, and a signature is typically required.
- Most deliveries occur between 9:00 AM - 5:00 PM local time, and a missed delivery card will be left if no one is home.

## International & Drop-Ship Products
- Some products are drop-shipped and subject to availability.
- A full refund will be provided if an item cannot be procured, and we advise allowing additional processing time for imported items.

## International Orders & Customs
- Global shipping to available locations during checkout. International customers are responsible for customs duties, import taxes, or additional shipping charges, and we are not liable for these.
- For delivery-related questions, contact us at customer-service@frameshop.com or call +1 (234) 567-890.`,
          specifications: `# SPECIFICATIONS

## Quality Assurance
✅ **Officially Licensed**
All products are officially licensed through collaborative partnerships with premium suppliers and manufacturers.

📄 **Quality Guaranteed**
All premium products come with quality assurance and authenticity documentation for credibility and traceability.

⭐ **Premium Manufacturing**
All frames are produced using premium materials and manufacturing processes. Learn more at frameshop.com

## Framing Standards
🖼️ **Premium Framing Standards**
Frames use deluxe, high-quality materials from responsible suppliers, and framing is completed to archival standards for long-term preservation.

🛡️ **Advanced Protection**
Premium protective materials offer visual clarity, durability, and up to 10x more impact resistance with UV-protection.

🖨️ **Local Manufacturing**
All production is handled locally using premium materials and professional-grade manufacturing processes.

## Specialty Features
Selected designs also feature specialty finishes, including:
- Cold Foil
- Hot Foil
- UV Gloss`
        };
      }
      return null;
    })();

  // Use product images if available, otherwise fallback to frame image
  const productImages = product ? product.images : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">Return to Home</Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/' },
    { name: product.name }
  ];

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/images/placeholder.jpg',
        slug: product.slug,
        size: product.frame?.name || 'Standard'
      });
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist functionality
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // Function to render dynamic badges
  const renderBadges = (badges?: Array<{id: number; name: string; color?: string}>) => {
    if (!badges || badges.length === 0) {
      // Default badges if none provided
      return (
        <>
         
        </>
      );
    }

    const badgeColors = ['bg-blue-600', 'bg-green-600', 'bg-orange-600', 'bg-purple-600', 'bg-red-600'];
    
    return badges.map((badge, index) => {
      const colorClass = badge.color 
        ? `bg-${badge.color}-600` 
        : badgeColors[index % badgeColors.length];
      
      return (
        <div 
          key={badge.id} 
          className={`${colorClass} text-white px-3 py-1 rounded text-xs font-bold`}
        >
          {badge.name}
        </div>
      );
    });
  };

  return (
    <>
      <Head>
        <title>{product.name} - Product Details</title>
        <meta name="description" content={`${product.name} - ${product.frame?.material || 'Premium'} frame in ${product.frame?.color || 'quality'} finish`} />
        <meta property="og:title" content={`${product.name} - Product Details`} />
        <meta property="og:description" content={`${product.name} - ${product.frame?.material || 'Premium'} frame in ${product.frame?.color || 'quality'} finish`} />
        {product.images[0] && <meta property="og:image" content={product.images[0]} />}
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        <section className="productMainWrapper py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="productMain grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Content - Images */}
              <div className="productLeftContent">
                {/* Breadcrumbs */}
                <div className="breadcrumbs mb-6">
                  <nav className="flex items-center space-x-2 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                      <React.Fragment key={index}>
                        {index === breadcrumbs.length - 1 ? (
                          <span className="text-gray-900 font-medium">{crumb.name}</span>
                        ) : (
                          <>
                            <Link href={crumb.href || '/'} className="text-blue-600 hover:text-blue-800">
                              {crumb.name}
                            </Link>
                            <span className="text-gray-400">/</span>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </nav>
                </div>

                {/* Image Gallery */}
                <div className="thumbnailSlider">
                  {/* Thumbnail Images */}
                  <div className="flex space-x-2 mb-4">
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer border-2 rounded ${
                          currentImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                        }`}
                        onClick={() => selectImage(index)}
                      >
                        <img
                          src={image || '/images/placeholder.jpg'}
                          alt={`${product.name} ${index + 1}`}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="mainImage imgVisible relative">
                    <div className="mainImageSlideWrapper relative">
                      <div className="mainImageSlide">
                        <div className="imgWrapper mainProductImage relative">
                          <div className="relative group">
                            <img
                              src={productImages[currentImageIndex] || '/images/placeholder.jpg'}
                              alt={`${product.name} - Image ${currentImageIndex + 1}`}
                              className="w-full h-96 object-cover rounded-lg cursor-pointer"
                              onClick={() => setIsZoomModalOpen(true)}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => setIsZoomModalOpen(true)}>
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-200"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-200"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Social Share Buttons */}
                  {/* <div className="shareButtons mt-6">
                    <ul className="flex space-x-4">
                      <li>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(`${product.name} - Product Details`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-200"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://www.instagram.com/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-200"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>

              {/* Right Content - Product Details */}
              <div className="productContent">
                <div className="content">
                  {/* SKU */}
                  {product.sku && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                    </div>
                  )}

                  {/* Product Status */}
                  {product.status && (
                    <div className="mb-4">
                      <div className="inline-block">
                        {product.status === 'limited' ? (
                          <div className="bg-red-600 text-white px-4 py-2 rounded border border-red-600 font-bold text-sm uppercase">
                            Limited Remaining
                          </div>
                        ) : product.status === 'in-stock' ? (
                          <div className="bg-green-600 text-white px-4 py-2 rounded border border-green-600 font-bold text-sm uppercase">
                            In Stock
                          </div>
                        ) : product.status === 'out-of-stock' ? (
                          <div className="bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 font-bold text-sm uppercase">
                            Out of Stock
                          </div>
                        ) : product.status === 'pre-order' ? (
                          <div className="bg-blue-600 text-white px-4 py-2 rounded border border-blue-600 font-bold text-sm uppercase">
                            Pre-Order
                          </div>
                        ) : (
                          <div className="bg-gray-600 text-white px-4 py-2 rounded border border-gray-600 font-bold text-sm uppercase">
                            {product.status}
                          </div>
                        )}
                      </div>
                </div>
                  )}

                  {/* Dynamic Badges */}
                  <div className="flex items-center space-x-4 mb-4">
                    {renderBadges(product.badges)}
                  </div>

                  {/* Product Title */}
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h1>
                    {product.frame && (
                      <p className="text-lg text-gray-600">{product.frame.material} {product.frame.color} Frame - Premium Quality</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-red-600">
                      ${product.price}.00
                    </p>
                </div>

                  {/* Reviews */}
                  {/* <div className="mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-gray-600">15 Reviews</span>
                    </div>
                  </div> */}

                  {/* Quantity and Add to Cart */}
                  <div className="mainQtyWrapper flex items-center space-x-4 mb-6">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      >
                        -
                    </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center border-0 focus:ring-0"
                        min="1"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      >
                        +
                    </button>
                </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                    
                    {/* <button
                      onClick={handleWishlist}
                      className={`p-3 rounded-lg border transition-colors duration-200 ${
                        isWishlisted
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-red-300'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button> */}
                </div>

                  {/* Payment Plan */}
                  {/* <div className="mb-8 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {product.financingInfo || 'Or up to 6 months interest free. Fees apply.'}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs text-blue-600">ⓘ</span>
                    </div>
                    </div> */}

                  {/* Product Description */}
                  <div className="content">
                    <div className="tableContent">
                      {product.description ? (
                        <div 
                          className="prose prose-lg max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ 
                            __html: product.description
                          }}
                        />
                      ) : (
                        <>
                          <p className="mb-4 text-gray-700">
                            No Description Available
                          </p>
                          
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Information Section - Accordion */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">MORE INFORMATION</h2>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Delivery Accordion */}
              <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    DELIVERY
                  </h3>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {activeAccordion === 'delivery' ? (
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                </button>
                {activeAccordion === 'delivery' && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-white">
                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: product.deliveryInfo || 
                        `<p class="text-gray-700">Delivery information will be available soon.</p>`
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Specifications Accordion */}
              <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion('specifications')}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    SPECIFICATIONS
                  </h3>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {activeAccordion === 'specifications' ? (
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                </button>
                {activeAccordion === 'specifications' && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-white">
                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: product.specifications || 
                        `<p class="text-gray-700">Specifications will be available soon.</p>`
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Image Zoom Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img
              src={productImages[currentImageIndex] || '/images/placeholder.jpg'}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Navigation arrows for zoom modal */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {productImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

// Required for Next.js static export
export async function getStaticPaths() {
  // Return empty paths to generate pages on-demand
  return {
    paths: [],
    fallback: 'blocking', // or 'blocking' for SSR on first request
  };
}

export async function getStaticProps() {
  // Return empty props since we're using client-side data fetching
  return {
    props: {},
  };
}