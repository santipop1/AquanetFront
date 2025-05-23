"use client";

import { useEffect, useState } from "react";
import getUserInfo from "@/services/user/getUserInfo";
import { User } from "@/types/User";
import { InformationField } from "@/components/InformationField/InformationField";
import { SymbolButton } from "@/components/SymbolButton/SymbolButton";
import { ProfilePicture } from "@/components/ProfilePicture/ProfilePicture";
import { ButtonText } from "@/components/ButtonText/ButtonText";
import ContratarPlan from "@/components/ContratarPlan/ContratarPlan";
import Image from "next/image";

const UpdateUserPage = () => {

    const [user, setUser] = useState<User>();

    const id = 1;

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const data = await getUserInfo(id);
                setUser(data.results);
            }
            catch(e) {
                console.error("Couldn't load user: ", e);
                throw e;
            }
        };

        fetchUser();

    }, [id]);

    function formatDateToDDMMYYYY(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const subscribed = false;
    const planType = "monthly";
    const nextPaymentDate = "27/05/2025";

    if(subscribed) {
        return(
            <div className="flex">
                <div className="w-5/9 overflow-y-scroll max-h-screen scrollbar-hidden">
                    {/* USER 
                    'text' | 'date' | 'select' | 'password' | 'readonly';*/}
                    <div className="flex pt-5 pl-5">
                        <SymbolButton variant="back" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-xl pb-5 font-bold text-[rgb(0,0,51)]">MI PERFIL</p>
                        <ProfilePicture pictureUrl={user?.profilePictureUrl ? user?.profilePictureUrl : ""} />
                    </div>
                    <div className="w-[90%] mx-auto pt-5">
                        <InformationField variant="text" label="Nombre" placeholder={user?.firstName ? user?.firstName : "Nombre"}/>
                        <InformationField variant="text" label="Segundo nombre" placeholder={user?.middleName ? user?.middleName : "Segundo nombre (opcional)"}/>
                        <InformationField variant="text" label="Primer apellido" placeholder={user?.firstLastName ? user?.firstLastName : "Apellido paterno"}/>
                        <InformationField variant="text" label="Segundo apellido" placeholder={user?.secondLastName ? user?.secondLastName : "Apellido materno"}/>
                        <InformationField variant="date" label="Fecha de nacimiento" placeholder={user?.birthday ? formatDateToDDMMYYYY(new Date(user?.birthday)) : "dd/mm/yyyy"}/>
                        <InformationField variant="text" label="Número de teléfono" placeholder={user?.firstName ? user?.firstName : "Número de teléfono"}/>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="pb-3">
                            <ButtonText label="Cambiar correo electrónico" variant="variant3" minW={80}/>
                        </div>
                        <div className="pb-3">
                            <ButtonText label="Cambiar contraseña" variant="variant3" minW={80}/>
                        </div>
                        <div className="pb-3">
                            <ButtonText label="Guardar cambios" variant="variant4" minW={80}/>
                        </div>
                        <div className="pb-5">
                            <ButtonText label="Cerrar sesión" variant="variant2" minW={80}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center mx-auto w-4/9 bg-[#e5e7eb] items-center h-screen">
                    {/* Aquanet+ */}
                    <Image
                        src="/aquanetplus.png"
                        alt="aquanet+"
                        width={350}
                        height={350}
                        className="pb-5"
                    />
                    <ContratarPlan
                        planType={planType}
                        variant='subscribed'
                    />
                    <p className="text-xl font-bold pt-3 text-[rgb(0,0,51)]">Próximo ciclo de pago: {nextPaymentDate}</p>
                </div>
            </div>
        );
    }

    return(
        <div className="flex">
            <div className="w-5/9 overflow-y-scroll max-h-screen scrollbar-hidden">
                {/* USER 
                'text' | 'date' | 'select' | 'password' | 'readonly';*/}
                <div className="flex pt-5 pl-5">
                    <SymbolButton variant="back" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl pb-5 font-bold text-[rgb(0,0,51)]">MI PERFIL</p>
                    <ProfilePicture pictureUrl={user?.profilePictureUrl ? user?.profilePictureUrl : ""} />
                </div>
                <div className="w-[90%] mx-auto pt-5">
                    <InformationField variant="text" label="Nombre" placeholder={user?.firstName ? user?.firstName : "Nombre"}/>
                    <InformationField variant="text" label="Segundo nombre" placeholder={user?.middleName ? user?.middleName : "Segundo nombre (opcional)"}/>
                    <InformationField variant="text" label="Primer apellido" placeholder={user?.firstLastName ? user?.firstLastName : "Apellido paterno"}/>
                    <InformationField variant="text" label="Segundo apellido" placeholder={user?.secondLastName ? user?.secondLastName : "Apellido materno"}/>
                    <InformationField variant="date" label="Fecha de nacimiento" placeholder={user?.birthday ? formatDateToDDMMYYYY(new Date(user?.birthday)) : "dd/mm/yyyy"}/>
                    <InformationField variant="text" label="Número de teléfono" placeholder={user?.firstName ? user?.firstName : "Número de teléfono"}/>
                </div>
                <div className="flex flex-col items-center">
                    <div className="pb-3">
                        <ButtonText label="Cambiar correo electrónico" variant="variant3" minW={80}/>
                    </div>
                    <div className="pb-3">
                        <ButtonText label="Cambiar contraseña" variant="variant3" minW={80}/>
                    </div>
                    <div className="pb-3">
                        <ButtonText label="Guardar cambios" variant="variant4" minW={80}/>
                    </div>
                    <div className="pb-5">
                        <ButtonText label="Cerrar sesión" variant="variant2" minW={80}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center mx-auto w-4/9 bg-[#e5e7eb] items-center h-screen">
                {/* Aquanet+ */}
                <Image
                    src="/aquanetplus.png"
                    alt="aquanet+"
                    width={350}
                    height={350}
                    className="pb-5"
                />
                <div className="pb-6">
                    <ContratarPlan
                    planType="monthly"
                    size='small'
                    />
                </div>
                <ContratarPlan
                    planType="anual"
                    size='small'
                />
            </div>
        </div>
    );
};

export default UpdateUserPage;