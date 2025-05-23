'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import { Upload, FileText, FileCheck, FileWarning } from 'lucide-react';
import { DocumentCard } from '@/components/DocumentCard/DocumentCard';
import './documentos-subir.css';

export default function SubirDocumento() {
  const documentos = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'CURP',
      format: 'Formato PDF',
      description: 'Clave Única de Registro de Población',
      status: 'none' as const
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      title: 'Comprobante de domicilio',
      format: 'Formato PDF',
      description: 'Documento vigente no mayor a 3 meses',
      status: 'pending' as const
    },
    {
      icon: <FileWarning className="w-5 h-5" />,
      title: 'Identificación oficial',
      format: 'Formato PDF',
      description: 'INE o pasaporte vigente',
      status: 'error' as const,
      message: 'La imagen está borrosa. Por favor vuelve a subir el documento.'
    }
  ];

  return (
    <>
      <Header />
      <div className="documentos-subir-container">
        <div className="form-card">
          <Image src="/logo.png" alt="aquaNet" width={150} height={60} className="mx-auto" />
          <h2>Sube tus documentos</h2>
          <p>Por favor selecciona los archivos necesarios para completar tu perfil.</p>

          <DocumentCard title="Documentos requeridos" documents={documentos} />
        </div>
      </div>
      <Footer />
    </>
  );
}
