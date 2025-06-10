"use client"

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { SymbolButton } from "@/components/SymbolButton/SymbolButton";
import { ButtonText } from "@/components/ButtonText/ButtonText";

const AfterPaymentContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const waterPlantId = searchParams ? Number(searchParams.get('wpid')) : 1;

    return (
        <div className="bg-[#8cc2c0] min-h-screen flex flex-col items-center justify-center ">
            <div className="absolute top-3 left-5 flex gap-1">
                <SymbolButton variant='home' clickFunc={() => router.push("/")}/>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 py-10 px-15 rounded-xl px-4 text-center bg-white">
                <Image 
                    src="/logo.png"
                    alt="Logo AquaNet"
                    width={250}
                    height={250}
                />

                <h1 className="text-2xl font-semibold text-gray-800 inline-flex items-center">
                    ¡Bienvenido a la familia <p className="animate-gradient pl-2">{""} Aquanet</p>!
                </h1>

                <p className="text-lg text-gray-600 max-w-xl">
                    ¡Felicidades por tomar un paso hacia pruificar tu futuro!
                </p>

                <ButtonText
                    variant="variant4"
                    label="Llevame a mi dashboard"
                />
            </div>
        </div>
    );
}

const AfterPaymentPage = () => {
    return (
        <Suspense>
            <AfterPaymentContent />
        </Suspense>
    );
}

export default AfterPaymentPage;
