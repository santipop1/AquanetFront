'use client';

import './formulario.css';
import Image from 'next/image';
import { useState } from 'react';
import Header from '@/components/Header/Header';
import { createQuotation } from '@/services/quotations';
import { InformationField } from '@/components/InformationField/InformationField';

export default function FormularioPage() {
  const [form, setForm] = useState({
    nombreUsuario: '',
    apellidoUsuario: '',
    fechaNacimiento: '',
    presupuesto: '',
    tamanoLocal: '',
    nombreAval: '',
    apellidoAval: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await createQuotation(payload);
      alert('Cotización enviada correctamente');
      console.log('Cotización:', result);
    } catch (error) {
      console.error('Error al enviar cotización:', error);
      alert('Hubo un error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="formulario-background">
        <div className="formulario-container">
          <div className="formulario-header">
            <Image src="/logo.png" alt="logo aquanet" width={220} height={80} />
          </div>
          <h2 className="formulario-title">¡Purifica tu futuro!</h2>
          <p className="formulario-subtitle">
            ¡Por favor llena los siguientes datos para que encontremos tu franquicia ideal!
          </p>

          <InformationField
            variant="text"
            label="Nombre(s) (como aparece en tu INE)"
            value={form.nombreUsuario}
            onChange={(value) => handleChange('nombreUsuario', value)}
          />
          <InformationField
            variant="text"
            label="Apellidos (como aparece en tu INE)"
            value={form.apellidoUsuario}
            onChange={(value) => handleChange('apellidoUsuario', value)}
          />
          <InformationField
            variant="date"
            label="Fecha de nacimiento"
            value={form.fechaNacimiento}
            onChange={(value) => handleChange('fechaNacimiento', value)}
          />
          <InformationField
            variant="select"
            label="Seleccionar presupuesto"
            value={form.presupuesto}
            onChange={(value) => handleChange('presupuesto', value)}
            options={["Menos de $10,000", "$10,000 - $30,000", "$30,000 - $50,000", "Más de $50,000"]}
          />
          <InformationField
            variant="select"
            label="Seleccionar tamaño deseado de local"
            value={form.tamanoLocal}
            onChange={(value) => handleChange('tamanoLocal', value)}
            options={["Menos de 10 m²", "10 - 20 m²", "20 - 40 m²", "Más de 40 m²"]}
          />
          <InformationField
            variant="text"
            label="Nombre(s) de tu aval (como aparece en su INE)"
            value={form.nombreAval}
            onChange={(value) => handleChange('nombreAval', value)}
          />
          <InformationField
            variant="text"
            label="Apellidos de tu aval (como aparece en su INE)"
            value={form.apellidoAval}
            onChange={(value) => handleChange('apellidoAval', value)}
          />

          <button
            className="formulario-boton"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </>
  );
}
