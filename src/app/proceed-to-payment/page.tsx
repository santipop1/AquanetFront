"use client"

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { SymbolButton } from "@/components/SymbolButton/SymbolButton";
import { ButtonText } from "@/components/ButtonText/ButtonText";

const ProceedToPaymentPageInner = () => {
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

                <h1 className="text-2xl font-semibold text-gray-800">
                    ¡Estás a un paso de conseguir tu sueño!
                </h1>

                <p className="text-lg text-gray-600 max-w-xl">
                    Procede al pago y disfruta de tu franquicia purificadora de agua y de todos los beneficios que {" "}
                    <span className="inline-flex items-center gap-2 translate-y-1.5">
                    <Image 
                        src="/aquanetplus.png" 
                        alt="Logo AquaNet Plus" 
                        width={90} 
                        height={90}
                        className=""
                    />
                    </span>
                    {""} tiene para ti.
                </p>

                <ButtonText
                    variant="variant4"
                    label="Proceder al pago"
                    onClick={() => router.push(`/payment?wpid=`+waterPlantId)}
                />
            </div>
        </div>
    );
}

const ProceedToPaymentPage = () => (
  <Suspense>
    <ProceedToPaymentPageInner />
  </Suspense>
);

export default ProceedToPaymentPage;
