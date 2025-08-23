import React from 'react';

export default function AboutSection() {
  return (
    <section className="aboutMain py-16 bg-gray-50">
      <div className="content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="colSpan1">
            <p className="text-gray-700 leading-relaxed mb-6">
              When it comes to officially licensed, authentic sports memorabilia and collectables, 
              Official Memorabilia is Australia's trusted destination. We specalise in delivering 
              high quality, exclusive and authentic products that provide an enduring connection 
              with your heroes and moments of triumph that shape you.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              We have tremendous pride in what we do, and it shows. Securing something with which 
              you or a loved one might enjoy such a profound personal and emotional connection 
              requires trust and integrity. Every time a first-time client or a long-time collector 
              demonstrates this by entrusting us with that connection, it's important to us that 
              you do so with confidence and assurance.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              We are privileged to work directly with many of the most prominent sporting bodies 
              and rights holders both domestically and abroad, and we have similarly strong 
              relationships directly with the athletes themselves who allow us to create and 
              share our products.
            </p>
          </div>
          
          <div className="colSpan1">
            <p className="text-gray-700 leading-relaxed mb-6">
              Every product offered is produced to the highest standard possible, and you can 
              secure your piece of history with the assurance that it is real, that it is 
              authentic and that it has been manufactured under license with the express 
              permission and endorsement of the sporting body and the athlete featured. 
              Don't risk your purchase by going anywhere else.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Whether you're looking for a personally signed piece from an Australian legend 
              or sporting team such as Dustin Martin, Craig Lowndes or Johnathan Thurston, 
              or perhaps a global icon such as Michael Jordan, Tom Brady, or Lionel Messi, 
              Official Memorabilia is the destination.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 