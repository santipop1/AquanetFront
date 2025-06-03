'use client';

import React, { useEffect, useState } from 'react';
import CardFranquicias from '@/components/cardFranquicias/cardFranquicias';
import { getWaterPlantTypes, WaterPlantTypeCard } from '@/services/waterPlantTypes';
import './page.css';

export default function Page() {
  const [franquiciasData, setFranquiciasData] = useState<WaterPlantTypeCard[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWaterPlantTypes();
        setFranquiciasData(data);
      } catch (error) {
        console.error('No se pudieron cargar las franquicias.');
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <main className="main-container">
      <h1 className="page-title">Franquicias disponibles</h1>
      <div className="grid-container">
        {franquiciasData.map((item, index) => (
          <CardFranquicias
            key={index}
            title={item.title}
            brand={item.brand}
            year={item.year}
            description={item.description}
            imageUrl={item.imageUrl}
            price={item.price}
            size={item.size}
            isActive={activeIndex === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </main>
  );
}
