import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface AuctionItem {
  id: string;
  title: string;
  currentBid: string;
  timeLeft: string;
  image: string;
  link: string;
}

const auctionItems: AuctionItem[] = [
  {
    id: '5833657',
    title: 'Travis Boak #10 Port Adelaide Match-Worn Signed...',
    currentBid: '$9,025.00',
    timeLeft: '4d, 11h, 47m',
    image: 'https://vafloc02.s3.amazonaws.com/isyn/images/f197/img-4532197-m.jpg',
    link: 'http://auctions.officialmemorabilia.com.au/iSynApp/auctionDisplay.action?sid=1104281&auctionId=5833657&utm_source=sep&utm_medium=Auction%20Widget&utm_campaign=Widget'
  },
  {
    id: '5833656',
    title: 'Dayne Zorko 300th AFL Game Milestone Guernsey',
    currentBid: '$2,125.00',
    timeLeft: '4d, 12h, 17m',
    image: 'https://vafloc02.s3.amazonaws.com/isyn/images/f196/img-4532196-m.jpg',
    link: 'http://auctions.officialmemorabilia.com.au/iSynApp/auctionDisplay.action?sid=1104281&auctionId=5833656&utm_source=sep&utm_medium=Auction%20Widget&utm_campaign=Widget'
  },
  {
    id: '5833658',
    title: 'Travis Boak #10 Port Adelaide Match-Worn Signed...',
    currentBid: '$850.00',
    timeLeft: '4d, 11h, 52m',
    image: 'https://vafloc02.s3.amazonaws.com/isyn/images/f221/img-4532221-m.jpg',
    link: 'http://auctions.officialmemorabilia.com.au/iSynApp/auctionDisplay.action?sid=1104281&auctionId=5833658&utm_source=sep&utm_medium=Auction%20Widget&utm_campaign=Widget'
  },
  {
    id: '5833659',
    title: 'Travis Boak #10 Port Adelaide Match-Worn Signed...',
    currentBid: '$1,075.00',
    timeLeft: '4d, 11h, 57m',
    image: 'https://vafloc02.s3.amazonaws.com/isyn/images/f237/img-4532237-m.jpg',
    link: 'http://auctions.officialmemorabilia.com.au/iSynApp/auctionDisplay.action?sid=1104281&auctionId=5833659&utm_source=sep&utm_medium=Auction%20Widget&utm_campaign=Widget'
  },
  {
    id: '5833663',
    title: 'Travis Boak Signed Final Game Match Used Sherri...',
    currentBid: '$4,025.00',
    timeLeft: '4d, 12h, 17m',
    image: 'https://vafloc02.s3.amazonaws.com/isyn/images/f234/img-4532234-m.jpg',
    link: 'http://auctions.officialmemorabilia.com.au/iSynApp/auctionDisplay.action?sid=1104281&auctionId=5833663&utm_source=sep&utm_medium=Auction%20Widget&utm_campaign=Widget'
  },
  {
    id: '5830093',
    title: 'Lloyd Meek #17 Hawthorn 2025 Gold Heritage Matc...',
    currentBid: '$875.00',
    timeLeft: '4d, 12h, 13m',
    image: 'https://vafloc02.s3.amazonaws.com/isyn/images/f922/img-4529922-m.jpg',
    link: 'http://auctions.officialmemorabilia.com.au/iSynApp/auctionDisplay.action?sid=1104281&auctionId=5830093&utm_source=sep&utm_medium=Auction%20Widget&utm_campaign=Widget'
  }
];

export default function LiveAuctions() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % auctionItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % auctionItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + auctionItems.length) % auctionItems.length);
  };

  return (
    <section className="colCount2 py-12 bg-white" style={{ display: 'block', width: '90%', margin: '0 auto' }}>
      <div className="cd-ondemand-container bg-white">
        <div className="cd-ondemand cd-ondemand--active">
          <h1 className="section-title mb-4 mt-4 text-center text-3xl font-bold text-black">
            Live Auctions
          </h1>
          
          <div className="cdo-slick relative">
            {/* Previous Button */}
            <button 
              type="button" 
              className="slick-prev slick-arrow absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-200"
              onClick={prevSlide}
              aria-label="Previous"
            >
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Next Button */}
            <button 
              type="button" 
              className="slick-next slick-arrow absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-200"
              onClick={nextSlide}
              aria-label="Next"
            >
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="slick-list overflow-hidden">
              <div className="slick-track flex transition-transform duration-500 ease-in-out">
                {auctionItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`cdo-list-item slick-slide ${index === currentIndex ? 'slick-current slick-active' : ''}`}
                    style={{ width: '431px', minWidth: '431px' }}
                  >
                    <div className="cdo-list-item__image">
                      <Link href={item.link} target="_blank">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </Link>
                    </div>
                    
                    <div className="cdo-list-item__body p-4 bg-white rounded-b-lg shadow-lg">
                      <h1 className="cdo-list-item__title text-lg font-semibold mb-3">
                        <Link 
                          href={item.link} 
                          target="_blank"
                          className="text-black hover:text-red-600 transition-colors duration-200"
                        >
                          {item.title}
                        </Link>
                      </h1>
                      
                      <ul className="cdo-list-item__details space-y-2 mb-4">
                        <li className="cdo-closes text-red-600 text-sm">
                          Closes in <strong>{item.timeLeft}</strong>
                        </li>
                        <li className="cdo-current-bid text-black text-sm">
                          Current Bid: <strong className="cdo-current-bid-value">{item.currentBid}</strong>
                        </li>
                      </ul>
                      
                      <div className="cdo-action">
                        <Link 
                          href={item.link}
                          target="_blank"
                          className="cdo-btn--action bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition-colors duration-200 inline-block"
                        >
                          Bid Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 