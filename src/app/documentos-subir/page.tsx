'use client';

import { SymbolButton } from '@/components/SymbolButton/SymbolButton';
import Image from 'next/image';
import { FileText, FileCheck, FileWarning } from 'lucide-react';
import { DocumentCard } from '@/components/DocumentCard/DocumentCard';
import './documentos-subir.css';
import createDocument from '@/services/document/postDocument';
import { useRouter, useSearchParams } from 'next/navigation';
import { setStatus } from '@/services/waterPlant/setStatus';
import { JSX, useEffect, useState } from 'react';
import { listDocumentTypes } from '@/services/documentType/listDocumentTypes';
import { listDocumentsByWaterPlantId } from '@/services/document/listDocumentsByWaterPlantId';
import { DocumentStatus } from '@/components/DocumentCard/DocumentCard';
import { UseAuth } from '@/providers/AuthProvider';
import { DocumentType } from '@/types/DocumentType';
import { DocumentDTO } from '@/types/DocumentDTO';
import { RingLoader } from 'react-spinners';
import { DocumentRow } from '@/components/DocumentCard/DocumentCard';

export default function SubirDocumento() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const waterPlantId = searchParams ? Number(searchParams.get('wpid')) : 1;

  const { idToken, loading: authLoading } = UseAuth();

  const [documentos, setDocumentos] = useState<DocumentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const iconMap: Record<string, JSX.Element> = {
    CURP: <FileText className="w-5 h-5" />,
    'Comprobante de domicilio': <FileCheck className="w-5 h-5" />,
    'Identificación oficial': <FileWarning className="w-5 h-5" />,
  };

  useEffect(() => {
    if (authLoading || !idToken) return;

    const fetchData = async () => {
      try {
        const [types, existingDocuments] = await Promise.all([
          listDocumentTypes(),
          listDocumentsByWaterPlantId(waterPlantId),
        ]);

        const docsWithIcons = types.map((type: DocumentType) => {
          const matched = existingDocuments.find(
            (doc: DocumentDTO) => doc.documentTypeId === type.id
          );

          return {
            icon: iconMap[type.name] ?? <FileText className="w-5 h-5" />,
            title: type.name,
            format: type.format,
            description: type.description,
            documentTypeId: type.id,
            status: matched ? (matched.status as DocumentStatus) : 'none',
            file: undefined,
          };
        });

        setDocumentos(docsWithIcons);
      } catch (error) {
        console.error("Error al cargar tipos o documentos existentes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authLoading, idToken, waterPlantId]);

  const handleSubmitAllDocuments = async (files: (File | undefined)[]) => {
    setUploading(true);
    const updatedDocs = [...documentos];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const typeId = documentos[i].documentTypeId;

        if (!file) continue;

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

        await createDocument({
          documentTypeId: typeId,
          documentUrl: result.url,
          waterPlantId: waterPlantId,
          status: "pending",
          comments: "",
        });

        // ✅ Actualiza localmente para respuesta rápida
        updatedDocs[i].status = "pending";
        updatedDocs[i].file = undefined;
      }

      await setStatus(waterPlantId, "documents");
      setDocumentos(updatedDocs); // UX inmediata

      // 🔁 Revalidación desde backend
      const [types, existingDocuments] = await Promise.all([
        listDocumentTypes(),
        listDocumentsByWaterPlantId(waterPlantId),
      ]);

      const docsWithIcons = types.map((type: DocumentType) => {
        const matched = existingDocuments.find(
          (doc: DocumentDTO) => doc.documentTypeId === type.id
        );

        return {
          icon: iconMap[type.name] ?? <FileText className="w-5 h-5" />,
          title: type.name,
          format: type.format,
          description: type.description,
          documentTypeId: type.id,
          status: matched ? (matched.status as DocumentStatus) : 'none',
          file: undefined,
        };
      });

      setDocumentos(docsWithIcons); // Sync total con backend
    } catch (e) {
      console.error("Error en la subida o guardado del documento:", e);
    } finally {
      setUploading(false);
    }
  };

  const handleGoBack = async () => {
    const result2 = await setStatus(waterPlantId, "map");
    console.log("Status changed: ", result2);
    router.back();
  };

  const showGlobalLoader = authLoading || isLoading || uploading;

  if (showGlobalLoader) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out">
        <RingLoader color="#3b3fc0" size={150} />
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-3 left-5">
        <SymbolButton variant="back" clickFunc={handleGoBack} />
      </div>
      <div className="documentos-subir-container">
        <div className="form-card">
          <Image src="/logo.png" alt="aquaNet" width={150} height={60} className="mx-auto" />
          <h2>Sube tus documentos</h2>
          <p>Por favor sube los archivos necesarios para completar tu perfil.</p>

          {documentos.length > 0 && (
            <DocumentCard
              title="Documentos requeridos"
              documents={documentos}
              onSubmit={handleSubmitAllDocuments}
            />
          )}
        </div>
      </div>
    </>
  );
}
