'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import { FileText, FileCheck, FileWarning } from 'lucide-react';
import { DocumentCard } from '@/components/DocumentCard/DocumentCard';
import './documentos-subir.css';
import createDocument from '@/services/document/postDocument';
import { getIdToken } from 'firebase/auth';
import { auth } from '@/app/libreria/firebase';

export default function SubirDocumento() {
  const documentos = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'CURP',
      format: 'Formato PDF',
      description: 'Clave Única de Registro de Población',
      documentTypeId: 1,
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      title: 'Comprobante de domicilio',
      format: 'Formato PDF',
      description: 'Documento vigente no mayor a 3 meses',
      documentTypeId: 2,
    },
    {
      icon: <FileWarning className="w-5 h-5" />,
      title: 'Identificación oficial',
      format: 'Formato PDF',
      description: 'INE o pasaporte vigente',
      documentTypeId: 3,
    },
  ];

  const handleSubmitAllDocuments = async (files: (File | undefined)[]) => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await getIdToken(user);
    const waterPlantId = 3; 

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const typeId = documentos[i].documentTypeId;

      if (!file) continue;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("private", "true");
      formData.append("folder", "documents");

      try {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await uploadResponse.json();
        if (!uploadResponse.ok || !result.url) throw new Error("Upload failed");

        await createDocument({
          documentTypeId: typeId,
          documentUrl: result.url,
          waterPlantId: 3,
          status: "pending",
          comments: "",
        });
      } catch (e) {
        console.error("Error en la subida o guardado del documento:", e);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="documentos-subir-container">
        <div className="form-card">
          <Image src="/logo.png" alt="aquaNet" width={150} height={60} className="mx-auto" />
          <h2>Sube tus documentos</h2>
          <p>Por favor selecciona los archivos necesarios para completar tu perfil.</p>

          <DocumentCard
            title="Documentos requeridos"
            documents={documentos}
            onSubmit={handleSubmitAllDocuments}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
