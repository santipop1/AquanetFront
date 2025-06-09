'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnVzaC0xOCIsImEiOiJjbTl2d2dwc20wcHYzMmlvaDdvcGJhZnZ5In0._lSZIwf9zvy9WfILLAjn6g';

type Props = {
  lng: number;
  lat: number;
  zoom?: number;
  geojsonData?: GeoJSON.FeatureCollection;
  focusedFeature?: GeoJSON.Feature;
};

export default function MapComponent({ lng, lat, zoom = 14, geojsonData, focusedFeature }: Props) {
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
        if (!map.getSource('colonias')) {
          map.addSource('colonias', {
            type: 'geojson',
            data: geojsonData,
          });

          map.addLayer({
            id: `colonias-fill`,
            type: 'fill',
            source: 'colonias',
            paint: {
              'fill-color': `#166534`,
              'fill-opacity': 0.3,
            },
          });

          map.addLayer({
            id: 'colonias-border',
            type: 'line',
            source: 'colonias',
            paint: {
              'line-color': '#166534',
              'line-width': 2.5,
            },
          });
        }
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map && map.isStyleLoaded() && geojsonData && map.getSource('colonias')) {
      (map.getSource('colonias') as mapboxgl.GeoJSONSource).setData(geojsonData);
    }
  }, [geojsonData]);

  useEffect(() => {
    if (!mapRef.current || !focusedFeature) return;

    const map = mapRef.current;

    if (focusedFeature.geometry.type === 'Polygon' || focusedFeature.geometry.type === 'MultiPolygon') {
      const bounds = new mapboxgl.LngLatBounds();

      const coordinates = focusedFeature.geometry.type === 'Polygon'
        ? focusedFeature.geometry.coordinates[0]
        : focusedFeature.geometry.coordinates.flat(2);

      coordinates.forEach(coord => bounds.extend(coord as [number, number]));

      map.fitBounds(bounds, {
        padding: 40,
        duration: 1000,
      });
    }
  }, [focusedFeature]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[500px] rounded-xl shadow-md"
    />
  );
}
