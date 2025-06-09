'use client';

import './dashboard.css';
import Header from '@/components/Header/Header';
import RecuadroFranquicias from '@/components/RecuadroFranquicias/RecuadroFranquicias';
import RecuadroInfo from '@/components/RecuadroDashboard/RecuadroInfo/RecuadroInfo';
import RecuadroVentas from '@/components/RecuadroDashboard/RecuadroVentas/RecuadroVentas';
import RecuadroRefacciones from '@/components/RecuadroDashboard/RecuadroRefacciones/RecuadroRefacciones';
import { useEffect, useState } from 'react';
import { UseAuth } from '@/providers/AuthProvider';
import { ListWaterPlantsAll } from '@/services/waterPlants';
import { BiAdjust } from "react-icons/bi";
import UserInfo from '@/components/UserInfo/UserInfo';
import { listDocumentTypes } from '@/services/documentType/listDocumentTypes';
import { listDocumentsByWaterPlantId } from '@/services/document/listDocumentsByWaterPlantId';
import { updateDocumentStatus } from '@/services/document/updateDocumentStatus';
import { DocumentType } from '@/types/DocumentType';
import { DocumentDTO } from '@/types/DocumentDTO';
import WaterPlantInfo from '@/components/WaterPlantInfo/WaterPlantInfo';
import { WaterPlant } from '@/types/WaterPlant';
import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import Modal from '@/components/Modal/Modal';
import { MdInsertComment } from "react-icons/md";
import { setStatus } from '@/services/waterPlant/setStatus';
import { RingLoader } from 'react-spinners';
import { useRef } from 'react';
import Image from 'next/image';

type EnrichedDocument = {
  docId: number;
  documentTypeId: number;
  title: string;
  description: string;
  format: string;
  status: string;
  documentUrl: string | null;
  comments: string;
};

export default function AdminDashboardPage() {
  const { firebaseUser } = UseAuth();
  const [franquicias, setFranquicias] = useState<WaterPlant[]>([]);
  const [franquiciaActiva, setFranquiciaActiva] = useState<WaterPlant | null>(null);
  const { idToken, loading: authLoading } = UseAuth();
  const [documentos, setDocumentos] = useState<EnrichedDocument[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const waterPlantId = franquiciaActiva ? franquiciaActiva.id : 1;
  const [loading, setLoading] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const fetchFranquicias = async () => {
      if (!firebaseUser) return;
      scrollPositionRef.current = sidebarRef.current?.scrollTop ?? 0;
      setLoading(true);
      try {
        const data = await ListWaterPlantsAll();
        setFranquicias(data);
        if (data.length > 0) setFranquiciaActiva(data[0]);
      } 
      catch (error) {
        setFranquicias([]);
        setFranquiciaActiva(null);
        console.log("Couldn't fetch waterPlants: " + error);
      }
      finally {
        setLoading(false); // ← Termina carga
      }
    };
    fetchFranquicias();
  }, [firebaseUser]);

  useEffect(() => {
    if (authLoading || !idToken || !franquiciaActiva) return;

    const fetchData = async () => {
      scrollPositionRef.current = sidebarRef.current?.scrollTop ?? 0;
      setLoading(true);
      try {
        const [types, existingDocuments] = await Promise.all([
          listDocumentTypes(),
          listDocumentsByWaterPlantId(waterPlantId),
        ]);

        const docsWithMeta = types.map((type: DocumentType) => {
          const matched = existingDocuments.find((doc: DocumentDTO) => doc.documentTypeId === type.id);

          return {
            docId: matched?.id ?? -1,
            documentTypeId: type.id,
            title: type.name,
            description: type.description,
            format: type.format,
            status: matched?.status ?? 'none',
            documentUrl: matched?.documentUrl
              ? matched.documentUrl
                  .replace(/^https:\/\/.*?\/(.*?)$/, '$1')
                  .replace(/^aquanet-privado\//, '')
                  .split('?')[0]
              : null,
            comments: matched?.comments ?? '',
          };
        });

        setDocumentos(docsWithMeta);
        setDocumentTypes(types);
      } 
      catch (error) {
        console.error("Error al cargar tipos o documentos existentes:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, idToken, franquiciaActiva]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (sidebarRef.current) {
          sidebarRef.current.scrollTop = scrollPositionRef.current;
        }
      }, 0);
    }
  }, [loading]);

  const handleChangeWaterPlantStatus = async () => {
    scrollPositionRef.current = sidebarRef.current?.scrollTop ?? 0;
    setLoading(true);
    const result = await setStatus(waterPlantId, "pay");
    console.log("Status changed: ", result);

    try {
      const updatedFranquicias = await ListWaterPlantsAll();
      setFranquicias(updatedFranquicias);

      const updatedActiva = updatedFranquicias.find((f: WaterPlant) => f.id === waterPlantId);
      if (updatedActiva) {
        setFranquiciaActiva(updatedActiva);
      }
    } 
    catch (error) {
      console.error("Error al actualizar franquicias tras cambio de estado:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const statusOrder = ['ghost', 'map', 'type', 'documents', 'pay', 'active'];
  const statusLabels: Record<string, string> = {
    ghost: 'Ghost',
    map: 'Ubicación',
    type: 'Tipo',
    documents: 'Documentos',
    pay: 'Pago',
    active: 'Activas',
    null: 'Sin estatus',
    undefined: 'Sin estatus',
  };

  const grouped = statusOrder.map(status => ({
    status,
    franquicias: franquicias.filter(f => f.status === status)
  })).concat([
    { status: 'Sin estatus', franquicias: franquicias.filter(f => !statusOrder.includes(f.status)) }
  ]);

  const handleViewDocument = async (path: string) => {
    try {
      const res = await fetch(`/api/document-url?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        alert("No se pudo obtener la URL del documento.");
      }
    } catch (error) {
      console.error("Error al obtener la URL firmada:", error);
      alert("Ocurrió un error al intentar abrir el documento.");
    }
  };

  const refreshDocuments = async () => {
    const updated = await listDocumentsByWaterPlantId(waterPlantId);
    const updatedDocs = documentTypes.map((type: DocumentType) => {
      const matched = updated.find((d: DocumentDTO) => d.documentTypeId === type.id);
      return {
        docId: matched?.id ?? -1,
        documentTypeId: type.id,
        title: type.name,
        description: type.description,
        format: type.format,
        status: matched?.status ?? "none",
        documentUrl: matched?.documentUrl ?? null,
        comments: matched?.comments ?? "",
      };
    });
    setDocumentos(updatedDocs);

    const allAccepted = updatedDocs.length > 0 && updatedDocs.every(doc => doc.status === 'accepted');
    if (allAccepted) {
      await handleChangeWaterPlantStatus();
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'accept' | 'reject' | "comment" | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const openModal = (mode: 'accept' | 'reject', docId: number) => {
    setModalMode(mode);
    setSelectedDocId(docId);
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    if (!selectedDocId || !modalMode) return;

    const dto = {
      id: selectedDocId,
      status: modalMode === 'accept' ? 'accepted' : 'error',
      comments: modalMode === 'accept' ? '' : comment,
    };

    await updateDocumentStatus(dto);
    await refreshDocuments();
    setModalVisible(false);
    setComment('');
    setSelectedDocId(null);
    //alert(`Documento ${modalMode === 'accept' ? 'aceptado' : 'rechazado'}`);
  };

  const modalTitle = (mode: string | null) => {
    if (mode === 'accept') return 'Aceptar Documento';
    else if (mode === 'reject') return 'Rechazar Documento';
    else if (mode === 'comment') return 'Comentarios del Documento';
    return "";
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
    <>
      <Header />
      <div className="dashboard">
        <aside className="dashboard-sidebar scrollbar-hidden" ref={sidebarRef}>
          <button
            onClick={() => {
              const isDark = document.body.classList.toggle('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }}
            className="modo-boton text-sm bg-gray-200 text-black dark:bg-gray-700 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition height-10 w-10 flex items-center justify-center mb-4"
          >
            <BiAdjust />
          </button>
          <h2 className="dashboard-subtitle">Franquicias</h2>
          <div className="dashboard-franquicias-list">
            {grouped.map(group => (
              group.franquicias.length > 0 && (
                <div key={group.status} style={{ marginBottom: 24 }}>
                  <h3 style={{ fontWeight: 'bold', margin: '16px 0 8px 0' }}>{statusLabels[group.status] || group.status}</h3>
                  {group.franquicias.map((f) => (
                    <RecuadroFranquicias
                      key={f.id}
                      nombre={`Franquicia ${f.id}`}
                      logoSrc={"/gotita.png"}
                      onClick={() => setFranquiciaActiva(f)}
                    />
                  ))}
                </div>
              )
            ))}
          </div>
        </aside>
        <main className="dashboard-main">
          {franquiciaActiva && (
            <>
              <h2 className="dashboard-titulo">{`Franquicia ${franquiciaActiva.id}`}</h2>
              <div className='flex gap-6'>
                <UserInfo user={franquiciaActiva.user} />
                <WaterPlantInfo waterPlant={franquiciaActiva} />
              </div>
              {franquiciaActiva.status === 'active' ? (
                <div className="dashboard-grid">
                  <RecuadroInfo franquiciaId={franquiciaActiva.id} />
                  <RecuadroVentas waterPlantId={franquiciaActiva.id}/>
                  <RecuadroRefacciones waterPlantId={franquiciaActiva.id} />
                </div>
              ) : (
                <>
                  <div style={{ marginTop: 16, fontWeight: 'bold', color: '#888' }}>
                    En fase de: {statusLabels[franquiciaActiva.status] || franquiciaActiva.status}
                  </div>

                  {franquiciaActiva.status === 'documents' && (
                    <div className="mt-6 border-t pt-4">
                      <h3 className="text-xl font-bold text-[#3b3fc0] mb-4">Documentos</h3>
                      {documentos.length === 0 ? (
                        <p className="text-gray-600">No se han subido documentos.</p>
                      ) : (
                        documentos.map((doc, idx) => (
                          <div
                            key={idx}
                            className="mb-3 border p-4 rounded bg-white shadow-sm flex justify-between items-center"
                          >
                            <div>
                              <p className="font-semibold text-gray-800">{doc.title}</p>
                              <p className="text-sm text-gray-600">{doc.format}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Estado:{" "}
                                <span
                                  className={`font-semibold ${
                                    doc.status === "accepted"
                                      ? "text-green-600"
                                      : doc.status === "pending"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {!doc.status || doc.status === "none" ? "No ha sido subido" : doc.status}
                                </span>
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              {doc.comments && (
                                <button
                                  onClick={() => {
                                    setModalMode('comment');
                                    setComment(doc.comments);
                                    setModalVisible(true);
                                  }}
                                  className="flex items-center text-gray-500 hover:text-black text-sm"
                                >
                                  <MdInsertComment className="mr-1" />
                                  Comentarios
                                </button>
                              )}
                                
                              {doc.documentUrl && (
                                <button
                                  onClick={() => handleViewDocument(doc.documentUrl!)}
                                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                                >
                                  Ver documento
                                </button>
                              )}

                              {doc.status === "pending" && (
                                <>
                                  <FaCheckCircle
                                    className="text-green-600 text-xl cursor-pointer hover:scale-110 transition"
                                    onClick={() => openModal('accept', doc.docId)}
                                  />

                                  <FaCircleXmark
                                    className="text-red-600 text-xl cursor-pointer hover:scale-110 transition"
                                    onClick={() => openModal('reject', doc.docId)}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
      {modalVisible && (
        <Modal
          title={modalTitle(modalMode)}
          onClose={() => setModalVisible(false)}
          onConfirm={handleModalConfirm}
        >
          {modalMode === 'reject' && (
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Motivo del rechazo"
              className="w-full border rounded p-2 mt-2"
            />
          )}
          {modalMode === 'accept' && <p>¿Estás seguro de aceptar este documento?</p>}
          {modalMode === 'comment' && <p className="text-gray-700 whitespace-pre-line">{comment}</p>}
        </Modal>
      )}
    </>
  );
}
