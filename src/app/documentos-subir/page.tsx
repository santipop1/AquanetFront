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
import { updateDocumentStatus } from '@/services/document/updateDocumentStatus';

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
            comments: matched?.comments ?? '',
            file: undefined,
            skeletonUrl: matched?.skeletonUrl,
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

  const handleSubmitAllDocuments = async () => {
    setUploading(true);

    try {
      const docsToUpload = documentos.filter((doc) => doc.file);

      if (docsToUpload.length === 0) return;

      // Obtener los documentos existentes del backend (para tener IDs)
      const existingDocuments = await listDocumentsByWaterPlantId(waterPlantId);

      for (const doc of docsToUpload) {
        const formData = new FormData();
        formData.append("file", doc.file!);
        formData.append("private", "true");
        formData.append("folder", "documents");

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await uploadResponse.json();
        if (!uploadResponse.ok || !result.url) throw new Error("Upload failed");

        const matched = existingDocuments.find(
          (d: DocumentDTO) => d.documentTypeId === doc.documentTypeId
        );

        if (matched) {
          // Actualiza documento existente
          await updateDocumentStatus({
            id: matched.id,
            status: "pending",
            documentUrl: result.url,
          });
        } else {
          // Crea nuevo documento
          await createDocument({
            documentTypeId: doc.documentTypeId,
            documentUrl: result.url,
            waterPlantId: waterPlantId,
            status: "pending",
            comments: "",
          });
        }
      }

      await setStatus(waterPlantId, "documents");

      // Revalidar con backend y repoblar estado actualizado
      const [types, updatedDocuments] = await Promise.all([
        listDocumentTypes(),
        listDocumentsByWaterPlantId(waterPlantId),
      ]);

      const docsWithIcons = types.map((type: DocumentType) => {
        const matched = updatedDocuments.find(
          (doc: DocumentDTO) => doc.documentTypeId === type.id
        );

        return {
          icon: iconMap[type.name] ?? <FileText className="w-5 h-5" />,
          title: type.name,
          format: type.format,
          description: type.description,
          documentTypeId: type.id,
          status: matched ? (matched.status as DocumentStatus) : 'none',
          comments: matched?.comments ?? '',
          file: undefined,
          skeletonUrl: matched?.skeletonUrl,
        };
      });

      setDocumentos(docsWithIcons);
    } catch (e) {
      console.error("Error al subir documento:", e);
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
      <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
        <Image src="/logo.png" alt="aquaNet" width={160} height={60} className="mb-6" />
        <RingLoader color="#8cc2c0b3" size={140} />
        <p className="text-[#8cc2c0b3] text-xl mt-6 animate-pulse">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-3 left-5 flex gap-1">
        <SymbolButton variant="back" clickFunc={handleGoBack} />
        <SymbolButton variant='home' clickFunc={() => router.push("/")}/>
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
