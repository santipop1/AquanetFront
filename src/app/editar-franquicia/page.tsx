'use client';

import './editar-franquicia.css';
import { InformationField } from '@/components/InformationField/InformationField';
import SelectorColor from '@/components/SelectorColor/SelectorColor';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function EditarFranquiciaPage() {
  const [nombre, setNombre] = useState('Franquicia 1');
  const [logoColor, setLogoColor] = useState('#3470b7');
  const [cambios, setCambios] = useState(false);

  useEffect(() => {
    if (nombre !== 'Franquicia 1' || logoColor !== '#3470b7') {
      setCambios(true);
    } else {
      setCambios(false);
    }
  }, [nombre, logoColor]);

  return (
    <div className="editar-container">
      <header className="editar-header">
        <Link href="/dashboard" className="editar-back">←</Link>
        <h2 className="editar-titulo">Editar franquicia</h2>
      </header>

      <div className="editar-form">
        <InformationField
          variant="text"
          label="Nombre de la franquicia"
          value={nombre}
          onChange={setNombre}
        />

        <InformationField
          variant="readonly"
          label="Dirección"
          value="Luz Saviñón 830, Col. del Valle Nte, Benito Juárez, 03103, CDMX"
        />

        <InformationField
          variant="readonly"
          label="Tipo de purificadora"
          value="Ventana 24 horas con ósmosis inversa"
        />

        <div className="selector-wrapper">
          <h3 className="selector-titulo">Logo</h3>
          <SelectorColor color={logoColor} setColor={setLogoColor} />
        </div>
      </div>

      <footer className="editar-footer">
        <Image src="/logo.png" alt="logo aquanet" width={150} height={60} />
        <div className="editar-actions">
          <button className="btn-rojo">Borrar franquicia</button>
          <button className="btn-borde" disabled={!cambios}>Guardar cambios</button>
        </div>
      </footer>
    </div>
  );
}
