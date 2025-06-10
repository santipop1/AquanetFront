'use client';

import './formulario.css';
import Image from 'next/image';
import { useState } from 'react';
import Header from '@/components/Header/Header';
import { createQuotation } from '@/services/quotations';
import { InformationField } from '@/components/InformationField/InformationField';
import { UseAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { setStatus } from '@/services/waterPlant/setStatus';
import { RingLoader } from 'react-spinners';
import { QuotationDTO } from '@/types/QuotationDTO';

export default function FormularioPage() {
  type FormState = Omit<QuotationDTO, 'user_uid' | 'waterPlantId'>;
  const [form, setForm] = useState<FormState>({
    budget: 0,
    desiredPlantSizeId: 1,
    avalFirstName: "",
    avalMiddleName: "",
    avalFirstLastName: "",
    avalSecondLastName: "",
  });

  const [loading, setLoading] = useState(false);
  const { firebaseUser } = UseAuth();
  const router = useRouter();

  const handleChange = <K extends keyof FormState>(name: K, value: FormState[K]) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      form.avalFirstName.trim() &&
      form.avalFirstLastName.trim() &&
      form.avalSecondLastName.trim()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!firebaseUser) {
      alert('Usuario no autenticado');
      setLoading(false);
      return;
    }
    const payload: QuotationDTO = {
      ...form,
      user_uid: firebaseUser.uid,
    };

    try {
      const result = await createQuotation(payload);
      const waterPlantId = result.waterPlantId;
      const result2 = await setStatus(waterPlantId, "ghost");
      console.log("Status changed: ", result2);
      router.push(`/seleccionar-colonia?wpid=${waterPlantId}`);
    } catch (error) {
      console.error('Error al enviar cotización:', error);
      alert('Hubo un error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
      <Header />
      <div className="formulario-background">
        <form onSubmit={handleSubmit} className="formulario-container">
          <div className="formulario-header">
            <Image src="/logo.png" alt="logo aquanet" width={220} height={80} />
          </div>
          <h2 className="formulario-title">¡Purifica tu futuro!</h2>
          <p className="formulario-subtitle">
            ¡Por favor llena los siguientes datos para que encontremos tu
            franquicia ideal!
          </p>

          <InformationField
            variant="select"
            label="Seleccionar Presupuesto"
            value={form.budget}
            onChange={(value) => handleChange("budget", value as number)}
            options={[
              { label: "Menos de $50,000", value: 0 },
              { label: "$50,000 - $100,000", value: 50000 },
              { label: "$100,000 - $200,000", value: 100000 },
              { label: "$200,000 - $300,000", value: 200000 },
              { label: "Más de $300,000", value: 300000 },
            ]}
          />

          <InformationField
            variant="select"
            label="Seleccionar tamaño deseado de local"
            value={form.desiredPlantSizeId}
            onChange={(value) => handleChange("desiredPlantSizeId", value as number)}
            options={[
              { label: "10 - 20 m²", value: 1 },
              { label: "20 - 30 m²", value: 2 },
              { label: "30 m²", value: 3 },
            ]}
          />

          <InformationField
            variant="text"
            label="Nombre(s) de tu aval (como aparece en su INE)"
            value={form.avalFirstName}
            onChange={(value) => handleChange("avalFirstName", value as string)}
          />
          <InformationField
            variant="text"
            label="Apellido Paterno de tu aval (como aparece en su INE)"
            value={form.avalFirstLastName}
            onChange={(value) => handleChange("avalFirstLastName", value as string)}
          />
          <InformationField
            variant="text"
            label="Apellido Materno de tu aval (como aparece en su INE)"
            value={form.avalSecondLastName}
            onChange={(value) => handleChange("avalSecondLastName", value as string)}
          />

          <button
            type="submit"
            className="formulario-boton"
            disabled={loading || !isFormValid()}
          >
            {loading ? "Enviando..." : "Confirmar"}
          </button>
        </form>
      </div>
    </>
  );
}
