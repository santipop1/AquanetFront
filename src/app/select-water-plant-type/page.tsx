"use client";

import { useSearchParams } from 'next/navigation';

const SelectWaterPlantTypePage = () => {
    const searchParams = useSearchParams();
    const waterPlantId = searchParams.get('wpid');
    const coloniaId = searchParams.get('rcid');

    return (
        <>
        <p>ID Planta: {waterPlantId}</p>
        <p>ID Colonia recomendada: {coloniaId}</p>
        </>
    );
};

export default SelectWaterPlantTypePage;