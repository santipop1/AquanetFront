'use client';

import './formulario.css';
import Image from 'next/image';
import { InformationField } from '@/components/InformationField/InformationField';
import { useState } from 'react';
import { Button } from '@mui/material';

export default function FormularioPage() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [tamanoLocal, setTamanoLocal] = useState('');
  const [nombreAval, setNombreAval] = useState('');

  return (
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
          label="Nombre completo (como aparece en tu INE)"
          value={nombre}
          onChange={setNombre}
        />

        <InformationField
          variant="date"
          label="Fecha de nacimiento"
          value={fechaNacimiento}
          onChange={setFechaNacimiento}
        />

        <InformationField
          variant="select"
          label="Seleccionar presupuesto"
          value={presupuesto}
          onChange={setPresupuesto}
          options={["Menos de $10,000", "$10,000 - $30,000", "$30,000 - $50,000", "Más de $50,000"]}
        />

        <InformationField
          variant="select"
          label="Seleccionar tamaño deseado de local"
          value={tamanoLocal}
          onChange={setTamanoLocal}
          options={["Menos de 10 m²", "10 - 20 m²", "20 - 40 m²", "Más de 40 m²"]}
        />

        <InformationField
          variant="text"
          label="Nombre completo de tu aval (como aparece en su INE)"
          value={nombreAval}
          onChange={setNombreAval}
        />

        <button className="formulario-boton" disabled>
            Confirmar
        </button>

      </div>
    </div>
  );
}
