"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";
import { SymbolButton } from "@/components/SymbolButton/SymbolButton";
import { ButtonText } from "@/components/ButtonText/ButtonText";

const SelectAddWaterPlant = () => {
    const router = useRouter();

    return (
        <div className="bg-[#8cc2c0] min-h-screen flex flex-col items-center justify-center ">
            <div className="absolute top-3 left-5 flex gap-1">
                <SymbolButton variant='home' clickFunc={() => router.push("/")}/>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 py-10 px-15 rounded-xl px-4 text-center bg-white">
                <Image 
                    src="/logo.png"
                    alt="Logo AquaNet"
                    width={250}
                    height={250}
                />

                <h1 className="text-2xl font-semibold text-gray-800">
                    Agregar una nueva franquicia purificadora
                </h1>

                <p className="text-lg text-gray-600 max-w-xl pb-5">
                    Selecciona una de las opciones
                </p>

                <ButtonText
                    variant="variant2"
                    label="Comprar una franquicia con Aquanet"
                    onClick={() => router.push(`/formulario`)}
                    minW={100}
                /> 
                <ButtonText
                    variant="variant3"
                    label="Agregar franquicia existente"
                    onClick={() => router.push(`/create-water-plant`)}
                    minW={100}
                />
            </div>
        </div>
    );
}

export default SelectAddWaterPlant;
