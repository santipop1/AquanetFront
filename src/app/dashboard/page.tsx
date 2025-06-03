'use client';

import './dashboard.css';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Link from 'next/link';
import RecuadroFranquicias from '@/components/RecuadroFranquicias/RecuadroFranquicias';
import RecuadroInfo from '@/components/RecuadroDashboard/RecuadroInfo/RecuadroInfo';
import RecuadroVentas from '@/components/RecuadroDashboard/RecuadroVentas/RecuadroVentas';
import RecuadroRefacciones from '@/components/RecuadroDashboard/RecuadroRefacciones/RecuadroRefacciones';
import { useEffect, useState } from 'react';
import { UseAuth } from '@/providers/AuthProvider';
import { ListWaterPlants } from '@/services/waterPlants';
import { BiAdjust } from "react-icons/bi";

export default function DashboardPage() {
  const { firebaseUser } = UseAuth();
  const [franquicias, setFranquicias] = useState<any[]>([]);
  const [franquiciaActiva, setFranquiciaActiva] = useState<any | null>(null);

  useEffect(() => {
    const fetchFranquicias = async () => {
      if (!firebaseUser) return;
      try {
        const data = await ListWaterPlants({ id: firebaseUser.uid });
        setFranquicias(data);
        if (data.length > 0) setFranquiciaActiva(data[0]);
      } catch (error) {
        setFranquicias([]);
        setFranquiciaActiva(null);
      }
    };
    fetchFranquicias();
  }, [firebaseUser]);

  return (
    <>
      <Header />
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          {/* Botón de modo oscuro/claro */}
        <button
            onClick={() => {
              const isDark = document.body.classList.toggle('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }}
            className="text-sm bg-gray-200 text-black dark:bg-gray-700 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition height-10 w-10 flex items-center justify-center mb-4"
          >
            <BiAdjust />
          </button>
          <h2 className="dashboard-subtitle">Mis Franquicias</h2>
          <div className="dashboard-franquicias-list">
            {franquicias.map((f) => (
              <RecuadroFranquicias
                key={f.id}
                nombre={`Franquicia ${f.id}`}
                logoSrc={"/gotita.png"}
                onClick={() => setFranquiciaActiva(f)}
              />
            ))}
          </div>
        </aside>
        <main className="dashboard-main">
          <h2 className="dashboard-titulo">{franquiciaActiva ? `Franquicia ${franquiciaActiva.id}` : ''}</h2>
          <div className="dashboard-grid">
            <RecuadroInfo franquiciaId={franquiciaActiva?.id ?? null} />
            <RecuadroVentas waterPlantId={franquiciaActiva?.id ?? null}/>
            <RecuadroRefacciones />
          </div>
        </main>
      </div>
    </>
  );
}
