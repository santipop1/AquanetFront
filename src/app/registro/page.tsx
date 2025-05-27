'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { InformationField } from '@/components/InformationField/InformationField';
import { createUser } from '@/services/user';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/app/libreria/firebase';

import './Registro.css';

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

export default function Register() {
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

  const handleFieldChange = (fieldName: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const result = await createUser(payload);
      console.log("✅ Registro exitoso:", result);
      alert("✅ Registro exitoso. ¡Bienvenido!");

      setFormData({
        email: '',
        password: '',
        firstName: '',
        middleName: '',
        firstLastName: '',
        secondLastName: '',
        birthday: '',
        phoneNumber: ''
      });

      router.push('/dashboard');
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      alert("Error al registrar. Intenta de nuevo.");
    }
  };

  // ✅ Actualizado: manejo de Google con redirección y datos temporales
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guardar en localStorage para que se use en /registro/completar-registro
      localStorage.setItem("googleUser", JSON.stringify({
        email: user.email || '',
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || ''
      }));

      // Redirigir al paso de completar el registro
      router.push('/registro/completar-registro');
    } catch (error: any) {
      alert(`❌ Error con Google:\nFirebase: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="registro-container">
        <div className="form-card">
          <Image src="/logo.png" alt="aquaNet" width={150} height={60} className="mx-auto" />
          <h2>Crear cuenta</h2>
          <p>
            ¿Ya tienes una cuenta? <a href="/login" className="underline">Inicia sesión</a>
          </p>

          <button className="google-auth-btn" onClick={handleGoogleAuth}>
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            <span>Continuar con Google</span>
          </button>

          <hr className="divider" />

          <form onSubmit={handleSubmit}>
            <InformationField label="Email" value={formData.email} onChange={(val) => handleFieldChange("email", val)} placeholder="Email" variant="text" />
            <InformationField label="Password" value={formData.password} onChange={(val) => handleFieldChange("password", val)} placeholder="Password" variant="password" />
            <InformationField label="First Name" value={formData.firstName} onChange={(val) => handleFieldChange("firstName", val)} placeholder="First Name" variant="text" />
            <InformationField label="Middle Name" value={formData.middleName} onChange={(val) => handleFieldChange("middleName", val)} placeholder="Middle Name" variant="text" />
            <InformationField label="First Last Name" value={formData.firstLastName} onChange={(val) => handleFieldChange("firstLastName", val)} placeholder="First LastName" variant="text" />
            <InformationField label="Second Last Name" value={formData.secondLastName} onChange={(val) => handleFieldChange("secondLastName", val)} placeholder="Second Last Name" variant="text" />
            <InformationField label="Birthday" value={formData.birthday} onChange={(val) => handleFieldChange("birthday", val)} variant="date" />
            <InformationField label="Phone Number" value={formData.phoneNumber} onChange={(val) => handleFieldChange("phoneNumber", val)} placeholder="Phone Number" variant="text" />

            <button type="submit" className="registro-btn">Registrarse</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
