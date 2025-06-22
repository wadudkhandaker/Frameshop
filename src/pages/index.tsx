import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Frame, 
  Clock,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  User,
  Truck
} from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';
import FrameBuilder from '@/components/FrameBuilder';
import { useHomeState } from '@/hooks/useHomeState';
import { getServices, benefits, galleryItems, productCategories } from '@/data/homeData';

export default function Home() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    isQuoteModalOpen,
    currentView,
    openQuoteModal,
    closeQuoteModal,
    startFrameBuilder,
    backToHome,
  } = useHomeState();

  const services = getServices();

  if (currentView === 'builder') {
    return (
      <>
        <Head>
          <title>Frame Builder - Custom Picture Frames Online | frameshop.com.au</title>
          <meta name="description" content="Design your custom picture frame online with our interactive frame builder. Choose from hundreds of frame styles, mat boards, and glass options." />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://frameshop.com.au/frame-builder" />
        </Head>
        <div>
          {/* Simple header for builder */}
          <nav className="bg-blue-800 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <button
                  onClick={backToHome}
                  className="flex items-center text-white hover:text-blue-200 transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                  Back to Home
                </button>
                <div className="flex items-center">
                  <Frame className="w-8 h-8 text-white mr-2" />
                  <span className="text-xl font-bold text-white">frameshop.com.au</span>
                </div>
              </div>
            </div>
          </nav>
          <FrameBuilder />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Custom Picture Frames Online Australia | frameshop.com.au</title>
        <meta name="description" content="Professional custom picture framing services in Australia. Upload, print and frame your pictures online with our frame builder. Quality craftsmanship since 1995. Free quotes available." />
        <meta name="keywords" content="custom picture frames, picture framing, online framing, photo frames, art framing, canvas prints, mat boards, frame builder, Australia, Sydney" />
        <link rel="canonical" href="https://frameshop.com.au/" />
        
        {/* Structured Data for Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Custom Picture Framing",
              "description": "Professional custom picture framing services with online frame builder",
              "provider": {
                "@type": "Organization",
                "name": "frameshop.com.au"
              },
              "areaServed": "Australia",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Picture Framing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom Picture Framing"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Acrylic Photo Prints"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Photo Printing Online"
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Top Header Bar */}
        <div className="bg-blue-800 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-1" />
                  <span>Free Delivery Australia Wide</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>Contact Us</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  <span>0 Items $0.00</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>Login</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50 border-b" role="navigation" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Frame className="w-8 h-8 text-blue-800 mr-2" aria-hidden="true" />
                <span className="text-xl font-bold text-blue-800">frameshop.com.au</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <Link href="#frames" className="text-gray-700 hover:text-blue-800 transition-colors duration-200 font-medium">Picture Frames</Link>
                <Link href="#printing" className="text-gray-700 hover:text-blue-800 transition-colors duration-200 font-medium">Printing Services</Link>
                <Link href="#acrylic" className="text-gray-700 hover:text-blue-800 transition-colors duration-200 font-medium">Acrylic Products</Link>
                <Link href="#canvas" className="text-gray-700 hover:text-blue-800 transition-colors duration-200 font-medium">Canvas Products</Link>
                <Link href="#boards" className="text-gray-700 hover:text-blue-800 transition-colors duration-200 font-medium">Mat Boards & Accessories</Link>
                <Link href="#sale" className="text-red-600 hover:text-red-700 transition-colors duration-200 font-medium">On Sale</Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 hover:text-blue-800 transition-colors duration-200"
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                  <Link href="#frames" className="block px-3 py-2 text-gray-700 hover:text-blue-800 transition-colors duration-200">Picture Frames</Link>
                  <Link href="#printing" className="block px-3 py-2 text-gray-700 hover:text-blue-800 transition-colors duration-200">Printing Services</Link>
                  <Link href="#acrylic" className="block px-3 py-2 text-gray-700 hover:text-blue-800 transition-colors duration-200">Acrylic Products</Link>
                  <Link href="#canvas" className="block px-3 py-2 text-gray-700 hover:text-blue-800 transition-colors duration-200">Canvas Products</Link>
                  <Link href="#boards" className="block px-3 py-2 text-gray-700 hover:text-blue-800 transition-colors duration-200">Mat Boards & Accessories</Link>
                  <Link href="#sale" className="block px-3 py-2 text-red-600 hover:text-red-700 transition-colors duration-200">On Sale</Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gray-900 py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg)',
              filter: 'brightness(0.3)'
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              CUSTOM PICTURE FRAMES
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Design your perfect frame online - be the designer
            </p>
            <button 
              onClick={startFrameBuilder}
              className="bg-white text-gray-800 px-12 py-4 text-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
              aria-label="Start designing your custom frame"
            >
              start framing
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Framing Services</h2>
              <p className="text-xl text-gray-600">Professional picture framing services tailored to your needs</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {services.map((service, index) => (
                <article key={index} className="text-center">
                  <div className="mb-6 flex justify-center" aria-hidden="true">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={service.title.includes('Custom') ? 
                        "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg" :
                        service.title.includes('Acrylic') ?
                        "https://images.pexels.com/photos/1194025/pexels-photo-1194025.jpeg" :
                        "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg"
                      }
                      alt={`${service.title} service example`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="py-16 bg-gray-50" id="products">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our wide range of framing products and services to showcase your memories and artwork
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {productCategories.map((category, index) => (
                <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Link href="#" className="block">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={`${category.title} - ${category.description}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Framing Services?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  With over 25 years of experience, we combine traditional craftsmanship with modern techniques 
                  to deliver exceptional results that protect and enhance your valuable artwork.
                </p>
                
                <ul className="space-y-4" role="list">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1194025/pexels-photo-1194025.jpeg"
                  alt="Professional framing workshop showing quality craftsmanship"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-6 left-6 bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold">
                  25+ Years Experience
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Work Gallery</h2>
              <p className="text-xl text-gray-600">
                Explore our portfolio of custom framing projects and get inspired for your next piece.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => (
                <article key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.category} framing example`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-200">{item.category}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Frame Your Memories?</h2>
              <p className="text-xl opacity-90">
                Contact us today for a free consultation and quote on your custom framing project.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Phone className="w-12 h-12 mx-auto mb-4 opacity-90" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="opacity-90">
                  <a href="tel:+61298765432" className="hover:underline">+61 2 9876 5432</a>
                </p>
              </div>
              <div className="text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="opacity-90">
                  <a href="mailto:info@frameshop.com.au" className="hover:underline">info@frameshop.com.au</a>
                </p>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-90" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <address className="opacity-90 not-italic">123 Art Street, Sydney NSW 2000</address>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={openQuoteModal}
                className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                aria-label="Schedule a consultation for custom framing"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Frame className="w-8 h-8 text-blue-400 mr-2" aria-hidden="true" />
                  <span className="text-xl font-bold">frameshop.com.au</span>
                </div>
                <p className="text-gray-400">
                  Professional custom picture framing services in Sydney. Quality craftsmanship since 1995.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400" role="list">
                  <li>Custom Picture Framing</li>
                  <li>Art Consultation</li>
                  <li>Conservation Framing</li>
                  <li>Express Service</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400" role="list">
                  <li><Link href="#home" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="#gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                  <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <address className="space-y-2 text-gray-400 not-italic">
                  <p>123 Art Street</p>
                  <p>Sydney NSW 2000</p>
                  <p><a href="tel:+61298765432" className="hover:text-white transition-colors">+61 2 9876 5432</a></p>
                  <p><a href="mailto:info@frameshop.com.au" className="hover:text-white transition-colors">info@frameshop.com.au</a></p>
                </address>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} frameshop.com.au. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Quote Modal */}
        <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
      </div>
    </>
  );
}