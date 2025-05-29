'use client';

import { useEffect, useState } from 'react';
import Map from '@/components/Map/Map';
import { normalize } from 'path';

const SeleccionarColoniaPage = () => {
    const [top3Geojson, setTop3Geojson] = useState<GeoJSON.FeatureCollection | null>(null);

    function calcularScore(colonia: any): number {
        {/*
        const cloracionAlcaldia = peso_cloracion * normalize={eficiencia_cloracion};
        const poblacionAlcaldia = peso_poblacion * normalize={poblacion};
        const densidadAlcaldia = peso_densidad * normalize={poblacion / superficie};

        const fugasColonia = peso_fugas *  (1- normalize={fugas});
        const faltaDeAguaColonia = peso_falta_agua * (1- normalize={falta_agua});
        const malaCalidadAguaColonia = peso_mala_calidad * normalize={mala_calidad};
            */}
            return 1;
    }

    useEffect(() => {
        async function fetchAndScoreColonias() {
            const res = await fetch('/colonias_cdmx.geojson');
            const geojson: GeoJSON.FeatureCollection = await res.json();

            // Calcular score por colonia
            const coloniasConScore = geojson.features.map((f: any) => ({
                ...f,
                score: calcularScore(f),
            }));

            // Tomar las 3 con mayor score
            const top3 = coloniasConScore
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);

            setTop3Geojson({
                type: 'FeatureCollection',
                features: top3,
            });
        }

        fetchAndScoreColonias();
    }, []);

    return (
        <div>
            <Map lat={19.411} lng={-99.159} zoom={12} geojsonData={top3Geojson || undefined} />
        </div>
    );
}

export default SeleccionarColoniaPage;