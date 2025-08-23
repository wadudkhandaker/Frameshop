import React from 'react';

export default function TrustedSection() {
  return (
    <section className="trusted colCount2 py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">As Seen On</h2>
        </div>
        
        <div className="colSpan2 flex justify-center">
          <img 
            className="desktop-visible max-w-full h-auto"
            src="https://officialmemorabiliaau.b-cdn.net/img/tiles/37-cs0452-om-2021-as-seen-on-banner-2560x122.jpg"
            alt="As Seen On Desktop"
          />
        </div>
      </div>
    </section>
  );
} 