'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { InformationField } from '@/components/InformationField/InformationField';
import { createUser, CreateUserPayload } from '@/services/user/createUser';
import { UseAuth } from '@/providers/AuthProvider';
import { auth } from '@/app/libreria/firebase';
import { RingLoader } from 'react-spinners';
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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [phoneError, setPhoneError] = useState('');

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
        password: Math.random().toString(36).slice(-8)
      }));
    } else {
      router.push('/registro');
    }
  }, [router]);

  const handleFieldChange = (fieldName: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setPhoneError("El número debe tener 10 dígitos numéricos.");
    } else {
      setPhoneError('');
    }
  }, [formData.phoneNumber]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setPhoneError("El número debe tener 10 dígitos numéricos.");
      setLoading(false);
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setErrorMsg('No se encontró el usuario autenticado con Google.');
        setLoading(false);
        return;
      }

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
        roleId: 1,
        firebaseId: currentUser.uid
      };

      const userCreated = await createUser(payload);
      setUserContext(userCreated);
      localStorage.removeItem("googleUser");
      router.push("/dashboard");
    } catch (error) {
      console.error('❌ Error creando usuario:', error);
      setErrorMsg('Error al registrar. Verifica los datos o contacta al soporte.');
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
            {phoneError && <div className="text-sm text-red-600 mt-1 ml-1">{phoneError}</div>}

            <button type="submit" className="registro-btn">Registrar</button>

            {errorMsg && (
              <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded">
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
