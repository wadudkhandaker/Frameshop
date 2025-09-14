import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { X, Plus, ChevronDown, Info } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Checkout() {
  const { items, getTotalPrice, removeItem, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [country, setCountry] = useState('AUSTRALIA');
  const [postcode, setPostcode] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(49.00);

  // Form states
  const [customerForm, setCustomerForm] = useState({
    firstName: '',
    lastName: '',
    phoneCountry: '+61',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    preferredSport: '',
    receiveSMS: false,
    emailUpdates: false,
    shareData: false,
    marketingConsent: false
  });

  const [deliveryForm, setDeliveryForm] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    addressLine1: '',
    addressLine2: '',
    suburb: '',
    state: '',
    postcode: '',
    country: 'AUSTRALIA',
    differentBilling: false
  });

  const handleCustomerInputChange = (field: string, value: string | boolean) => {
    setCustomerForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDeliveryInputChange = (field: string, value: string | boolean) => {
    setDeliveryForm(prev => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Checkout - frameshop.com.au</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
              <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const subtotal = getTotalPrice();
  const grandTotal = subtotal + deliveryCost;

  return (
    <>
      <Head>
        <title>Checkout - frameshop.com.au</title>
        <meta name="description" content="Complete your order at frameshop.com.au" />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN - YOUR CART */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                
                {/* Cart Header */}
                <div>
                  <h2 className="text-2xl font-bold text-red-600 uppercase">YOUR CART</h2>
                </div>

                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-200">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-red-600 font-semibold">${item.price.toFixed(2)}</p>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>Size: ${item.price}</p>
                          <div className="flex items-center space-x-2">
                            <label className="text-xs">Qty:</label>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-12 text-xs border border-gray-300 px-1 py-0.5"
                              min="1"
                              max="99"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Section */}
                <div className="border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm uppercase">PROMO CODE OR GIFT CARD?</h3>
                    <X className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                    />
                    <button className="w-full bg-red-600 text-white py-2 px-4 text-sm font-medium uppercase">
                      APPLY
                    </button>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="border border-gray-200 p-4">
                  <h3 className="font-bold text-sm uppercase mb-3">DELIVERY OPTIONS</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Please choose your country to see available delivery options below.
                  </p>
                  <div className="space-y-3">
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm appearance-none"
                      >
                        <option value="AUSTRALIA">AUSTRALIA</option>
                        <option value="NEW ZEALAND">NEW ZEALAND</option>
                        <option value="UNITED STATES">UNITED STATES</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Postcode"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                    />
                    <p className="text-sm">• Delivery ${deliveryCost.toFixed(2)}</p>
                  </div>
                </div>

                {/* Customers Also Bought */}
                <div className="border border-gray-200 p-4">
                  <h3 className="font-bold text-sm uppercase mb-3">CUSTOMERS ALSO BOUGHT</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src="/images/placeholder.jpg"
                      alt="Jeremy Cameron Coleman Medal Showcase"
                      className="w-12 h-12 object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-xs font-medium">Jeremy Cameron Coleman Medal Showcase</h4>
                      <p className="text-red-600 font-semibold text-sm">$125.00</p>
                    </div>
                    <button className="bg-red-600 text-white p-2">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Totals */}
                <div className="border border-gray-200 p-4">
                  <h3 className="font-bold text-sm uppercase mb-3">TOTALS</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Subtotal</span>
                      <span className="text-sm">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Grand Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500">(Delivery cost to be added at next step)</p>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm">
                      4 interest free payments of ${(grandTotal / 4).toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">afterpay</span>
                      <Link href="#" className="text-xs text-blue-600 underline">info</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MIDDLE COLUMN - ABOUT YOU */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-red-600 uppercase">ABOUT YOU</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={customerForm.firstName}
                        onChange={(e) => handleCustomerInputChange('firstName', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={customerForm.lastName}
                        onChange={(e) => handleCustomerInputChange('lastName', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Country Code
                      </label>
                      <select
                        value={customerForm.phoneCountry}
                        onChange={(e) => handleCustomerInputChange('phoneCountry', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm appearance-none"
                      >
                        <option value="+61">AUSTRALIA</option>
                        <option value="+1">USA</option>
                        <option value="+64">NEW ZEALAND</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={customerForm.phone}
                        onChange={(e) => handleCustomerInputChange('phone', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerForm.email}
                      onChange={(e) => handleCustomerInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={customerForm.marketingConsent}
                      onChange={(e) => handleCustomerInputChange('marketingConsent', e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="marketing" className="text-sm text-gray-700">
                      Yes, I would like to hear from Official Memorabilia regarding order updates, new releases, exclusive promotions, and rare opportunities to meet my sporting hero.
                    </label>
                  </div>
                </div>

                {/* Shop Account */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-sm uppercase mb-3">SHOP ACCOUNT</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Optional: To create an account, add a password below unless you{' '}
                    <Link href="#" className="text-red-600 underline">already have an account?</Link>
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={customerForm.password}
                        onChange={(e) => handleCustomerInputChange('password', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={customerForm.confirmPassword}
                        onChange={(e) => handleCustomerInputChange('confirmPassword', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Sport & Club
                  </label>
                  <select
                    value={customerForm.preferredSport}
                    onChange={(e) => handleCustomerInputChange('preferredSport', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="AFL">AFL</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Rugby">Rugby</option>
                    <option value="Soccer">Soccer</option>
                  </select>
                </div>

                {/* Communication Preferences */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sms"
                      checked={customerForm.receiveSMS}
                      onChange={(e) => handleCustomerInputChange('receiveSMS', e.target.checked)}
                    />
                    <label htmlFor="sms" className="text-sm text-gray-700">
                      I agree to receive SMS updates
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emailUpdates"
                      checked={customerForm.emailUpdates}
                      onChange={(e) => handleCustomerInputChange('emailUpdates', e.target.checked)}
                    />
                    <label htmlFor="emailUpdates" className="text-sm text-gray-700">
                      Sign me up for email updates
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="shareData"
                      checked={customerForm.shareData}
                      onChange={(e) => handleCustomerInputChange('shareData', e.target.checked)}
                    />
                    <label htmlFor="shareData" className="text-sm text-gray-700">
                      I consent to my data being shared with the rights holder (club) relevant to my purchase and/or bidding activity.
                    </label>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  Please Note: Fields marked with an asterisk * must be completed
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - DELIVERY ADDRESS */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-red-600 uppercase">DELIVERY ADDRESS</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.firstName}
                        onChange={(e) => handleDeliveryInputChange('firstName', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.lastName}
                        onChange={(e) => handleDeliveryInputChange('lastName', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                    <p className="text-sm text-yellow-800">
                      <strong>Please Note:</strong> We do not ship to PO boxes
                    </p>
                  </div>

                  <p className="text-sm text-gray-600">
                    Please utilise our auto-address input feature below where possible. If your address does not appear, you can enter it in manually. Please enter your address details in the correct fields to avoid any potential issues with delivery.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={deliveryForm.businessName}
                      onChange={(e) => handleDeliveryInputChange('businessName', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={deliveryForm.addressLine1}
                      onChange={(e) => handleDeliveryInputChange('addressLine1', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={deliveryForm.addressLine2}
                      onChange={(e) => handleDeliveryInputChange('addressLine2', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Suburb / City *
                    </label>
                    <input
                      type="text"
                      value={deliveryForm.suburb}
                      onChange={(e) => handleDeliveryInputChange('suburb', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State / County *
                    </label>
                    <select
                      value={deliveryForm.state}
                      onChange={(e) => handleDeliveryInputChange('state', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                      required
                    >
                      <option value="">SELECT STATE</option>
                      <option value="NSW">NSW</option>
                      <option value="VIC">VIC</option>
                      <option value="QLD">QLD</option>
                      <option value="WA">WA</option>
                      <option value="SA">SA</option>
                      <option value="TAS">TAS</option>
                      <option value="ACT">ACT</option>
                      <option value="NT">NT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode / Zip *
                    </label>
                    <input
                      type="text"
                      value={deliveryForm.postcode}
                      onChange={(e) => handleDeliveryInputChange('postcode', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      value={deliveryForm.country}
                      onChange={(e) => handleDeliveryInputChange('country', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm"
                      required
                    >
                      <option value="AUSTRALIA">AUSTRALIA</option>
                      <option value="NEW ZEALAND">NEW ZEALAND</option>
                      <option value="UNITED STATES">UNITED STATES</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="differentBilling"
                      checked={deliveryForm.differentBilling}
                      onChange={(e) => handleDeliveryInputChange('differentBilling', e.target.checked)}
                    />
                    <label htmlFor="differentBilling" className="text-sm text-gray-700">
                      Specify a different billing address
                    </label>
                  </div>

                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 text-lg uppercase transition-colors">
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Button */}
        <button className="fixed bottom-6 right-6 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors">
          <Info className="w-6 h-6 mx-auto" />
        </button>
      </main>
      
      <Footer />
    </>
  );
}
