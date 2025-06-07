"use client";

import { useSearchParams } from 'next/navigation';
import WaterPlantTypeSelectList from '@/components/WaterPlantTypeSelectList/WaterPlantTypeSelectList';
import { getWaterPlantTypesForSelection } from '@/services/waterPlantType/getWaterPlantTypes';
import { useEffect, useState } from 'react';
import { WaterPlantTypeDTO } from '@/services/waterPlantTypes';
import { useRouter } from 'next/navigation';
import { SymbolButton } from '@/components/SymbolButton/SymbolButton';
import { setWaterPlantType } from '@/services/waterPlant/setWaterPlantType';
import { setStatus } from '@/services/waterPlant/setStatus';

const SelectWaterPlantTypePage = () => {
    const searchParams = useSearchParams();
    const waterPlantId = searchParams.get('wpid');
    const waterPlantTypeRecomendadaId = searchParams.get('wptrid');
    const [waterPlantTypes, setWaterPlantTypes] = useState<WaterPlantTypeDTO[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchWaterPlantTypes = async() => {
            try {
                const data = await getWaterPlantTypesForSelection();
                setWaterPlantTypes(data);
            }
            catch(err) {
                console.log("Couldn't fetch waterPlantTypes: ", err);
                throw(err);
            }
        };
        fetchWaterPlantTypes();
    }, []);

    const handleSelect = async (waterPlantTypeId: number) => {
        try {
            const data = await setWaterPlantType(Number(waterPlantId), waterPlantTypeId);
            console.log("Respuesta del backend:", data);
            const result2 = await setStatus(Number(waterPlantId), "type");
            console.log("Status changed: ", result2);
            router.push(`/documentos-subir?wpid=${waterPlantId}`)
        } 
        catch (err) {
            console.error("Error al guardar cambios:", err);
            alert("Error al guardar cambios, intentar de nuevo");
        }
    };

    const handleGoBack = async() => {
        const result2 = await setStatus(Number(waterPlantId), "ghost");
        console.log("Status changed: ", result2);
        router.back();
    };

    return (
        <div className='min-h-screen flex flex-col text-center'>
            <p className='text-3xl font-bold pt-5'>Selecciona el tipo de purificadora</p>
            <div className='absolute top-3 left-5'>
                <SymbolButton
                    variant='back'
                    clickFunc={handleGoBack}
                />
           </div>
            <div className='flex-grow pt-4'>
                <WaterPlantTypeSelectList 
                    waterPlantTypes={waterPlantTypes} 
                    recommendedId={Number(waterPlantTypeRecomendadaId)}
                    clickFunc1={handleSelect}
                />
            </div>
        </div>
        
    );
};

export default SelectWaterPlantTypePage;