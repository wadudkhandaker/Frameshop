import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Primary Meta Tags */}
        <meta name="title" content="Custom Picture Frames Online Australia | frameshop.com.au" />
        <meta name="description" content="Professional custom picture framing services in Australia. Upload, print and frame your pictures online with our frame builder. Quality craftsmanship since 1995. Free quotes available." />
        <meta name="keywords" content="custom picture frames, picture framing, online framing, photo frames, art framing, canvas prints, mat boards, frame builder, Australia, Sydney" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="frameshop.com.au" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://frameshop.com.au/" />
        <meta property="og:title" content="Custom Picture Frames Online Australia | frameshop.com.au" />
        <meta property="og:description" content="Professional custom picture framing services in Australia. Upload, print and frame your pictures online with our frame builder. Quality craftsmanship since 1995." />
        <meta property="og:image" content="https://frameshop.com.au/images/og-image.jpg" />
        <meta property="og:site_name" content="frameshop.com.au" />
        <meta property="og:locale" content="en_AU" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://frameshop.com.au/" />
        <meta property="twitter:title" content="Custom Picture Frames Online Australia | frameshop.com.au" />
        <meta property="twitter:description" content="Professional custom picture framing services in Australia. Upload, print and frame your pictures online with our frame builder. Quality craftsmanship since 1995." />
        <meta property="twitter:image" content="https://frameshop.com.au/images/twitter-image.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="AU-NSW" />
        <meta name="geo.placename" content="Sydney" />
        <meta name="geo.position" content="-33.8688;151.2093" />
        <meta name="ICBM" content="-33.8688, 151.2093" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://frameshop.com.au/" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "frameshop.com.au",
              "url": "https://frameshop.com.au",
              "logo": "https://frameshop.com.au/logo.png",
              "description": "Professional custom picture framing services in Australia since 1995",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Art Street",
                "addressLocality": "Sydney",
                "addressRegion": "NSW",
                "postalCode": "2000",
                "addressCountry": "AU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+61-2-9876-5432",
                "contactType": "customer service",
                "email": "info@frameshop.com.au"
              },
              "sameAs": [
                "https://www.facebook.com/frameshop",
                "https://www.instagram.com/frameshop"
              ]
            })
          }}
        />
        
        {/* Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "frameshop.com.au",
              "image": "https://frameshop.com.au/images/storefront.jpg",
              "@id": "https://frameshop.com.au",
              "url": "https://frameshop.com.au",
              "telephone": "+61-2-9876-5432",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Art Street",
                "addressLocality": "Sydney",
                "addressRegion": "NSW",
                "postalCode": "2000",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -33.8688,
                "longitude": 151.2093
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              },
              "priceRange": "$$"
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}