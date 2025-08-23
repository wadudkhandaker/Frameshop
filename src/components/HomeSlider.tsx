import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "NEW RELEASE",
    subtitle: "One final release, we've gone retro!",
    ctaText: "SHOP NOW",
    ctaLink: "/afl/fremantle",
    image: "https://officialmemorabiliaau.b-cdn.net/img/sliders/large-609-cs1797-om-nat-fyfe-retirement-club-assetsdesktop-slider2560x700.jpg",
    alt: "NEW RELEASE"
  },
  {
    id: 2,
    title: "CELEBRATING BOAKY",
    subtitle: "Celebrate a Port Adelaide champion – shop the exclusive Travis Boak signed range now",
    ctaText: "VIEW THE RANGE",
    ctaLink: "/afl/port-adelaide",
    image: "https://officialmemorabiliaau.b-cdn.net/img/sliders/large-608-travis-boak-desktop.jpg",
    alt: "Celebrating Boaky"
  },
  {
    id: 3,
    title: "WALLABIES",
    subtitle: "Forged In Gold",
    ctaText: "VIEW THE RANGE",
    ctaLink: "/worlds-best/british-irish-lions",
    image: "https://officialmemorabiliaau.b-cdn.net/img/sliders/large-604-cs2175-om-wallabies-assetsdesktop-slider2560x700.jpg",
    alt: "WALLABIES"
  },
  {
    id: 4,
    title: "CELEBRATING BREUST",
    subtitle: "A farewell to a Hawthorn legend",
    ctaText: "SHOP NOW",
    ctaLink: "/afl/hawthorn",
    image: "https://officialmemorabiliaau.b-cdn.net/img/sliders/large-612-luke-breust-desktop-slider-2560-700.jpg",
    alt: "CELEBRATING BREUST"
  },
  {
    id: 5,
    title: "BRITISH & IRISH LIONS",
    subtitle: "One team. Four nations. United in legacy.",
    ctaText: "VIEW THE RANGE",
    ctaLink: "/worlds-best/british-irish-lions",
    image: "https://officialmemorabiliaau.b-cdn.net/img/sliders/large-596-jobnumber-namedesktop-slider2560x700.jpg",
    alt: "BRITISH & IRISH LIONS"
  },
  {
    id: 6,
    title: "QLD MAROONS",
    subtitle: "New releases: Due to overwhelming demand",
    ctaText: "SELLING FAST",
    ctaLink: "/nrl/queensland-maroons",
    image: "https://officialmemorabiliaau.b-cdn.net/img/sliders/large-601-cs2136-soo-2025-state-of-origin-om-assetsdesktop-slider2560x700.jpg",
    alt: "QLD MAROONS"
  }
];

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="slider relative">
      <div className="flexslider relative overflow-hidden">
        <div className="flex-viewport" style={{ overflow: 'hidden', position: 'relative' }}>
          <ul 
            className="slides flex transition-transform duration-600 ease-in-out"
            style={{ 
              width: `${slides.length * 100}%`,
              transform: `translate3d(-${(currentSlide * 100) / slides.length}%, 0px, 0px)`
            }}
          >
            {slides.map((slide, index) => (
              <li 
                key={slide.id}
                className={`slide ${index === currentSlide ? 'flex-active-slide' : ''}`}
                style={{ width: `${100 / slides.length}%`, float: 'left', display: 'block' }}
              >
                <div className="textOverlay flex-caption absolute inset-0 flex flex-col justify-center items-start text-white p-8 md:p-16 z-10">
                  <p className="mainHead text-2xl md:text-4xl font-bold mb-2">{slide.title}</p>
                  <p className="subHead text-lg md:text-xl mb-6 max-w-md">{slide.subtitle}</p>
                  <Link 
                    href={slide.ctaLink}
                    className="submit bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span>{slide.ctaText}</span>
                  </Link>
                </div>
                <Link href={slide.ctaLink}>
                  <img 
                    src={slide.image} 
                    alt={slide.alt} 
                    className="w-full h-[400px] md:h-[600px] object-cover"
                    draggable="false"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Pagination Dots */}
        <ol className="flex-control-nav flex-control-paging absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <li key={index}>
              <button
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            </li>
          ))}
        </ol>
        
        {/* Pause/Play Button */}
        <div className="flex-pauseplay absolute top-4 right-4 z-20">
          <button
            onClick={togglePause}
            className="bg-black/50 text-white px-3 py-1 rounded text-sm hover:bg-black/75 transition-colors duration-200"
          >
            {isPaused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </section>
  );
} 