"use client"

import Image from "next/image";
import { SymbolButton } from "@/components/SymbolButton/SymbolButton";
import { ButtonText } from "@/components/ButtonText/ButtonText";
import { useEffect, useState, Suspense } from "react";
import { stripeCheckoutSuccess } from "@/services/stripeCheckoutSuccess";
import { UseAuth } from "@/providers/AuthProvider";
import { RingLoader } from "react-spinners";
import { useSearchParams, useRouter } from "next/navigation";

const AfterPaymentContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams?.get('session_id') ?? "";
    const { loading: authLoading } = UseAuth();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() =>  {
        const fetchCheckoutSuccess = async () => {
            setLoading(true);
            try {
                const res = await stripeCheckoutSuccess(sessionId);
                console.log("Checkout success:", res);
            } catch (e) {
                console.error("Error al verificar el pago:", e);
            }
            setLoading(false);
        };
        if (sessionId && !authLoading) {
            fetchCheckoutSuccess();
        }
    }, [sessionId, authLoading]);

    if (loading) {
        return (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
            <Image src="/logo.png" alt="aquaNet" width={160} height={60} className="mb-6" />
            <RingLoader color="#8cc2c0b3" size={140} />
            <p className="text-[#8cc2c0b3] text-xl mt-6 animate-pulse">Cargando...</p>
        </div>
        );
    }

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
                    ¡Bienvenido a la familia <p className="animate-gradient pl-2">Aquanet</p>!
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl">
                    Ya puedes disfrutar de todos los beneficios que {" "}
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
                    label="Llévame a mi dashboard"
                    onClick={() => router.push(`/dashboard`)}
                />
            </div>
        </div>
    );
};

const AfterPaymentPage = () => {
    return (
        <Suspense>
            <AfterPaymentContent />
        </Suspense>
    );
};

export default AfterPaymentPage;