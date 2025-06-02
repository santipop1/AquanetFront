'use client';

import './formulario.css';
import Image from 'next/image';
import { useState } from 'react';
import Header from '@/components/Header/Header';
import { createQuotation } from '@/services/quotations';
import { InformationField } from '@/components/InformationField/InformationField';
import { UseAuth } from '@/providers/AuthProvider';

export default function FormularioPage() {
  const [form, setForm] = useState({
    budget: 0,
    desiredPlantSizeId: 0,
    avalFirstName: '',
    avalFirstLastName: '',
    avalSecondLastName: '',
  });

  const [loading, setLoading] = useState(false);
  const { firebaseUser } = UseAuth();

  const handleChange = (name: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [name]: typeof prev[name] === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 🧤 Evita recarga del form

    setLoading(true);

    const payload = {
      ...form,
      user_uid: firebaseUser.uid,
    };

    try {
      const result = await createQuotation(payload);
      alert('✅ Cotización enviada correctamente');
      console.log('Cotización:', result);
    } catch (error) {
      console.error('❌ Error al enviar cotización:', error);

      alert('Hubo un error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="formulario-background">
        <form onSubmit={handleSubmit} className="formulario-container">

          <div className="formulario-header">
            <Image src="/logo.png" alt="logo aquanet" width={220} height={80} />
          </div>
          <h2 className="formulario-title">¡Purifica tu futuro!</h2>
          <p className="formulario-subtitle">
            ¡Por favor llena los siguientes datos para que encontremos tu franquicia ideal!
          </p>

          <InformationField
            variant="select"
            label="Seleccionar Presupuesto"
            value={form.budget}
            onChange={(value) => handleChange('budget', value)}
            options={[
              { label: 'Menos de $10,000', value: 10000 },
              { label: '$10,000 - $30,000', value: 30000 },
              { label: '$30,000 - $50,000', value: 50000 },
              { label: 'Más de $50,000', value: 100000 },
            ]}
          />

          <InformationField
            variant="select"
            label="Seleccionar tamaño deseado de local"
            value={form.desiredPlantSizeId}
            onChange={(value) => handleChange('desiredPlantSizeId', value)}
            options={[
              { label: 'Menos de 10 m²', value: 1 },
              { label: '10 - 20 m²', value: 2 },
              { label: '20 - 40 m²', value: 3 },
              { label: 'Más de 40 m²', value: 4 },
            ]}
          />

          <InformationField
            variant="text"
            label="Nombre(s) de tu aval (como aparece en su INE)"
            value={form.avalFirstName}
            onChange={(value) => handleChange('avalFirstName', value)}
          />
          <InformationField
            variant="text"
            label="Apellido Paterno de tu aval (como aparece en su INE)"
            value={form.avalFirstLastName}
            onChange={(value) => handleChange('avalFirstLastName', value)}
          />
          <InformationField
            variant="text"
            label="Apellido Materno de tu aval (como aparece en su INE)"
            value={form.avalSecondLastName}
            onChange={(value) => handleChange('avalSecondLastName', value)}
          />

          <button
            type="submit"
            className="formulario-boton"

            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Confirmar'}
          </button>
        </form>

      </div>
    </>
  );
}
