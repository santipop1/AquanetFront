'use client';

import {
  CheckCircle,
  Upload,
  Clock,
  RotateCcw,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { MdInsertComment } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

export type DocumentStatus = 'accepted' | 'pending' | 'error' | 'none';

export type DocumentRow = {
  icon: React.ReactNode;
  title: string;
  format: string;
  description: string;
  documentTypeId: number;
  file?: File;
  status: DocumentStatus;
  comments?: string;
  skeletonUrl?: string;
};

type DocumentCardProps = {
  title: string;
  documents: DocumentRow[];
  onSubmit: (files: (File | undefined)[]) => Promise<void>;
};

export function DocumentCard({ title, documents, onSubmit }: DocumentCardProps) {
  const [docStates, setDocStates] = useState<DocumentRow[]>(documents);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [activeComment, setActiveComment] = useState<string>('');

  const handleFileSelect = (index: number, file: File | null) => {
    const newDocs = [...docStates];

    if (!file || file.type !== 'application/pdf') {
      newDocs[index].status = 'error';
      newDocs[index].file = file ?? undefined;
    } else {
      const isDuplicate = newDocs.some(
        (doc, i) => i !== index && doc.file?.name === file.name
      );

      if (isDuplicate) {
        setShowDuplicateModal(true);
        return;
      }

      newDocs[index].file = file;
      //newDocs[index].status = 'none';
    }

    setDocStates(newDocs);
  };

  const showComment = (comment: string) => {
    setActiveComment(comment);
    setCommentModalOpen(true);
  };

  const renderCommentIcon = (comment?: string) =>
    comment && (
      <MdInsertComment
        className="text-gray-500 w-4 h-4 cursor-pointer"
        title="Ver comentario"
        onClick={() => showComment(comment)}
      />
    );

  const renderUploadSection = (index: number, doc: DocumentRow) => {
    const inputId = `file-${index}`;

    const fileInput = (
      <input
        type="file"
        id={inputId}
        accept={`.${doc.format}`}
        className="hidden"
        onChange={(e) => handleFileSelect(index, e.target.files?.[0] || null)}
      />
    );

    const retryIcon = (
      <label htmlFor={inputId} className="cursor-pointer">
        <RotateCcw
          className={`w-5 h-5 ${
            doc.status === 'error' && !doc.file
              ? 'text-red-600 hover:text-red-800'
              : 'text-green-600 hover:text-green-800'
          }`}
        />
      </label>
    );

    const readyBadge = (
      <span className="flex items-center gap-1 px-3 py-1 rounded-md text-sm text-orange-700 bg-orange-50 border border-orange-500">
        Listo para enviar
      </span>
    );

    const errorBadge = (
      <span className="flex items-center gap-1 px-3 py-1 rounded-md text-sm text-red-700 bg-red-100 border border-red-500">
        Error
      </span>
    );

    const commentIcon = renderCommentIcon(doc.comments);

    if (doc.status === 'pending') {
      return (
        <div className="flex items-center justify-end gap-2 self-start">
          <span className="flex items-center gap-1 px-3 py-1 rounded-md text-sm text-yellow-700 bg-yellow-50 border border-yellow-500">
            <Clock className="w-4 h-4" />
            En revisión
          </span>
          {commentIcon}
        </div>
      );
    }

    if (doc.status === 'accepted') {
      return (
        <div className="flex items-center justify-end self-start gap-2">
          <CheckCircle className="text-green-600 w-5 h-5" />
          {commentIcon}
        </div>
      );
    }

    if (doc.status === 'error') {
      return (
        <div className="flex items-center justify-end gap-2 self-start">
          {fileInput}
          {errorBadge}
          {doc.file && readyBadge}
          {retryIcon}
          {commentIcon}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-end gap-2 self-start">
        {fileInput}
        {doc.file ? (
          <>
            {readyBadge}
            {retryIcon}
            {commentIcon}
          </>
        ) : (
          <label
            htmlFor={inputId}
            className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md text-sm text-blue-700 bg-blue-50 border border-blue-500 hover:bg-blue-100"
          >
            <Upload className="w-4 h-4" />
            Subir documento
            {commentIcon}
          </label>
        )}
      </div>
    );
  };

  const canSubmit =
    docStates.some((doc) => doc.file !== undefined) &&
    !docStates.every(
      (doc) => doc.status === 'accepted' || doc.status === 'pending'
    );

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
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{doc.title}</span>
                      {doc.skeletonUrl && (
                        <a
                          href={doc.skeletonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="text-sm text-blue-600 hover:text-blue-800 flex gap-1"
                        >
                          <IoMdDownload className="mt-0.5 w-4 h-4"/>
                          Descargar plantilla
                        </a>
                      )}
                    </div>
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
            disabled={uploading || !canSubmit}
            className="px-5 py-2 rounded-md text-white font-bold 
              bg-[#166534] hover:bg-[#1E2A2A]
              disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={async () => {
              setUploading(true);
              await onSubmit(docStates.map((doc) => doc.file));
              setUploading(false);
            }}
          >
            {uploading ? 'Subiendo...' : 'Completar'}
          </button>
        </div>
      </div>

      {/* Modal: archivo duplicado */}
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

      {/* Modal: comentario del revisor */}
      <Dialog.Root open={commentModalOpen} onOpenChange={setCommentModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 shadow-xl w-[90%] max-w-md space-y-4">
            <Dialog.Title className="text-lg font-bold">Comentario del revisor</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-700 whitespace-pre-line">
              {activeComment}
            </Dialog.Description>
            <div className="text-right">
              <button
                onClick={() => setCommentModalOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Cerrar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
