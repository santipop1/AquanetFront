// components/Map.tsx
'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnVzaC0xOCIsImEiOiJjbTl2d2dwc20wcHYzMmlvaDdvcGJhZnZ5In0._lSZIwf9zvy9WfILLAjn6g'; // ⬅️ Coloca aquí tu token

type Props = {
  lng: number;
  lat: number;
  zoom?: number;
};


export default function Map({ lng, lat, zoom = 14 }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return; // Previene múltiples instancias

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [lng, lat], // [lng, lat]
      zoom,
    });

    mapRef.current = map;

    map.on('style.load', () => {
      // Cambia el estilo de luz a "dusk"
      map.setConfigProperty('basemap', 'lightPreset', 'dusk');
      // Oculta los POIs
      map.setConfigProperty('basemap', 'showPointOfInterestLabels', false);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-xl shadow-md"
    />
  );
}
