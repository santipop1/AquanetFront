import React, { useState } from 'react';
import { createWaterPlantType } from '@/services/waterPlantTypes';
import { UseAuth } from '@/providers/AuthProvider';
import './EditableFranquiciaCard.css';

interface CreateFranquiciaCardProps {
  onClose: () => void;
  onCreated: () => void;
}

const initialForm = {
  name: '',
  description: '',
  price: '',
  size_m2: '',
  tank_cleaning_freq_months: '',
  osmosis: false,
};

const CreateFranquiciaCard: React.FC<CreateFranquiciaCardProps> = ({ onClose, onCreated }) => {
  const { user } = UseAuth();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    const checked = (target instanceof HTMLInputElement && target.type === 'checkbox') ? target.checked : undefined;
    setForm(prev => ({
      ...prev,
      [name]: target.type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      if (!user || typeof (user as any).id !== 'number') {
        setError('No se encontró usuario logueado.');
        setLoading(false);
        return;
      }
      const priceValue = parseFloat(form.price);
      if (isNaN(priceValue) || priceValue < 0) {
        setError('El precio debe ser un número positivo o 0.');
        setLoading(false);
        return;
      }

      const payload = {
        name: form.name,
        description: form.description,
        company_id: (user as any).id,
        price: priceValue,
        size_m2: parseFloat(form.size_m2),
        tank_cleaning_freq_months: parseInt(form.tank_cleaning_freq_months, 10),
        osmosis: !!form.osmosis,
      };

      console.log('Payload enviado al endpoint CREATE:', payload);
      await createWaterPlantType(payload);
      onCreated();
      onClose();
    } catch {
      setError('Error al crear la franquicia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editable-franquicia-card-form">
      <h3 style={{ textAlign: 'center', marginBottom: '1.2rem' }}>Crear nueva franquicia</h3>

      <div className="form-group">
        <label>Nombre:
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4} // más alto
          style={{ resize: 'vertical' }} // permite redimensionar
        />
      </div>

      <div className="form-group">
        <label>Precio:</label>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          step="0.01"
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Tamaño (m2):</label>
          <input name="size_m2" value={form.size_m2} onChange={handleChange} type="number" step="0.1" min="0"/>
      </div>


      <div className="form-group">
        <label>Frecuencia limpieza tanque (meses):
          <input name="tank_cleaning_freq_months" value={form.tank_cleaning_freq_months} onChange={handleChange} type="number" step="0.1" min="0"/>
        </label>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
          <input name="osmosis" type="checkbox" checked={!!form.osmosis} onChange={handleChange}/>
          Sí cuenta con osmosis
        </label>
      </div>


      {error && <div className="error">{error}</div>}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
        <button className="btn-primary" onClick={handleCreate} disabled={loading}>
          {loading ? 'Creando...' : 'Crear'}
        </button>
        <button className="btn-secondary" onClick={onClose} disabled={loading}>Cancelar</button>
      </div>
    </div>
  );
};

export default CreateFranquiciaCard;
