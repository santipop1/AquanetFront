'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { InformationField } from '@/components/InformationField/InformationField';
import { createUser } from '@/services/user/createUser';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '@/app/libreria/firebase';
import { UseAuth } from '@/providers/AuthProvider';

import './Registro.css';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  middleName: string;
  firstLastName: string;
  secondLastName: string;
  birthday: string;
  phoneNumber: string;
  curp?: string;
  rfc?: string;
  profilePictureUrl?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    firstLastName: '',
    secondLastName: '',
    birthday: '',
    phoneNumber: '',
    curp: '',
    rfc: '',
    profilePictureUrl: ''
  });

  const router = useRouter();
  const { setUserContext } = UseAuth();

  const handleFieldChange = (fieldName: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    try {
      
      const authResult = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const firebaseUid = authResult.user.uid;
      console.log("✅ Usuario creado en Firebase:", authResult.user);

      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        middleName: formData.middleName || undefined,
        firstLastName: formData.firstLastName,
        secondLastName: formData.secondLastName,
        birthday: formData.birthday,
        phoneNumber: formData.phoneNumber,
        curp: formData.curp || undefined,
        rfc: formData.rfc || undefined,
        profilePictureUrl: formData.profilePictureUrl || undefined,
        roleId: 1,
        firebaseUid: firebaseUid, 
      };

      console.log("📦 Payload enviado al backend:", payload);

      const result = await createUser(payload);
      console.log("✅ Registro exitoso en backend:", result);

      
      setUserContext(result);

      
      router.push('/dashboard');
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      alert("Error al registrar. Intenta de nuevo.");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("googleUser", JSON.stringify({
        email: user.email || '',
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || ''
      }));

      console.log("🧠 Google login exitoso. Redirigiendo a completar registro...");
      setTimeout(() => {
        router.push('/registro/completar-registro');
      }, 100);
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
            <InformationField label="Email" value={formData.email} onChange={(val) => handleFieldChange("email", val as string)} placeholder="Email" variant="text" />
            <InformationField label="Password" value={formData.password} onChange={(val) => handleFieldChange("password", val as string)} placeholder="Password" variant="password" />
            <InformationField label="Confirmar contraseña" value={formData.confirmPassword} onChange={(val) => handleFieldChange("confirmPassword", val as string)} placeholder="Repite tu contraseña" variant="password" />
            <InformationField label="First Name" value={formData.firstName} onChange={(val) => handleFieldChange("firstName", val as string)} placeholder="First Name" variant="text" />
            <InformationField label="Middle Name (opcional)" value={formData.middleName} onChange={(val) => handleFieldChange("middleName", val as string)} placeholder="Middle Name" variant="text" />
            <InformationField label="First Last Name" value={formData.firstLastName} onChange={(val) => handleFieldChange("firstLastName", val as string)} placeholder="First Last Name" variant="text" />
            <InformationField label="Second Last Name" value={formData.secondLastName} onChange={(val) => handleFieldChange("secondLastName", val as string)} placeholder="Second Last Name" variant="text" />
            <InformationField label="Birthday" value={formData.birthday} onChange={(val) => handleFieldChange("birthday", val as string)} variant="date" />
            <InformationField label="Phone Number" value={formData.phoneNumber} onChange={(val) => handleFieldChange("phoneNumber", val as string)} placeholder="Phone Number" variant="text" />
            <InformationField label="CURP (opcional)" value={formData.curp || ''} onChange={(val) => handleFieldChange("curp", val as string)} placeholder="CURP" variant="text" />
            <InformationField label="RFC (opcional)" value={formData.rfc || ''} onChange={(val) => handleFieldChange("rfc", val as string)} placeholder="RFC" variant="text" />
            <InformationField label="Foto de perfil (URL opcional)" value={formData.profilePictureUrl || ''} onChange={(val) => handleFieldChange("profilePictureUrl", val as string)} placeholder="URL de imagen" variant="text" />

            <button type="submit" className="registro-btn">Registrarse</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
