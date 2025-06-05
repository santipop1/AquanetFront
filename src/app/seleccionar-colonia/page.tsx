'use client';

import { useEffect, useState } from 'react';
import MapComponent from '@/components/Map/MapComponent';
import getTop3Neighborhoods from '@/services/socoredNeighborhood/getTop3Neighborhoods';
import { ScoredNeighborhood } from '@/types/ScoredNeighborhood';
import type { Feature } from 'geojson';
import { RingLoader } from "react-spinners";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { HiArrowLongRight } from "react-icons/hi2";
import { MdHouseSiding, MdCalendarMonth } from "react-icons/md"; //renta, ventas, meses
import { FaPiggyBank, FaBottleWater } from "react-icons/fa6";
import { FaHandHoldingWater } from "react-icons/fa";
import { ButtonText } from '@/components/ButtonText/ButtonText';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 3;

const SeleccionarColoniaPage = () => {
    const [geojsonData, setGeojsonData] = useState<GeoJSON.Feature[]>([]);
    const [topColonias, setTopColonias] = useState<ScoredNeighborhood[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [focusedFeature, setFocusedFeature] = useState<GeoJSON.Feature | null>(null);
    const [focusedColonia, setFocusedColonia] = useState<ScoredNeighborhood | null>(null);
    const [loading, setLoading] = useState(true);
    const currentYear = new Date().getFullYear();
    const router = useRouter();
    const predictedYear = currentYear + 5;
    const waterPlantId = 2;

    useEffect(() => {
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
                        console.warn("No se encontró feature para:", colonia.geojsonId);
                    }
                }

                setTopColonias(topColoniasRes);
                setGeojsonData(alignedFeatures);
                setFocusedFeature(alignedFeatures[0] || null);
                setFocusedColonia(topColoniasRes[0] || null);
            } catch (error) {
                console.error("Error fetching or matching colonias:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAndMatchColonias();
    }, []);

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

    const handleElegirColonia = () => {
        const coloniaRecomendadaId = focusedColonia?.waterPlantTypeId;
        router.push(`/select-water-plant-type?wpid=${waterPlantId}&rcid=${coloniaRecomendadaId}`)
    };

    const canGoNext = currentIndex + ITEMS_PER_PAGE < geojsonData.length;
    const canGoPrev = currentIndex > 0;

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out">
                <RingLoader color="#ec4899" size={150} />
            </div>
        );
    }

    const growth5y = focusedColonia? focusedColonia.growthRate * 100 * 5 : 0;
    const isPositive = growth5y >= 0;

    //bg-gray-700

    return (
        <div className="flex flex-col items-center w-full gap-6 bg-gray-700 min-h-screen my-auto">
            {/* MAPA + ENCABEZADO + PAGINACIÓN */}
            <div className="flex w-full px-8 gap-4 pt-10">
                {/* MAPA */}
                <div className="flex-1">
                    <p className="text-2xl font-bold text-center flex-1 pb-5 text-white">
                        ¡Selecciona la colonia de tu próxima franquicia!
                    </p>
                    <MapComponent
                        lat={19.411}
                        lng={-99.159}
                        zoom={12}
                        geojsonData={currentFeatureCollection}
                        focusedFeature={focusedFeature || undefined}
                    />
                    {/* PAGINACIÓN */}
                    <div className="flex flex-col mt-4 gap-2 text-sm mx-auto items-center">
                        {canGoNext && (
                            <p className="flex items-center gap-1">
                                <span className='text-white'>¿No te gustan estas opciones?</span>
                                <ButtonText
                                    label='Dame más opciones'
                                    onClick={() => setCurrentIndex(currentIndex + ITEMS_PER_PAGE)}
                                    size='sm'
                                    variant='variant3'
                                />
                            </p>
                        )}
                        
                        {canGoPrev && (
                            <p className="flex items-center gap-1">
                                <span className='text-white'>¿Te gustaban más las opciones anteriores?</span>
                                <ButtonText
                                    label='Volver a las opciones anteriores'
                                    onClick={() => setCurrentIndex(currentIndex - ITEMS_PER_PAGE)}
                                    size='sm'
                                    variant='variant3'
                                />
                            </p>
                        )}
                    </div>
                </div>

                {/* PANEL DERECHO */}
                <div className="w-[50%] bg-black text-white shadow-lg rounded-xl p-4 flex flex-col justify-between my-auto">
                    {focusedColonia ? (
                        <>
                            <div>
                                
                                {/* Título */}
                                <h2 className="mx-auto text-center text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">{focusedColonia.name}</h2>
                                <h2 className="pt-2 pb-4 mb-4 mx-auto text-center border-b-1 border-white text-xl font-bold bg-gradient-to-r from-pink-800 via-purple-800 to-blue-800 bg-clip-text text-transparent animate-gradient ">{focusedColonia.municipalityName}</h2>

                                {/* Crecimiento anual */}
                                <div className="flex flex-col text-center shadow-md gap-2 border-b-1 border-white mb-4">
                                    <p className="text-xl font-bold mb-3">Puntuación Aquanet</p>

                                    <div className="flex items-center mx-auto gap-6">
                                        {/* Año actual y score actual */}
                                        <div className="flex flex-col items-center">
                                        <p className="text-xl text-gray-200">{currentYear}</p>
                                        <p className="text-4xl font-bold font-bold icon-gradient-fake">
                                            {focusedColonia.currentScore.toFixed(2)}
                                        </p>
                                        </div>

                                        {/* Indicador de crecimiento */}
                                        <div className="flex flex-col items-center">
                                        <div className={`flex items-center gap-1 font-semibold text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                            {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                                            <span>
                                            {isPositive ? '+' : ''}
                                            {growth5y.toFixed(2)}%
                                            </span>
                                        </div>
                                            <HiArrowLongRight className="text-6xl inline align-middle text-white animate-pulse mt-[-9]" />
                                        </div>

                                        {/* Año futuro y score futuro */}
                                        <div className="flex flex-col items-center">
                                        <p className="text-xl text-gray-200">{predictedYear}</p>
                                        <p className="text-4xl font-bold font-bold icon-gradient-fake">
                                            {focusedColonia.futureScore.toFixed(2)}
                                        </p>
                                        </div>
                                    </div>

                                    {/* Crecimiento anual */}
                                    <p className={`text-sm text-center flex mx-auto gap-1 pt-2 pb-4 font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        <span className='text-white'>Taza de crecimiento anual:</span>
                                        {isPositive ? '+' : ''}
                                        {(focusedColonia.growthRate * 100).toFixed(2)}%
                                    </p>
                                </div>

                                {/* Retorno de inversión */}
                                <div className="flex flex-col text-center shadow-md gap-4 p-4 w-fit mx-auto">
                                    <p className="text-xl font-bold mb-3">Retorno de inversión</p>

                                    {/* Tipo de purificadora */}
                                    <div>
                                        <p className="text-sm text-gray-200 mb-1">Tipo de purificadora recomendada</p>
                                        <div className="flex items-center gap-2 mx-auto justify-center text-lg font-semibold">
                                            <FaHandHoldingWater className="text-xl m-0 p-0 inline align-middle font-bold icon-gradient-fake" />
                                            <p>{focusedColonia.waterPlantTypeName}</p>
                                        </div>
                                    </div>

                                    {/* Inversión / Renta / Venta */}
                                    <div className="flex justify-evenly gap-8 mx-auto">
                                        <div className="flex flex-col items-center">
                                            <p className="text-sm mb-1 text-gray-200">Inversión inicial</p>
                                            <div className="flex items-center gap-1 text-lg font-semibold">
                                                <FaPiggyBank className="text-xl m-0 p-0 font-bold icon-gradient-fake" />
                                                <p>${focusedColonia.waterPlantPrice.toFixed(0)}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <p className="text-sm mb-1 text-gray-200">Renta estimada mensual</p>
                                            <div className="flex items-center gap-1 text-lg font-semibold">
                                                <MdHouseSiding className="text-2xl m-0 p-0 font-bold icon-gradient-fake" />
                                                <p>${focusedColonia.estimatedRentCostPerMonth.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <p className="text-sm mb-1 text-gray-200">Venta estimada mensual</p>
                                            <div className="flex items-center gap-1 text-lg font-semibold">
                                                <FaBottleWater className="text-xl m-0 p-0 font-bold icon-gradient-fake" />
                                                <p>${focusedColonia.predictedMonthlyRevenue.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recuperación de inversión */}
                                    <div className="mt-2">
                                        <p className="text-sm mb-1 text-gray-200">Meses estimados para recuperar la inversión</p>
                                        <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                                            <MdCalendarMonth className="text-xl m-0 p-0 font-bold icon-gradient-fake" />
                                            <p>{focusedColonia.monthsToRecoverInvestment.toFixed(0)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ButtonText
                                label='Siguiente colonia'
                                onClick={handleNextFocus}
                                variant='variant4'
                            />
                            <div className='pb-4'/>
                            <ButtonText
                                label='Elegir colonia'
                                onClick={handleElegirColonia}
                                variant='variant6'
                            />
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
