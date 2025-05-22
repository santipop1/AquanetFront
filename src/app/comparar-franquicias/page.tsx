'use client';
import React, { useRef, useEffect, useState } from 'react';
import CardFranquicias from '@/components/cardFranquicias/cardFranquicias';

const Page = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const numCards = 10;
  const cardWidth = 320;

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const scrollToCard = (index: number) => {
    carouselRef.current?.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  const updateActiveIndex = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const ref = carouselRef.current;
    if (!ref) return;
    ref.addEventListener('scroll', updateActiveIndex);
    return () => ref.removeEventListener('scroll', updateActiveIndex);
  }, []);

  const cardData = Array.from({ length: numCards }).map((_, index) => ({
    pretitle: `Pretitle ${index + 1}`,
    title: `Franquicia ${index + 1}`,
    description: `Esta es la tarjeta número ${index + 1}.`,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  }));

  return (
    <main className="relative flex flex-col items-center min-h-screen bg-gray-100 p-6 gap-4">
      <div className="relative w-full max-w-6xl">
        {/* Carrusel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 p-2 scroll-smooth touch-auto scrollbar-hide"
        >
          {cardData.map((card, i) => (
            <div key={i} className="snap-start flex-shrink-0 w-[320px]">
              <CardFranquicias
                pretitle={card.pretitle}
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                onPrimaryClick={() => alert(`Primary clicked on card ${i + 1}`)}
                onSecondaryClick={() => alert(`Secondary clicked on card ${i + 1}`)}
              />
            </div>
          ))}
        </div>

        {/* 🡄 Flecha izquierda aesthetic */}
        <button
          onClick={scrollLeft}
          className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-semibold shadow-md transition z-10"
        >
          ←
        </button>

        {/* 🡆 Flecha derecha aesthetic */}
        <button
          onClick={scrollRight}
          className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-semibold shadow-md transition z-10"
        >
          →
        </button>
      </div>

      {/* 🔘 Indicadores clicables */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: numCards }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-blue-600 scale-110' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
