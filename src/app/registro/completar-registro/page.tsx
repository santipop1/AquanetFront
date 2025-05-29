'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { InformationField } from '@/components/InformationField/InformationField';
import { createUser, CreateUserPayload } from '@/services/user/createUser';
import { UseAuth } from '@/providers/AuthProvider';
import '../Registro.css';

interface FormData {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  firstLastName: string;
  secondLastName: string;
  birthday: string;
  phoneNumber: string;
}

export default function CompletarRegistro() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    firstLastName: '',
    secondLastName: '',
    birthday: '',
    phoneNumber: ''
  });

  const router = useRouter();
  const { setUserContext } = UseAuth();

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
        password: Math.random().toString(36).slice(-8) // ✅ Password aleatorio
      }));
    } else {
      router.push('/registro');
    }
  }, []);

  const handleFieldChange = (fieldName: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // ✅ Crear solo en tu backend (el usuario ya fue autenticado con Google en Firebase)
      const payload: CreateUserPayload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        middleName: formData.middleName,
        firstLastName: formData.firstLastName,
        secondLastName: formData.secondLastName,
        birthday: new Date(formData.birthday),
        phoneNumber: formData.phoneNumber,
        curp: '',
        rfc: '',
        profilePictureUrl: '',
        roleId: 1, // ✅ Se incluye como en el registro tradicional
      };

      console.log('📦 Payload enviado:', payload);
      const userCreated = await createUser(payload);
      setUserContext(userCreated);

      localStorage.removeItem("googleUser");
      alert("✅ Registro completado");
      console.log("🔀 Redirigiendo a /dashboard...");
      router.push("/dashboard");
    } catch (error) {
      console.error('❌ Error creando usuario:', error);
      alert('❌ Error al registrar. Verifica consola o contacta a backend.');
    }
  };

  return (
    <>
      <Header />
      <div className="registro-container">
        <div className="form-card">
          <Image src="/logo.png" alt="aquaNet" width={150} height={60} className="mx-auto" />
          <h2>Completa tu registro</h2>
          <p>Necesitamos algunos datos adicionales para crear tu cuenta.</p>

          <hr className="divider" />

          <form onSubmit={handleSubmit}>
            <InformationField label="Email" value={formData.email} onChange={(val) => handleFieldChange("email", val as string)} placeholder="Email" variant="text" />
            <input type="hidden" value={formData.password} readOnly />
            <InformationField label="First Name" value={formData.firstName} onChange={(val) => handleFieldChange("firstName", val as string)} placeholder="First Name" variant="text" />
            <InformationField label="Middle Name" value={formData.middleName} onChange={(val) => handleFieldChange("middleName", val as string)} placeholder="Middle Name" variant="text" />
            <InformationField label="First Last Name" value={formData.firstLastName} onChange={(val) => handleFieldChange("firstLastName", val as string)} placeholder="First LastName" variant="text" />
            <InformationField label="Second Last Name" value={formData.secondLastName} onChange={(val) => handleFieldChange("secondLastName", val as string)} placeholder="Second Last Name" variant="text" />
            <InformationField label="Birthday" value={formData.birthday} onChange={(val) => handleFieldChange("birthday", val as string)} variant="date" />
            <InformationField label="Phone Number" value={formData.phoneNumber} onChange={(val) => handleFieldChange("phoneNumber", val as string)} placeholder="Phone Number" variant="text" />

            <button type="submit" className="registro-btn">Registrar</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
