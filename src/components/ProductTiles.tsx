import React from 'react';
import Link from 'next/link';

interface Tile {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const tiles: Tile[] = [
  {
    id: '1',
    title: 'Become an Insider',
    subtitle: 'SIGN-UP NOW',
    image: 'https://officialmemorabiliaau.b-cdn.net/img/tiles/31-omhometileportraitsubscribe.jpg',
    link: '/account-create'
  },
  {
    id: '2',
    title: 'BRITISH & IRISH LIONS',
    subtitle: 'BUY NOW',
    image: 'https://officialmemorabiliaau.b-cdn.net/img/tiles/32-bil-tile-update.jpg',
    link: 'https://www.officialmemorabilia.com.au/worlds-best/british-irish-lions/'
  },
  {
    id: '3',
    title: 'PREMIERS JERSEY',
    subtitle: 'BUY NOW',
    image: 'https://officialmemorabiliaau.b-cdn.net/img/tiles/29-omhometilepanthersjerseyv4.jpg',
    link: '/pre-order-penrith-panthers-2024-premiers-team-signed-jersey-5457.phtml'
  },
  {
    id: '4',
    title: 'VEGAS HELMETS',
    subtitle: 'BUY NOW',
    image: 'https://officialmemorabiliaau.b-cdn.net/img/tiles/30-helmetsmobilev3.jpg',
    link: '/nrl/'
  },
  {
    id: '5',
    title: 'QUEENSLAND MAROONS',
    subtitle: 'BUY NOW',
    image: 'https://officialmemorabiliaau.b-cdn.net/img/tiles/28-qld-homepage-tile.jpg',
    link: 'https://www.officialmemorabilia.com.au/nrl/queensland-maroons/'
  },
  {
    id: '6',
    title: 'Live Auction',
    subtitle: 'BID NOW',
    image: 'https://officialmemorabiliaau.b-cdn.net/img/tiles/33-om-homepage-auction.jpg',
    link: 'https://auctions.officialmemorabilia.com.au/'
  }
];

export default function ProductTiles() {
  return (
    <section className="tiles py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((tile) => (
            <Link 
              key={tile.id} 
              href={tile.link}
              className="tile group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div 
                className="imageBG w-full h-64 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${tile.image})` }}
              />
              
              <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white">
                  <span className="mainText block text-xl font-bold mb-1">{tile.title}</span>
                  <span className="inlineSummary text-sm opacity-90">{tile.subtitle}</span>
                </h3>
                <span className="submit submitSecondary text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore {tile.link}
                </span>
              </div>
              
              <div className="overlayHover absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="submit submitSecondary text-white font-semibold">
                  Explore {tile.link}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 