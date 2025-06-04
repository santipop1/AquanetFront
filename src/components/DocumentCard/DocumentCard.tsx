'use client';

import {
  MessageSquare,
  RotateCcw,
  FileDown,
} from 'lucide-react';
import { ButtonText } from '@/components/ButtonText/ButtonText';
import React from 'react';

type DocumentStatus = 'accepted' | 'pending' | 'error' | 'none';

type DocumentRow = {
  icon: React.ReactNode;
  title: string;
  format: string;
  description: string;
  status: DocumentStatus;
  message?: string;
  fileName?: string;
};

type DocumentCardProps = {
  title: string;
  documents: DocumentRow[];
};

export function DocumentCard({ title, documents }: DocumentCardProps) {
  const getStatusUI = (status: DocumentStatus, message?: string) => {
    switch (status) {
      case 'accepted':
        return <span className="status-tag status-accepted">Documento aceptado</span>;
      case 'pending':
        return <span className="status-tag status-pending">Documento en revisión</span>;
      case 'error':
        return (
          <div className="status-tag status-error">
            <MessageSquare className="w-4 h-4" />
            <RotateCcw className="w-4 h-4" />
            <span>Error</span>
          </div>
        );
      default:
        return (
          <ButtonText
            label="Subir documento"
            variant="variant1"
            size="sm"
            onClick={() => alert('Selecciona un archivo')}
          />
        );
    }
  };

  const renderUploadSection = (status: DocumentStatus, fileName?: string) => {
    if (status === 'accepted' || status === 'error') {
      return (
        <div className="file-uploaded">
          <FileDown className="w-4 h-4" />
          {fileName || 'archivo.pdf'}
        </div>
      );
    }
    return getStatusUI(status);
  };

  return (
    <div className="form-card">
      <h2 className="titulo-centrado">{title}</h2>
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="document-row">
            <div className="document-info">
              <div className="document-info-icon">{doc.icon}</div>
              <div className="document-text">
                <div className="title">{doc.title}</div>
                <div className="format">{doc.format}</div>
                <div className="description">{doc.description}</div>
              </div>
            </div>
            <div className="document-status">
              {renderUploadSection(doc.status, doc.fileName)}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <ButtonText
          label="Completar"
          variant="variant5"
          size="lg"
          onClick={() => alert('Documentos enviados')}
        />
      </div>
    </div>
  );
}
