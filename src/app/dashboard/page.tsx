'use client';

import './dashboard.css';
import Header from '@/components/Header/Header';
import RecuadroFranquicias from '@/components/RecuadroFranquicias/RecuadroFranquicias';
import RecuadroInfo from '@/components/RecuadroDashboard/RecuadroInfo/RecuadroInfo';
import RecuadroVentas from '@/components/RecuadroDashboard/RecuadroVentas/RecuadroVentas';
import RecuadroRefacciones from '@/components/RecuadroDashboard/RecuadroRefacciones/RecuadroRefacciones';
import { useEffect, useState, Suspense } from 'react';
import { UseAuth } from '@/providers/AuthProvider';
import { ListWaterPlants } from '@/services/waterPlants';
import { BiAdjust } from "react-icons/bi";
import Image from 'next/image';
import { RingLoader } from 'react-spinners';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReporteNormativasDropdown }  from '@/components/ListaNormativas/ReporteNormativasDropdown';
import { WaterPlant } from '@/types/WaterPlant';
import { ButtonText } from '@/components/ButtonText/ButtonText';
import { FaCirclePlus } from "react-icons/fa6";

const DashboardContent = () => {
  const { firebaseUser } = UseAuth();
  const [franquicias, setFranquicias] = useState<WaterPlant[]>([]);
  const [franquiciaActiva, setFranquiciaActiva] = useState<WaterPlant | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wpid = searchParams ? Number(searchParams.get('wpid')) : null;
  const [hasSetInitialFranquicia, setHasSetInitialFranquicia] = useState(false);

  useEffect(() => {
    const fetchFranquicias = async () => {
      if (!firebaseUser) return;
      setLoading(true);
      try {
        const data = await ListWaterPlants({ id: firebaseUser.uid });
        setFranquicias(data);

        if (data.length > 0 && !hasSetInitialFranquicia) {
          if (wpid) {
            const found = data.find(f => f.id === wpid);
            setFranquiciaActiva(found ?? data[0]);
          } else {
            setFranquiciaActiva(data[0]);
          }
          setHasSetInitialFranquicia(true);
        }
      } catch {
        setFranquicias([]);
        setFranquiciaActiva(null);
      }
      setLoading(false);
    };
    fetchFranquicias();
  }, [firebaseUser, hasSetInitialFranquicia, wpid]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
        <Image src="/logo.png" alt="aquaNet" width={160} height={60} className="mb-6" />
        <RingLoader color="#8cc2c0b3" size={140} />
        <p className="text-[#8cc2c0b3] text-xl mt-6 animate-pulse">Cargando...</p>
      </div>
    );
  }
  
  // Agrupar franquicias por status (igual que admin)
  const statusOrder = ['ghost', 'map', 'type', 'documents', 'pay', 'active'];
  const statusLabels: Record<string, string> = {
    ghost: 'Ubicación',
    map: 'Tipo',
    type: 'Subir documentos',
    documents: 'Estatus documentos',
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

  // Navegación automática según status
  const handleFranquiciaClick = (f: WaterPlant) => {
    setFranquiciaActiva(f);
    switch (f.status) {
      case 'ghost':
        router.push('/seleccionar-colonia?wpid=' + f.id);
        break;
      case 'map':
        router.push('/select-water-plant-type?wpid=' + f.id);
        break;
      case 'type':
        router.push('/documentos-subir?wpid=' + f.id);
        break;
      case 'documents':
        router.push('/documentos-subir?wpid=' + f.id);
        break;
      case 'pay':
        router.push('/proceed-to-payment?wpid=' + f.id);
        break;
      case 'active':
        // No redirige, muestra dashboard normal
        break;
      default:
        // Si el status no es reconocido, puedes mostrar un mensaje o dejarlo en dashboard
        break;
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <aside className="dashboard-sidebar scrollbar-hidden">
          {/* Botón de modo oscuro/claro */}
        <button
            onClick={() => {
              const isDark = document.body.classList.toggle('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }}
            className="modo-boton text-sm bg-gray-200 text-black dark:bg-gray-700 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition height-10 w-10 flex items-center justify-center mb-4"
          >
            <BiAdjust />
          </button>
          <h2 className="dashboard-subtitle">Mis Franquicias</h2>
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

            {/* Sección Agregar nueva */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontWeight: 'bold', margin: '16px 0 8px 0' }}>Agregar nueva</h3>
              <RecuadroFranquicias
                key="new"
                nombre={<FaCirclePlus className="text-2xl text-[#166534]" />}
                logoSrc={"/gotita.png"}
                onClick={() => router.push('/select-add-water-plant')}
              />
            </div>
          </div>
        </aside>
        <main className="dashboard-main">
        <ReporteNormativasDropdown />
        
          <h2 className="dashboard-titulo">{franquiciaActiva ? `Franquicia ${franquiciaActiva.id}` : ''}</h2>
          {franquiciaActiva && franquiciaActiva.status === 'active' ? (
            
            <div className="dashboard-grid">
              <RecuadroInfo franquiciaId={franquiciaActiva?.id ?? null} />
              <RecuadroVentas waterPlantId={franquiciaActiva?.id ?? null}/>
              <RecuadroRefacciones waterPlantId={franquiciaActiva?.id ?? null} />
              
            </div>
          ) : franquiciaActiva ? (
            <div style={{marginTop: 16, fontWeight: 'bold', color: '#888'}} className='flex flex-col gap-6'>
              En fase de: {statusLabels[franquiciaActiva.status] || franquiciaActiva.status}
              <ButtonText
                variant="variant4"
                label="Ir a la página de la fase"
                onClick={() => handleFranquiciaClick(franquiciaActiva)}
                minW={60}
              />
            </div>
          ) : null}
        </main>
      </div>
    </>

  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}