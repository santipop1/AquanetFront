'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map/MapComponent'), { ssr: false });

type Props = {
  useGeoLocation?: boolean;
  fallbackCoords?: { lng: number; lat: number };
};

export default function ClientMapWrapper({ useGeoLocation = true, fallbackCoords = { lng: -99.1332, lat: 19.4326 } }: Props) {
  const [coords, setCoords] = useState<{ lng: number; lat: number } | null>(null);

  useEffect(() => {
    if (useGeoLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setCoords({ lng: position.coords.longitude, lat: position.coords.latitude }),
        () => setCoords(fallbackCoords)
      );
    } else {
      setCoords(fallbackCoords);
    }
  }, [useGeoLocation, fallbackCoords]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Mapa centrado en tu ubicación</h1>
      {coords ? (
        <Map lng={coords.lng} lat={coords.lat} />
      ) : (
        <p className="text-gray-500">Obteniendo ubicación...</p>
      )}
    </div>
  );
}
