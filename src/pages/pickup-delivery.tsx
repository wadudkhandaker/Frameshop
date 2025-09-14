import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Truck, MapPin, Clock, Phone, Package, Shield, CreditCard, CheckCircle, Star, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
}

interface PickupLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  image: string;
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Regular delivery to your doorstep',
    price: 49,
    estimatedDays: '5-7 business days',
    icon: <Truck className="w-8 h-8" />,
    features: ['Tracked shipping', 'Insurance included', 'Signature required'],
    popular: true
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Fast delivery for urgent orders',
    price: 89,
    estimatedDays: '2-3 business days',
    icon: <Package className="w-8 h-8" />,
    features: ['Priority handling', 'Express tracking', 'Insurance included', 'Signature required']
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    description: 'Next business day delivery',
    price: 149,
    estimatedDays: '1 business day',
    icon: <Clock className="w-8 h-8" />,
    features: ['Overnight shipping', 'Real-time tracking', 'Full insurance', 'Signature required', 'Priority support']
  }
];

const pickupLocations: PickupLocation[] = [
  {
    id: 'showroom',
    name: 'Frameshop Showroom',
    address: '85-89 Chapel St, Roselands NSW 2196',
    phone: '1300 676 020',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 9AM-5PM, Sun: 10AM-4PM',
    services: ['Frame selection', 'Custom framing', 'Artwork consultation', 'Pickup service'],
    image: '/images/placeholder.jpg'
  },
  {
    id: 'warehouse',
    name: 'Distribution Center',
    address: '15 Industrial Drive, Roselands NSW 2196',
    phone: '1300 676 021',
    hours: 'Mon-Fri: 8AM-5PM, Sat: 9AM-3PM',
    services: ['Bulk orders', 'Commercial pickup', 'Express processing'],
    image: '/images/placeholder.jpg'
  }
];

export default function PickupDelivery() {
  const [selectedDelivery, setSelectedDelivery] = useState<string>('standard');
  const [selectedLocation, setSelectedLocation] = useState<string>('showroom');

  return (
    <>
      <Head>
        <title>Pick up & Delivery - frameshop.com.au</title>
        <meta name="description" content="Flexible pickup and delivery options for your frames and artwork. Choose from standard, express, or overnight delivery, or visit our showroom." />
        <meta name="keywords" content="delivery, pickup, shipping, frames, artwork, showroom, Roselands" />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Truck className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pick up & Delivery
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Flexible options to get your frames and artwork safely to you
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Insured shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Free pickup available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>5-star delivery rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Delivery Option
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the delivery method that best suits your needs and timeline
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {deliveryOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative bg-white rounded-lg shadow-lg border-2 p-8 cursor-pointer transition-all ${
                    selectedDelivery === option.id
                      ? 'border-blue-500 shadow-xl'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDelivery(option.id)}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${option.price}
                    </div>
                    <p className="text-sm text-gray-500">{option.estimatedDays}</p>
                  </div>

                  <div className="space-y-3">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full mt-6 py-3 px-4 rounded-md font-semibold transition-colors ${
                      selectedDelivery === option.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedDelivery === option.id ? 'Selected' : 'Select Option'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pickup Locations */}
        <div className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pickup Locations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Visit our locations to collect your orders or browse our showroom
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pickupLocations.map((location) => (
                <div
                  key={location.id}
                  className={`bg-white rounded-lg shadow-lg border-2 p-6 cursor-pointer transition-all ${
                    selectedLocation === location.id
                      ? 'border-blue-500 shadow-xl'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                        <button
                          className={`px-4 py-1 rounded-full text-sm font-semibold ${
                            selectedLocation === location.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {selectedLocation === location.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{location.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{location.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{location.hours}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Available Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {location.services.map((service, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Process */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Delivery Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From order to delivery, we ensure your items are handled with care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Order Confirmation</h3>
                <p className="text-gray-600 text-sm">We confirm your order and prepare your items with care.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Professional Packing</h3>
                <p className="text-gray-600 text-sm">Items are professionally packed with protective materials.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Shipping</h3>
                <p className="text-gray-600 text-sm">Your package is shipped with full insurance and tracking.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Safe Delivery</h3>
                <p className="text-gray-600 text-sm">Items are delivered safely to your specified address.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2">How long does delivery take?</h3>
                <p className="text-gray-600">
                  Delivery times vary by option: Standard (5-7 days), Express (2-3 days), or Overnight (1 day). 
                  All times are business days.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2">Is shipping insured?</h3>
                <p className="text-gray-600">
                  Yes, all our delivery options include full insurance coverage for your peace of mind.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2">Can I track my order?</h3>
                <p className="text-gray-600">
                  Absolutely! You'll receive a tracking number and can monitor your package's progress in real-time.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2">What if I'm not home for delivery?</h3>
                <p className="text-gray-600">
                  Our delivery partners will attempt delivery and leave a card with instructions for pickup or rescheduling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-xl mb-8">
              Choose your delivery option and get your frames delivered safely to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/frame-builder"
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
