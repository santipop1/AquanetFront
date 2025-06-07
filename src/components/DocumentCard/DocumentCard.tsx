'use client';

import {
  MessageSquare,
  CheckCircle,
  Upload,
  Clock,
  RotateCcw,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from 'react';

export type DocumentStatus = 'accepted' | 'pending' | 'error' | 'none';

export type DocumentRow = {
  icon: React.ReactNode;
  title: string;
  format: string;
  description: string;
  documentTypeId: number;
  file?: File;
  status: DocumentStatus;
};

type DocumentCardProps = {
  title: string;
  documents: DocumentRow[]; // ya no omitimos status ni file
  onSubmit: (files: (File | undefined)[]) => Promise<void>;
};

export function DocumentCard({ title, documents, onSubmit }: DocumentCardProps) {
  const [docStates, setDocStates] = useState<DocumentRow[]>(documents);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (index: number, file: File | null) => {
    const newDocs = [...docStates];

    if (!file || file.type !== 'application/pdf') {
      newDocs[index].status = 'error';
      newDocs[index].file = undefined;
    } else {
      const isDuplicate = newDocs.some(
        (doc, i) => i !== index && doc.file?.name === file.name
      );

      if (isDuplicate) {
        setShowDuplicateModal(true);
        return;
      }

      newDocs[index].file = file;
    }

    setDocStates(newDocs);
  };

  const renderUploadSection = (index: number, doc: DocumentRow) => {
    const inputId = `file-${index}`;

    if (doc.status === 'pending') {
      return (
        <div className="flex items-center justify-end gap-2 self-start">
          <span className="flex items-center gap-1 px-3 py-1 rounded-md text-sm text-yellow-700 bg-yellow-50 border border-yellow-500">
            <Clock className="w-4 h-4" />
            En revisión
          </span>
        </div>
      );
    }

    if (doc.status === 'accepted') {
      return (
        <div className="flex items-center justify-end self-start">
          <CheckCircle className="text-green-600 w-5 h-5" />
        </div>
      );
    }

    if (doc.status === 'error') {
      return (
        <div className="flex flex-col gap-1 items-end self-start">
          <input
            type="file"
            id={inputId}
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFileSelect(index, e.target.files?.[0] || null)}
          />
          <label htmlFor={inputId} className="flex flex-col items-end gap-1 cursor-pointer">
            <span className="flex gap-1 items-center px-3 py-1 rounded-md text-sm text-red-700 bg-red-100 border border-red-500">
              <MessageSquare className="w-4 h-4" />
              Error
            </span>
            <span className="text-sm text-gray-500">(Haz clic para reintentar)</span>
          </label>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-end gap-2 self-start">
        <input
          type="file"
          id={inputId}
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFileSelect(index, e.target.files?.[0] || null)}
        />
        {doc.file ? (
          <>
            <label htmlFor={inputId} className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-3 py-1 rounded-md text-sm text-orange-700 bg-orange-50 border border-orange-500">
                Listo para enviar
              </span>
            </label>
            <label htmlFor={inputId} className="cursor-pointer">
              <RotateCcw className="w-5 h-5 text-green-600 hover:text-green-800" />
            </label>
          </>
        ) : (
          <label
            htmlFor={inputId}
            className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md text-sm text-blue-700 bg-blue-50 border border-blue-500 hover:bg-blue-100"
          >
            <Upload className="w-4 h-4" />
            Subir documento
          </label>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="form-card">
        <h2 className="titulo-centrado">{title}</h2>
        <div className="space-y-6">
          {docStates.map((doc, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-start justify-between w-full gap-3">
                <div className="flex gap-3 items-start flex-1 text-left">
                  <div className="mt-1">{doc.icon}</div>
                  <div className="flex flex-col gap-1">
                    <div className="font-bold">{doc.title}</div>
                    <div className="text-sm text-gray-600">{doc.format}</div>
                    <div className="text-sm text-gray-500">{doc.description}</div>
                  </div>
                </div>
                {renderUploadSection(index, doc)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            disabled={
              uploading ||
              docStates.every((doc) =>
                doc.status === 'pending' || doc.status === 'accepted'
              )
            }
            className="px-5 py-2 rounded-md text-white font-bold 
              bg-green-600 hover:bg-green-700 
              disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={async () => {
              setUploading(true);
              setDocStates((prev) =>
                prev.map((doc) =>
                  doc.file ? { ...doc, status: 'pending' } : doc
                )
              );
              await onSubmit(docStates.map((doc) => doc.file));
              setUploading(false);
            }}
          >
            {uploading
              ? 'Subiendo...'
              : 'Completar'}
          </button>
        </div>
      </div>

      <Dialog.Root open={showDuplicateModal} onOpenChange={setShowDuplicateModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 shadow-lg w-[90%] max-w-md space-y-4">
            <Dialog.Title className="text-lg font-bold">Archivo duplicado</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-700">
              Este archivo ya fue seleccionado en otro campo. Por favor, usa un archivo diferente.
            </Dialog.Description>
            <div className="text-right">
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Aceptar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
