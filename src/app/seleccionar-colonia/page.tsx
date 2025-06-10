'use client';

import { useEffect, useState } from 'react';
import MapComponent from '@/components/Map/MapComponent';
import getTop3Neighborhoods from '@/services/socoredNeighborhood/getTop3Neighborhoods';
import { ScoredNeighborhood } from '@/types/ScoredNeighborhood';
import type { Feature } from 'geojson';
import { RingLoader } from 'react-spinners';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { HiArrowLongRight } from 'react-icons/hi2';
import { MdHouseSiding, MdCalendarMonth } from 'react-icons/md';
import { FaPiggyBank, FaBottleWater } from 'react-icons/fa6';
import { FaHandHoldingWater } from 'react-icons/fa';
import { ButtonText } from '@/components/ButtonText/ButtonText';
import { useRouter, useSearchParams } from 'next/navigation';
import { SymbolButton } from '@/components/SymbolButton/SymbolButton';
import { setNeighborhood } from '@/services/waterPlant/setNeighborhood';
import { setStatus } from '@/services/waterPlant/setStatus';
import { UseAuth } from '@/providers/AuthProvider';
import Image from 'next/image';

const ITEMS_PER_PAGE = 3;

const SeleccionarColoniaPage = () => {
  const [geojsonData, setGeojsonData] = useState<GeoJSON.Feature[]>([]);
  const [topColonias, setTopColonias] = useState<ScoredNeighborhood[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusedFeature, setFocusedFeature] = useState<GeoJSON.Feature | null>(null);
  const [focusedColonia, setFocusedColonia] = useState<ScoredNeighborhood | null>(null);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
  const predictedYear = currentYear + 5;

  const router = useRouter();
  const searchParams = useSearchParams();
  const waterPlantId = searchParams ? Number(searchParams.get('wpid')) : 1;

  const { idToken, loading: authLoading } = UseAuth();

  useEffect(() => {
    if (authLoading || !idToken) return;

    async function fetchAndMatchColonias() {
      try {
        const [geojsonRes, topColoniasRes] = await Promise.all([
          fetch('/colonias_cdmx.geojson').then(res => res.json()),
          getTop3Neighborhoods(waterPlantId),
        ]);

        const geojsonMap = new Map<string, Feature>();
        geojsonRes.features.forEach((f: Feature) => {
          if (f.properties?.CVEUT) {
            geojsonMap.set(f.properties.CVEUT, f);
          }
        });

        const alignedFeatures: GeoJSON.Feature[] = [];
        for (const colonia of topColoniasRes) {
          const feature = geojsonMap.get(colonia.geojsonId);
          if (feature) {
            alignedFeatures.push(feature);
          } else {
            console.warn('No se encontró feature para:', colonia.geojsonId);
          }
        }

        setTopColonias(topColoniasRes);
        setGeojsonData(alignedFeatures);
        setFocusedFeature(alignedFeatures[0] || null);
        setFocusedColonia(topColoniasRes[0] || null);
      } catch (error) {
        console.error('Error fetching or matching colonias:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAndMatchColonias();
  }, [authLoading, idToken, waterPlantId]);

  const paginatedFeatures = geojsonData.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
  const paginatedColonias = topColonias.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setFocusedFeature(paginatedFeatures[0]);
    setFocusedColonia(paginatedColonias[0]);
  }, [currentIndex]);

  const currentFeatureCollection: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: paginatedFeatures,
  };

  const handleNextFocus = () => {
    if (paginatedFeatures.length === 0) return;
    const currentIdx = paginatedFeatures.indexOf(focusedFeature!);
    const nextIdx = (currentIdx + 1) % paginatedFeatures.length;
    setFocusedFeature(paginatedFeatures[nextIdx]);
    setFocusedColonia(paginatedColonias[nextIdx]);
  };

  const handleElegirColonia = async () => {
    try {
      const data = await setNeighborhood(waterPlantId, focusedColonia ? focusedColonia.id : 1);
      const result2 = await setStatus(waterPlantId, 'map');
      console.log('Status changed: ', result2);
      console.log('Respuesta del backend:', data);
      const waterPlantTypeRecomendadaId = focusedColonia?.waterPlantTypeId;
      router.push(`/select-water-plant-type?wpid=${waterPlantId}&wptrid=${waterPlantTypeRecomendadaId}`);
    } catch (err) {
      console.error('Error al guardar cambios:', err);
      alert('Error al guardar cambios, intentar de nuevo');
    }
  };

  const canGoNext = currentIndex + ITEMS_PER_PAGE < geojsonData.length;
  const canGoPrev = currentIndex > 0;

  if (loading || authLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
        <Image src="/logo.png" alt="aquaNet" width={160} height={60} className="mb-6" />
        <RingLoader color="#8cc2c0b3" size={140} />
        <p className="text-[#8cc2c0b3] text-xl mt-6 animate-pulse">Cargando...</p>
      </div>
    );
  }

  const growth5y = focusedColonia ? focusedColonia.growthRate * 100 * 5 : 0;
  const isPositive = growth5y >= 0;

  return (
    <div className="flex flex-col items-center w-full gap-6 bg-white min-h-screen my-auto">
      <div className="absolute top-3 left-5 flex gap-1">
        <SymbolButton variant="back" clickFunc={() => router.back()} />
        <SymbolButton variant='home' clickFunc={() => router.push("/")}/>
      </div>
      <div className="flex w-full px-8 gap-4 pt-10">
        {/* Mapa */}
        <div className="flex-1 pt-6">
          <p className="text-2xl font-bold text-center flex-1 pb-5 text-black">
            ¡Selecciona la colonia de tu próxima franquicia!
          </p>
          <MapComponent
            lat={19.411}
            lng={-99.159}
            zoom={12}
            geojsonData={currentFeatureCollection}
            focusedFeature={focusedFeature || undefined}
          />
          <div className="flex flex-col mt-4 gap-2 text-sm mx-auto items-center">
            {canGoNext && (
              <p className="flex items-center gap-1">
                <span className="text-black font-semibold">¿No te gustan estas opciones?</span>
                <ButtonText
                  label="Dame más opciones"
                  onClick={() => setCurrentIndex(currentIndex + ITEMS_PER_PAGE)}
                  size="sm"
                  variant="variant2"
                />
              </p>
            )}
            {canGoPrev && (
              <p className="flex items-center gap-1">
                <span className="text-black font-semibold">¿Te gustaban más las opciones anteriores?</span>
                <ButtonText
                  label="Volver a las opciones anteriores"
                  onClick={() => setCurrentIndex(currentIndex - ITEMS_PER_PAGE)}
                  size="sm"
                  variant="variant2"
                />
              </p>
            )}
          </div>
        </div>

        {/* Panel derecho */}
        <div className="w-[50%] bg-gray-200 text-black shadow-lg rounded-xl p-4 flex flex-col justify-between my-auto">
          {focusedColonia ? (
            <>
              <div>
                <h2 className="mx-auto text-center text-2xl font-bold text-[#166534]">
                  {focusedColonia.name}
                </h2>
                <h2 className="pt-2 pb-4 mb-4 mx-auto text-center border-b-1 border-black text-xl font-bold text-[#166534]">
                  {focusedColonia.municipalityName}
                </h2>
                {/* Score */}
                <div className="flex flex-col text-center gap-2 border-b-1 border-black mb-4">
                  <p className="text-xl text-black font-bold mb-3">Puntuación Aquanet</p>
                  <div className="flex items-center mx-auto gap-6">
                    <div className="flex flex-col items-center">
                      <p className="text-xl text-black">{currentYear}</p>
                      <p className="text-4xl font-bold text-[#166534]">
                        {focusedColonia.currentScore.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center gap-1 font-semibold text-md ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
                        {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                        <span>
                          {isPositive ? '+' : ''}
                          {growth5y.toFixed(2)}%
                        </span>
                      </div>
                      <HiArrowLongRight className="text-6xl inline align-middle text-black animate-pulse mt-[-9]" />
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xl text-black">{predictedYear}</p>
                      <p className="text-4xl font-bold text-[#166534]">
                        {focusedColonia.futureScore.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className={`text-md text-center flex mx-auto gap-1 pt-2 pb-4 font-semibold ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
                    <span className="text-black">Tasa de crecimiento anual:</span>
                    {isPositive ? '+' : ''}
                    {(focusedColonia.growthRate * 100).toFixed(2)}%
                  </p>
                </div>
                {/* Inversión */}
                <div className="flex flex-col text-center gap-4 p-4 w-fit mx-auto">
                  <p className="text-xl font-bold mb-3">Retorno de inversión</p>
                  <div>
                    <p className="text-sm text-black mb-1">Tipo de purificadora recomendada</p>
                    <div className="flex items-center gap-2 mx-auto justify-center text-lg font-semibold">
                      <FaHandHoldingWater className="text-xl m-0 p-0 inline font-bold text-[#166534]" />
                      <p>{focusedColonia.waterPlantTypeName}</p>
                    </div>
                  </div>
                  <div className="flex justify-evenly gap-8 mx-auto">
                    <div className="flex flex-col items-center">
                      <p className="text-sm mb-1 text-black">Inversión inicial</p>
                      <div className="flex items-center gap-1 text-lg font-semibold">
                        <FaPiggyBank className="text-xl text-[#166534]" />
                        <p>${focusedColonia.waterPlantPrice.toFixed(0)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-sm mb-1 text-black">Renta mensual</p>
                      <div className="flex items-center gap-1 text-lg font-semibold">
                        <MdHouseSiding className="text-2xl text-[#166534]" />
                        <p>${focusedColonia.estimatedRentCostPerMonth.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-sm mb-1 text-black">Ventas mensuales</p>
                      <div className="flex items-center gap-1 text-lg font-semibold">
                        <FaBottleWater className="text-xl text-[#166534]" />
                        <p>${focusedColonia.predictedMonthlyRevenue.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm mb-1 text-black">Meses para recuperar inversión</p>
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                      <MdCalendarMonth className="text-xl text-[#166534]" />
                      <p>{focusedColonia.monthsToRecoverInvestment.toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <ButtonText label="Siguiente colonia" onClick={handleNextFocus} variant="variant2" />
              <div className="pb-4" />
              <ButtonText label="Elegir colonia" onClick={handleElegirColonia} variant="variant3" />
            </>
          ) : (
            <p>No hay colonia enfocada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeleccionarColoniaPage;
