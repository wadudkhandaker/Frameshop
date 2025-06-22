import React from 'react';
import Head from 'next/head';
import { ArrowRight, Frame } from 'lucide-react';
import FrameBuilder from '@/components/FrameBuilder';
import Link from 'next/link';

const FrameBuilderPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Frame Builder - Design Custom Picture Frames Online | frameshop.com.au</title>
        <meta name="description" content="Design your custom picture frame online with our interactive frame builder. Choose from hundreds of frame styles, mat boards, glass options and see live preview. Free shipping Australia wide." />
        <meta name="keywords" content="frame builder, custom frames online, picture frame designer, online framing tool, frame configurator, Australia" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://frameshop.com.au/frame-builder" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Frame Builder - Design Custom Picture Frames Online | frameshop.com.au" />
        <meta property="og:description" content="Design your custom picture frame online with our interactive frame builder. Choose from hundreds of frame styles, mat boards, glass options and see live preview." />
        <meta property="og:url" content="https://frameshop.com.au/frame-builder" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data for WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Frame Builder",
              "description": "Interactive online tool to design custom picture frames",
              "url": "https://frameshop.com.au/frame-builder",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "AUD",
                "description": "Free to use frame design tool"
              },
              "provider": {
                "@type": "Organization",
                "name": "frameshop.com.au"
              }
            })
          }}
        />
      </Head>
      
      <div>
        {/* Simple header for builder */}
        <nav className="bg-blue-800 shadow-sm border-b" role="navigation" aria-label="Frame builder navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                className="flex items-center text-white hover:text-blue-200 transition-colors"
                aria-label="Back to home page"
              >
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" aria-hidden="true" />
                Back to Home
              </Link>
              <div className="flex items-center">
                <Frame className="w-8 h-8 text-white mr-2" aria-hidden="true" />
                <span className="text-xl font-bold text-white">frameshop.com.au</span>
              </div>
            </div>
          </div>
        </nav>
        <FrameBuilder />
      </div>
    </>
  );
};

export default FrameBuilderPage;