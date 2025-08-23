import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { HelpCircle, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Need Help? - Contact Us | frameshop.com.au</title>
        <meta name="description" content="Get in touch with frameshop.com.au for support, FAQs, and visit our showroom at 85-89 Chapel St, Roselands NSW 2196." />
        <meta name="keywords" content="contact us, support, help, frameshop, showroom, Roselands, NSW" />
        <link rel="canonical" href="https://frameshop.com.au/contact" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Title */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Need Help?</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Contact and Support */}
            <div className="space-y-8">
              
              {/* FAQs Section */}
              <div>
                <div className="flex items-center mb-4">
                  <HelpCircle className="w-6 h-6 text-gray-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">View our FAQs</h2>
                </div>
                <Link 
                  href="/faqs" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Click here to browse our Frequently Asked Questions
                </Link>
              </div>

              {/* Contact Form Component */}
              <ContactForm />
            </div>

            {/* Right Column - Location Information */}
            <div className="space-y-6">
              
              {/* Find Us Section */}
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-gray-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Find Us</h2>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We welcome all visitors during our opening hours, so come on in and have a browse in our newly renovated showroom. Our staff are also available to help you get your walls decorated the way you want them. No appointments necessary!
                </p>
                <p className="text-gray-900">
                  <span className="font-medium">Address:</span> 85-89 Chapel St, Roselands NSW 2196
                </p>
              </div>

              {/* Google Maps Embed */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.1234567890123!2d151.12345678901234!3d-33.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b1234567890%3A0x1234567890abcdef!2s85-89+Chapel+St%2C+Roselands+NSW+2196%2C+Australia!5e0!3m2!1sen!2sau!4v1234567890123"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="frameshop.com.au location"
                  className="w-full h-96"
                ></iframe>
              </div>

              {/* Map Info Box */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-900 mb-2">frameshop.com.au</h3>
                <p className="text-gray-600 text-sm mb-2">85/89 Chapel St, Roselands NSW 2196</p>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">4.9 (522 reviews)</span>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href="https://maps.google.com/maps?q=85-89+Chapel+St,+Roselands+NSW+2196"
                    target="_blank"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Directions
                  </Link>
                  <Link 
                    href="https://maps.google.com/maps?q=85-89+Chapel+St,+Roselands+NSW+2196"
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    View larger map
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 