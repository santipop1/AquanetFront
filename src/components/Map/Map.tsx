// components/Map.tsx
'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnVzaC0xOCIsImEiOiJjbTl2d2dwc20wcHYzMmlvaDdvcGJhZnZ5In0._lSZIwf9zvy9WfILLAjn6g';

type Props = {
  lng: number;
  lat: number;
  zoom?: number;
  geojsonData?: GeoJSON.FeatureCollection; // opcional
};

export default function Map({ lng, lat, zoom = 14, geojsonData }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [lng, lat],
      zoom,
    });

    mapRef.current = map;

    map.on('style.load', () => {
      map.setConfigProperty('basemap', 'lightPreset', 'dusk');
      map.setConfigProperty('basemap', 'showPointOfInterestLabels', false);

      if (geojsonData) {
        map.addSource('colonias', {
          type: 'geojson',
          data: geojsonData,
        });

        map.addLayer({
          id: 'colonias-fill',
          type: 'fill',
          source: 'colonias',
          paint: {
            'fill-color': '#ff69b4',
            'fill-opacity': 0.4,
          },
        });

        map.addLayer({
          id: 'colonias-border',
          type: 'line',
          source: 'colonias',
          paint: {
            'line-color': '#ff69b4',
            'line-width': 2,
          },
        });
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [geojsonData]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-xl shadow-md"
    />
  );
}
