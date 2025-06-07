'use client';

import React, { useEffect, useState } from 'react';
import CardFranquicias from '@/components/cardFranquicias/cardFranquicias';
import EditableFranquiciaCard from '@/components/cardFranquicias/EditableFranquiciaCard';
import Modal from '@/components/cardFranquicias/Modal';
import CreateFranquiciaCard from '@/components/cardFranquicias/CreateFranquiciaCard';
import { getWaterPlantTypesByUser, WaterPlantTypeCard, deleteWaterPlantType } from '@/services/waterPlantTypes';
import { UseAuth } from '@/providers/AuthProvider';
import './page.css';

export default function Page() {
  const { user } = UseAuth();
  const [franquiciasData, setFranquiciasData] = useState<WaterPlantTypeCard[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || typeof user.id !== 'number') return;
        const data = await getWaterPlantTypesByUser(user.id);
        setFranquiciasData(data);
      } catch (error) {
        console.error('No se pudieron cargar las franquicias.');
      }
    };

    fetchData();
  }, [user]);

  const handleCardClick = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleCloseEdit = () => {
    setEditIndex(null);
  };

  const handleSaved = (updated: any) => {
    setFranquiciasData(prev => prev.map((item, idx) => idx === editIndex ? { ...item, ...updated } : item));
  };

  const handleCreated = async () => {
    // Refresca la lista después de crear
    const data = await getWaterPlantTypes();
    setFranquiciasData(data);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar esta franquicia?')) return;
    try {
      await deleteWaterPlantType(id);
      setFranquiciasData(prev => prev.filter(f => f.id !== id));
    } catch {
      alert('Error al eliminar la franquicia.');
    }
  };

  return (
    <main className="main-container">
      <h1 className="page-title">Franquicias disponibles</h1>
      <div className="grid-container">
        {franquiciasData.map((item, index) => (
          <div key={index} style={{ position: 'relative', marginBottom: '2rem' }}>
            <button
              onClick={() => handleDelete(item.id)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#f87171',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                fontWeight: 'bold',
                fontSize: 18,
                cursor: 'pointer',
                zIndex: 2
              }}
              title="Eliminar franquicia"
            >
              ×
            </button>
            <CardFranquicias
              title={item.title}
              brand={item.brand}
              year={item.year}
              description={item.description}
              imageUrl={item.imageUrl}
              price={item.price}
              size={item.size}
              isActive={activeIndex === index}
              onClick={() => handleCardClick(index)}
            />
            <button onClick={() => handleEditClick(index)} style={{ marginTop: 8 }}>Editar</button>
            <Modal open={editIndex === index} onClose={handleCloseEdit}>
              <EditableFranquiciaCard
                franquicia={item}
                onClose={handleCloseEdit}
                onSaved={handleSaved}
              />
            </Modal>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center',marginTop:'2.5rem'}}>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>
          Crear nueva franquicia
        </button>
      </div>
      <Modal open={showCreate} onClose={() => setShowCreate(false)}>
        <CreateFranquiciaCard onClose={() => setShowCreate(false)} onCreated={handleCreated} />
      </Modal>
    </main>
  );
}
