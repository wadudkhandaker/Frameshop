import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import HomeSlider from '@/components/HomeSlider';
import TrendingProducts from '@/components/TrendingProducts';
import ProductTiles from '@/components/ProductTiles';
import TrustedSection from '@/components/TrustedSection';
import AboutSection from '@/components/AboutSection';
import Divider from '@/components/Divider';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Official Memorabilia - Australia's Trusted Sports Memorabilia Destination</title>
        <meta name="description" content="Official Memorabilia is Australia's trusted destination for officially licensed, authentic sports memorabilia and collectables. Shop signed jerseys, lithographs, and exclusive memorabilia from AFL, NRL, Cricket, and international sports." />
        <meta name="keywords" content="sports memorabilia, signed jerseys, AFL memorabilia, NRL memorabilia, cricket memorabilia, official memorabilia, Australia" />
        <link rel="canonical" href="https://www.officialmemorabilia.com.au/" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Official Memorabilia",
              "description": "Australia's trusted destination for officially licensed, authentic sports memorabilia and collectables",
              "url": "https://www.officialmemorabilia.com.au",
              "logo": "https://www.officialmemorabilia.com.au/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+61-1300-676-020",
                "contactType": "customer service"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AU"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main>
          {/* Hero Slider */}
          <HomeSlider />
          
          {/* Divider */}
          <Divider />
          
          {/* Trending Products */}
          <TrendingProducts />
          
          {/* Product Tiles */}
          <ProductTiles />
          
          {/* Divider */}
          <Divider />
          
          {/* Divider */}
          <Divider />
          
          {/* Trusted Section */}
          <TrustedSection />
          
          {/* About Section */}
          <AboutSection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}