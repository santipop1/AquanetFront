'use client';

import './dashboard.css';
import Image from 'next/image';
import Link from 'next/link';
import RecuadroFranquicias from '@/components/RecuadroFranquicias/RecuadroFranquicias';
import RecuadroDashboard from '@/components/RecuadroDashboard/RecuadroDashboard';
import { useState } from 'react';

export default function DashboardPage() {
  const franquicias = [
    { nombre: 'Franquicia 1', logoSrc: '/gotita.png' },
    { nombre: 'Franquicia 2', logoSrc: '/gotita.png' },
    { nombre: 'Franquicia 3', logoSrc: '/gotita.png' }
  ];

  const [franquiciaActiva, setFranquiciaActiva] = useState(franquicias[0]);

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h1 className="dashboard-logo">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo aquanet"
              width={150}
              height={150}
              priority
            />
          </Link>
        </h1>
        <h2 className="dashboard-subtitle">Mis Franquicias</h2>
        <div className="dashboard-franquicias-list">
          {franquicias.map((f, i) => (
            <RecuadroFranquicias
            key={i}
            nombre={f.nombre}
            logoSrc={f.logoSrc}
            onClick={() => setFranquiciaActiva(f)}
          />          
          ))}
        </div>
      </aside>

      <main className="dashboard-main">
        <h2 className="dashboard-titulo">{franquiciaActiva.nombre}</h2>
        <div className="dashboard-grid">
          <RecuadroDashboard variante="info" />
          <RecuadroDashboard variante="ventas" />
          <RecuadroDashboard variante="refacciones" />
        </div>
      </main>
    </div>
  );
}
