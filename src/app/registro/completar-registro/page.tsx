'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/services/user';
import { InformationField } from '@/components/InformationField/InformationField';

interface FormData {
  firstName: string;
  middleName: string;
  firstLastName: string;
  secondLastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  password: string; // ➕ AÑADIDO para cumplir con el tipo
}

export default function CompletarRegistro() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    firstLastName: '',
    secondLastName: '',
    birthday: '',
    phoneNumber: '',
    email: '',
    password: '' // ➕ VALOR POR DEFECTO VACÍO
  });

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("googleUser");
    if (stored) {
      const googleData = JSON.parse(stored);
      const [firstName = '', firstLastName = ''] = googleData.displayName?.split(' ') || [];
      setFormData((prev) => ({
        ...prev,
        email: googleData.email || '',
        phoneNumber: googleData.phoneNumber || '',
        firstName,
        firstLastName,
        password: '' 
      }));
    }
  }, []);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        firstLastName: formData.firstLastName,
        secondLastName: formData.secondLastName,
        birthday: new Date(formData.birthday),
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        roleId: 1
      };
      await createUser(payload);
      localStorage.removeItem("googleUser");
      alert("✅ Registro completado");
      router.push("/dashboard");
    } catch (err) {
      alert("❌ Error al completar el registro");
      console.error(err);
    }
  };

  return (
    <div className="registro-container">
      <div className="form-card">
        <h2>Completa tu registro</h2>
        <form onSubmit={handleSubmit}>
          <InformationField label="Email" value={formData.email} onChange={() => {}} placeholder="Email" variant="text" />
          <InformationField label="First Name" value={formData.firstName} onChange={(v) => handleChange('firstName', v)} placeholder="First Name" variant="text" />
          <InformationField label="Middle Name" value={formData.middleName} onChange={(v) => handleChange('middleName', v)} placeholder="Middle Name" variant="text" />
          <InformationField label="First Last Name" value={formData.firstLastName} onChange={(v) => handleChange('firstLastName', v)} placeholder="Last Name" variant="text" />
          <InformationField label="Second Last Name" value={formData.secondLastName} onChange={(v) => handleChange('secondLastName', v)} placeholder="Second Last Name" variant="text" />
          <InformationField label="Birthday" value={formData.birthday} onChange={(v) => handleChange('birthday', v)} variant="date" />
          <InformationField label="Phone Number" value={formData.phoneNumber} onChange={(v) => handleChange('phoneNumber', v)} placeholder="Phone Number" variant="text" />

          <button type="submit" className="registro-btn">Registrar</button>
        </form>
      </div>
    </div>
  );
}
