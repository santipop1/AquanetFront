"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import WaterPlantTypeSelectList from '@/components/WaterPlantTypeSelectList/WaterPlantTypeSelectList';
import { getWaterPlantTypesForSelection } from '@/services/waterPlantType/getWaterPlantTypes';
import { getWaterPlantById } from '@/services/waterPlant/getWaterPlantById';
import { findQuotationByWaterPlantId } from '@/services/quoatation/findQuotationByWaterPlantId';
import { setWaterPlantType } from '@/services/waterPlant/setWaterPlantType';
import { setStatus } from '@/services/waterPlant/setStatus';
import createDocument from '@/services/document/postDocument';
import { SymbolButton } from '@/components/SymbolButton/SymbolButton';
import { UseAuth } from '@/providers/AuthProvider';
import { WaterPlantTypeDTO } from '@/services/waterPlantTypes';
import Image from 'next/image';
import { RingLoader } from 'react-spinners';
import { listDocumentsByWaterPlantId } from '@/services/document/listDocumentsByWaterPlantId';
import { updateDocumentStatus } from '@/services/document/updateDocumentStatus';
import { DocumentDTO } from '@/types/DocumentDTO';

const SelectWaterPlantTypePage = () => {
  const searchParams = useSearchParams();
  const waterPlantId = Number(searchParams.get('wpid'));
  const recommendedTypeId = Number(searchParams.get('wptrid'));
  const router = useRouter();

  const [waterPlantTypes, setWaterPlantTypes] = useState<WaterPlantTypeDTO[]>([]);
  const { user } = UseAuth();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      try {
        const types = await getWaterPlantTypesForSelection();
        setWaterPlantTypes(types);
      } catch (err) {
        console.error("Couldn't fetch waterPlantTypes:", err);
      }
      setLoading(false);
    };
    fetchTypes();
  }, []);

    const generateAndUploadSkeletonContract = async () => {
        try {
            const waterPlant = await getWaterPlantById(waterPlantId);
            const quotation = await findQuotationByWaterPlantId(waterPlantId);

            const res = await fetch("/api/generate-contract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, waterPlant, quotation }),
            });

            if (!res.ok) throw new Error("❌ Error generando contrato");
            const blob = await res.blob();

            const file = new File([blob], `ContratoSkeleton_${waterPlantId}.docx`, {
                type: blob.type,
            });

            const formData = new FormData();
            formData.append("file", file);
            formData.append("private", "true");
            formData.append("folder", "documents");

            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await uploadResponse.json();
            if (!uploadResponse.ok || !result.url) throw new Error("Upload failed");

            // 🔍 Verificar si ya existe un documento con documentTypeId = 4
            const existingDocuments = await listDocumentsByWaterPlantId(waterPlantId);
            const existing = existingDocuments.find((doc:DocumentDTO) => doc.documentTypeId === 4);

            if (existing) {
            // 🛠 Actualizar documento existente
            await updateDocumentStatus({
                id: existing.id,
                documentUrl: "",
                skeletonUrl: result.url,
                status: existing.status,
                comments: existing.comments,
            });
            console.log("🔁 Documento skeleton actualizado");
            } else {
            // ➕ Crear nuevo documento
            await createDocument({
                documentTypeId: 4,
                skeletonUrl: result.url,
                documentUrl: "",
                waterPlantId,
                status: "",
                comments: "",
            });
            console.log("✅ Documento skeleton creado y registrado");
            }
        } catch (err) {
            console.error("❌ Error generando o subiendo contrato:", err);
        }
    };

  const handleSelect = async (selectedTypeId: number) => {
    setLoading(true);
    try {
      await setWaterPlantType(waterPlantId, selectedTypeId);
      await setStatus(waterPlantId, "type");
      await generateAndUploadSkeletonContract();
      router.push(`/documentos-subir?wpid=${waterPlantId}`);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
      alert("Error al guardar cambios, intenta de nuevo.");
    }
    setLoading(false);
  };

  const handleGoBack = async () => {
    await setStatus(waterPlantId, "ghost");
    router.back();
  };

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
    <div className="min-h-screen flex flex-col text-center">
      <p className="text-3xl font-bold pt-5">Selecciona el tipo de purificadora</p>
      <div className="absolute top-3 left-5 flex gap-1">
        <SymbolButton variant="back" clickFunc={handleGoBack} />
        <SymbolButton variant="home" clickFunc={() => router.push("/")} />
      </div>
      <div className="flex-grow pt-4">
        <WaterPlantTypeSelectList
          waterPlantTypes={waterPlantTypes}
          recommendedId={recommendedTypeId}
          clickFunc1={handleSelect}
        />
      </div>
    </div>
  );
};

export default SelectWaterPlantTypePage;
