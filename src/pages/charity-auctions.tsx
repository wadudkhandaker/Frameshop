import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Heart, Clock, Users, MapPin, Phone, Calendar, Star, Gavel, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CharityAuction {
  id: string;
  title: string;
  description: string;
  charity: string;
  currentBid: number;
  startingBid: number;
  timeLeft: string;
  image: string;
  bidders: number;
  category: string;
  featured: boolean;
}

const mockAuctions: CharityAuction[] = [
  {
    id: '1',
    title: 'AFL Grand Final Signed Jersey Collection',
    description: 'Complete collection of signed jerseys from all 18 AFL clubs, framed and authenticated.',
    charity: 'Beyond Blue',
    currentBid: 2850,
    startingBid: 500,
    timeLeft: '2 days 14 hours',
    image: '/images/placeholder.jpg',
    bidders: 23,
    category: 'Sports Memorabilia',
    featured: true
  },
  {
    id: '2',
    title: 'Cricket Legends Meet & Greet Experience',
    description: 'Exclusive meet and greet with cricket legends, including signed memorabilia and photo opportunities.',
    charity: 'Australian Red Cross',
    currentBid: 1200,
    startingBid: 200,
    timeLeft: '5 days 8 hours',
    image: '/images/placeholder.jpg',
    bidders: 15,
    category: 'Experiences',
    featured: true
  },
  {
    id: '3',
    title: 'Rugby World Cup Final Ball',
    description: 'Official match ball from the Rugby World Cup Final, signed by the winning team.',
    charity: 'Save the Children',
    currentBid: 850,
    startingBid: 150,
    timeLeft: '1 day 6 hours',
    image: '/images/placeholder.jpg',
    bidders: 8,
    category: 'Sports Memorabilia',
    featured: false
  },
  {
    id: '4',
    title: 'Soccer Championship Trophy Replica',
    description: 'Authentic replica of the championship trophy, perfect for display.',
    charity: 'Cancer Council Australia',
    currentBid: 650,
    startingBid: 100,
    timeLeft: '3 days 12 hours',
    image: '/images/placeholder.jpg',
    bidders: 12,
    category: 'Trophies',
    featured: false
  }
];

export default function CharityAuctions() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Sports Memorabilia', 'Experiences', 'Trophies', 'Artwork'];
  
  const filteredAuctions = mockAuctions.filter(auction => 
    selectedCategory === 'All' || auction.category === selectedCategory
  );

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return b.featured ? 1 : -1;
      case 'ending-soon':
        return a.timeLeft.localeCompare(b.timeLeft);
      case 'highest-bid':
        return b.currentBid - a.currentBid;
      default:
        return 0;
    }
  });

  return (
    <>
      <Head>
        <title>Charity Auctions - frameshop.com.au</title>
        <meta name="description" content="Support worthy causes through our charity auctions featuring exclusive sports memorabilia and experiences." />
        <meta name="keywords" content="charity auctions, sports memorabilia, fundraising, beyond blue, red cross, save the children" />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Charity Auctions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Support worthy causes while bidding on exclusive sports memorabilia and experiences
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Supporting 15+ charities</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>$50,000+ raised</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>500+ active bidders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Charities */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Supporting These Amazing Charities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {['Beyond Blue', 'Australian Red Cross', 'Save the Children', 'Cancer Council Australia', 'RSPCA'].map((charity) => (
                <div key={charity} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <h3 className="font-semibold text-sm text-gray-900">{charity}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="ending-soon">Ending Soon</option>
                  <option value="highest-bid">Highest Bid</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Auctions Grid */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedAuctions.map((auction) => (
                <div key={auction.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${auction.featured ? 'ring-2 ring-red-500' : ''}`}>
                  {auction.featured && (
                    <div className="bg-red-600 text-white text-center py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 inline mr-1" />
                      FEATURED AUCTION
                    </div>
                  )}
                  
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                        {auction.category}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {auction.bidders} bidders
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {auction.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {auction.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Heart className="w-4 h-4 mr-1 text-red-500" />
                        Supporting: <span className="font-semibold ml-1">{auction.charity}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        Time left: <span className="font-semibold ml-1 text-orange-600">{auction.timeLeft}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Current Bid</p>
                        <p className="text-2xl font-bold text-red-600">${auction.currentBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Starting Bid</p>
                        <p className="text-lg font-semibold text-gray-900">${auction.startingBid}</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center">
                      <Gavel className="w-4 h-4 mr-2" />
                      Place Bid
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              How Charity Auctions Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Browse & Bid</h3>
                <p className="text-gray-600">Explore our charity auctions and place your bids on items you love.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Win & Donate</h3>
                <p className="text-gray-600">If you win, your payment goes directly to the charity while you get your item.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
                <p className="text-gray-600">Your winning bid helps support important causes and communities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-red-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Donate Items for Auction?</h2>
            <p className="text-xl mb-8">
              Help us support more charities by donating sports memorabilia or experiences for auction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
                Donate Items
              </button>
              <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-red-600 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
