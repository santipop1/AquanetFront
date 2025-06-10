'use client';

import './formulario.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UseAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { RingLoader } from 'react-spinners';
import { InformationField } from '@/components/InformationField/InformationField';
import { listMunicipalities } from '@/services/municipality/listMunicipalities';
import { getNeighborhoodsByMunicipalityId } from '@/services/neighborhoodShort/getNeighborhoodsByMunicipalityId';
import { createWaterPlantAquanetPlus, CreateWaterPlantAquanetPlusPayload } from '@/services/waterPlant/createWaterPlantAquanetPlus';
import { NeighborhoodShortDTO } from '@/types/NeighborhoodShortDTO';
import { Municipality } from '@/types/Municipality';
import { SymbolButton } from '@/components/SymbolButton/SymbolButton';
import { WaterPlant } from '@/types/WaterPlant';

export default function CreateWaterPlant() {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodShortDTO[]>([]);
  const { firebaseUser, loading: authLoading, user } = UseAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    userId: 0,
    plantTypeId: 1,
    street: '',
    exteriorNumber: 0,
    interiorNumber: 0,
    postalCode: 0,
    municipalityId: 0,
    neighborhoodId: 0,
  });

  const handleChange = <K extends keyof typeof form>(name: K, value: (typeof form)[K]) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return form.municipalityId && form.neighborhoodId && form.street.trim() && form.postalCode;
  };

  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (!firebaseUser || authLoading) return;
      try {
        const data = await listMunicipalities();
        setMunicipalities(data);
      } catch (err) {
        console.error("Error al cargar municipios:", err);
      }
    };

    fetchMunicipalities();
  }, [firebaseUser, authLoading]);

  useEffect(() => {
    if (form.municipalityId) {
      getNeighborhoodsByMunicipalityId(form.municipalityId).then(setNeighborhoods);
    } else {
      setNeighborhoods([]);
      setForm((prev) => ({ ...prev, neighborhoodId: 0 }));
    }
  }, [form.municipalityId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: CreateWaterPlantAquanetPlusPayload = {
        ...form,
        userId: user ? user.id : 1,
      };
      const result: WaterPlant = await createWaterPlantAquanetPlus(payload);
      console.log('Planta creada:', result);
      const newWaterPlantId = result.id;
      router.push(`/dashboard?wpid=${newWaterPlantId}`);
    } catch (error) {
      console.error('Error al crear planta:', error);
      alert('Hubo un error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  if (loading || authLoading || !firebaseUser) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
        <Image src="/logo.png" alt="aquaNet" width={160} height={60} className="mb-6" />
        <RingLoader color="#8cc2c0b3" size={140} />
        <p className="text-[#8cc2c0b3] text-xl mt-6 animate-pulse">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-3 left-5 flex gap-1">
        <SymbolButton variant="back" clickFunc={() => router.back()} />
        <SymbolButton variant='home' clickFunc={() => router.push("/")}/>
      </div>
      <div className="formulario-background">
        <form onSubmit={handleSubmit} className="formulario-container">
          <div className="formulario-header">
            <Image src="/logo.png" alt="logo aquanet" width={220} height={80} />
          </div>
          <h2 className="formulario-title">Registrar Planta de Agua</h2>
          <p className="formulario-subtitle">Llena los siguientes datos:</p>

          <InformationField
            variant="text"
            label="Calle"
            value={form.street}
            onChange={(v) => handleChange('street', v as string)}
          />
          <InformationField
            variant="text"
            label="Número exterior"
            value={form.exteriorNumber === 0 ? '' : form.exteriorNumber.toString()}
            onChange={(v) => handleChange('exteriorNumber', v === '' ? 0 : Number(v))}
          />
          <InformationField
            variant="text"
            label="Número interior"
            value={form.interiorNumber === 0 ? '' : form.interiorNumber.toString()}
            onChange={(v) => handleChange('interiorNumber', v === '' ? 0 : Number(v))}
          />
          <InformationField
            variant="text"
            label="Código Postal"
            value={form.postalCode === 0 ? '' : form.postalCode.toString()}
            onChange={(v) => handleChange('postalCode', v === '' ? 0 : Number(v))}
          />

          <InformationField
            variant="select"
            label="Municipio"
            value={form.municipalityId}
            onChange={(v) => handleChange('municipalityId', Number(v))}
            options={municipalities.map((m) => ({ label: m.name, value: m.id }))}
          />

          {form.municipalityId !== 0 && (
            <InformationField
              variant="select"
              label="Colonia"
              value={form.neighborhoodId}
              onChange={(v) => handleChange('neighborhoodId', Number(v))}
              options={neighborhoods.map((n) => ({ label: n.name, value: n.id }))}
            />
          )}

          <button
            type="submit"
            className="formulario-boton"
            disabled={loading || !isFormValid()}
          >
            {loading ? 'Enviando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </>
  );
}
