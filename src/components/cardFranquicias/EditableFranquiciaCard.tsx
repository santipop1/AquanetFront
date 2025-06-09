import React, { useState } from 'react';
import { patchWaterPlantType } from '@/services/waterPlantTypes';
import './Modal.css';
import './EditableFranquiciaCard.css';

interface EditableFranquiciaCardProps {
  franquicia: any;
  onClose: () => void;
  onSaved: (updated: any) => void;
}

const EditableFranquiciaCard: React.FC<EditableFranquiciaCardProps> = ({ franquicia, onClose, onSaved }) => {
  const [form, setForm] = useState({
    id: franquicia.id ?? '', // Asegura que el id se pase si existe, si no, string vacío
    name: franquicia.name || franquicia.title || '',
    description: franquicia.description || '',
    company_id: franquicia.company_id ? String(franquicia.company_id) : '',
    price: franquicia.price && typeof franquicia.price === 'number' ? String(franquicia.price) : (typeof franquicia.price === 'string' && franquicia.price.includes('MXN') ? franquicia.price.replace(/[^\d.]/g, '') : franquicia.price || ''),
    size_m2: franquicia.size_m2 ? String(franquicia.size_m2) : (typeof franquicia.size === 'string' && franquicia.size.includes('m²') ? franquicia.size.replace(/[^\d.]/g, '') : franquicia.size || ''),
    tank_cleaning_freq_months: franquicia.tank_cleaning_freq_months ? String(franquicia.tank_cleaning_freq_months) : '',
    osmosis: franquicia.osmosis || false,
  });
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

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        size_m2: parseFloat(form.size_m2),
        tank_cleaning_freq_months: parseInt(form.tank_cleaning_freq_months as any, 10),
        company_id: parseInt(form.company_id as any, 10),
      };
      console.log('Payload enviado al endpoint PATCH:', payload); // <-- Agregado para debug
      const updated = await patchWaterPlantType(payload);
      onSaved(updated);
      onClose();
    } catch (err) {
      setError('Error al guardar los cambios.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editable-franquicia-card-form">
      <h3 style={{textAlign:'center',marginBottom:'1.2rem'}}>Editar franquicia</h3>
      <div className="form-group">
        <label>Nombre:
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>Descripción:
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>Compañía ID:
          <input name="company_id" value={form.company_id} onChange={handleChange} type="number" step="0.1" min="0"/>
        </label>
      </div>
      <div className="form-group">
        <label>Precio:
          <input name="price" value={form.price} onChange={handleChange} type="number" step="0.1" min="0" />
        </label>
      </div>
      <div className="form-group">
        <label>Tamaño (m2):
          <input name="size_m2" value={form.size_m2} onChange={handleChange} type="number" step="0.1" min="0" />
        </label>
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
      <div style={{display:'flex',gap:'1rem',justifyContent:'center',marginTop:'1.5rem'}}>
        <button className="btn-primary" onClick={handleSave} disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
        <button className="btn-secondary" onClick={onClose} disabled={loading}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditableFranquiciaCard;
