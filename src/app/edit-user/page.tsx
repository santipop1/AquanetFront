'use client';

import { InformationField } from "@/components/InformationField/InformationField";
import { SymbolButton } from "@/components/SymbolButton/SymbolButton";
import { ProfilePicture } from "@/components/ProfilePicture/ProfilePicture";
import { ButtonText } from "@/components/ButtonText/ButtonText";
import ContratarPlan from "@/components/ContratarPlan/ContratarPlan";
import ResetPassword from "@/components/ResetPassword/ResetPassword";
import Image from "next/image";
import { UseAuth } from "@/providers/AuthProvider";
import { useRef, useState, useEffect } from "react";
import { User } from "@/types/User";
import { updateUserInfo } from "@/services/user/updateUserInfo";
import { useRouter } from "next/navigation";

const UpdateUserPage = () => {
    const { user, subscription, setUserContext, logout, firebaseUser } = UseAuth();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [updatedUser, setUpdatedUser] = useState<User | null>(user ?? null);
    const [showResetModal, setShowResetModal] = useState(false);
    const router = useRouter();

    const subscribed = subscription ? subscription.status : "inactive";
    const planType = subscription ? subscription.subscriptionType.planName : null;
    const nextPaymentDate = subscription ? subscription.nextPayment : null;

    useEffect(() => {
        if (user) {
            setUpdatedUser({ ...user });
        }
    }, [user]);

    const handleEditPicture = () => {
        fileInputRef.current?.click();
    };

    const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("private", "false");

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert("Imagen subida correctamente");

            setUpdatedUser((prev) =>
                prev ? { ...prev, profilePictureUrl: data.url } : prev
            );
        } catch (err) {
            console.error("Error al subir imagen:", err);
            alert("Error al subir la imagen");
        }
    };

    const handleFieldChange = (field: keyof User, value: any) => {
        setUpdatedUser((prev) =>
            prev ? { ...prev, [field]: value } : prev
        );
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleSaveChanges = async () => {
        if (!updatedUser) return;

        try {
            const data = await updateUserInfo(updatedUser);
            alert("Cambios guardados correctamente");
            console.log("Respuesta del backend:", data);
            setUserContext(data);
        } catch (err) {
            console.error("Error al guardar cambios:", err);
            alert("Error al guardar cambios");
        }
    };

    function formatDateToDDMMYYYY(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const userProfileContent = (
        <div className="w-5/9 overflow-y-scroll max-h-screen scrollbar-hidden relative">
            <div className="flex pt-5 pl-5">
                <SymbolButton variant="back" clickFunc={() => router.back()} />
            </div>
            <div className="flex flex-col justify-center items-center">
                <p className="text-xl pb-5 font-bold text-[rgb(0,0,51)]">MI PERFIL</p>
                <ProfilePicture pictureUrl={updatedUser?.profilePictureUrl} editPicture={handleEditPicture} />
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: "none" }}
                />
            </div>
            <div className="w-[90%] mx-auto pt-5">
                <InformationField variant="text" label="Nombre" value={updatedUser?.firstName ?? ""} placeholder="Nombre" onChange={(val) => handleFieldChange("firstName", val)} />
                <InformationField variant="text" label="Segundo nombre" value={updatedUser?.middleName ?? ""} placeholder="Segundo nombre (opcional)" onChange={(val) => handleFieldChange("middleName", val)} />
                <InformationField variant="text" label="Primer apellido" value={updatedUser?.firstLastName ?? ""} placeholder="Apellido paterno" onChange={(val) => handleFieldChange("firstLastName", val)} />
                <InformationField variant="text" label="Segundo apellido" value={updatedUser?.secondLastName ?? ""} placeholder="Apellido materno" onChange={(val) => handleFieldChange("secondLastName", val)} />
                <InformationField variant="date" label="Fecha de nacimiento" value={updatedUser ? new Date(updatedUser.birthday).toISOString().split("T")[0] : undefined} placeholder="dd/mm/yyyy" onChange={(val) => handleFieldChange("birthday", val)} />
                <InformationField variant="text" label="Número de teléfono" value={updatedUser?.phoneNumber ?? ""} placeholder="Número de teléfono" onChange={(val) => handleFieldChange("phoneNumber", val)} />
            </div>
            <div className="flex flex-col items-center">
                <div className="pb-3">
                    <ButtonText label="Restablecer contraseña" variant="variant3" minW={80} onClick={() => setShowResetModal(true)} />
                </div>
                <div className="pb-3">
                    <ButtonText label="Guardar cambios" variant="variant4" minW={80} onClick={handleSaveChanges} />
                </div>
                <div className="pb-5">
                    <ButtonText label="Cerrar sesión" variant="variant2" minW={80} onClick={handleLogout} />
                </div>
            </div>

            {showResetModal && (
                <ResetPassword
                    onClose={() => setShowResetModal(false)}
                    emailDefault={firebaseUser?.email ?? ""}
                />
            )}
        </div>
    );

    const aquanetPlusSidebar = (
        <div className="flex flex-col justify-center mx-auto w-4/9 bg-[#8cc2c0] items-center h-screen">
            <Image
                src="/aquanetplus.png"
                alt="aquanet+"
                width={350}
                height={350}
                className="pb-5"
            />
            {subscribed === "active" ? (
                <>
                    <ContratarPlan planType={planType} variant='subscribed' />
                    <p className="text-xl font-bold pt-3 text-[rgb(0,0,51)]">
                        Próximo ciclo de pago: {nextPaymentDate ? formatDateToDDMMYYYY(new Date(nextPaymentDate)) : "Sin fecha registrada"}
                    </p>
                </>
            ) : (
                <>
                    <div className="pb-6">
                        <ContratarPlan planType="monthly" size="small" />
                    </div>
                    <ContratarPlan planType="anual" size="small" />
                </>
            )}
        </div>
    );

    return (
        <div className="flex">
            {userProfileContent}
            {aquanetPlusSidebar}
        </div>
    );
};

export default UpdateUserPage;
