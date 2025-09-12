import React from 'react';
import Head from 'next/head';
import FrameBuilder from '@/components/FrameBuilder';
import Header from '@/components/Header';

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
        <Header />
        <FrameBuilder />
      </div>
    </>
  );
};

export default FrameBuilderPage;