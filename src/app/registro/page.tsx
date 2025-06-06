'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { InformationField } from '@/components/InformationField/InformationField';
import { createUser } from '@/services/user/createUser';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '@/app/libreria/firebase';
import { UseAuth } from '@/providers/AuthProvider';
import { RingLoader } from 'react-spinners';

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
    phoneNumber: ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setUserContext } = UseAuth();

  const handleFieldChange = (fieldName: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    if (formData.password.length > 0 && formData.password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else {
      setPasswordError("");
    }

    if (
      formData.confirmPassword.length > 0 &&
      formData.password !== formData.confirmPassword
    ) {
      setConfirmError("Las contraseñas no coinciden.");
    } else {
      setConfirmError("");
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setPhoneError("El número debe tener 10 dígitos numéricos.");
    } else {
      setPhoneError("");
    }
  }, [formData.password, formData.confirmPassword, formData.phoneNumber]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmError("Las contraseñas no coinciden.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setPhoneError("El número debe tener 10 dígitos numéricos.");
      return;
    }

    setPasswordError("");
    setConfirmError("");
    setPhoneError("");
    setLoading(true);

    try {
      const authResult = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const payload: any = {
        firstName: formData.firstName,
        firstLastName: formData.firstLastName,
        secondLastName: formData.secondLastName,
        birthday: new Date(formData.birthday),
        phoneNumber: formData.phoneNumber,
        curp: "",
        rfc: "",
        firebaseId: authResult.user.uid
      };

      if (formData.middleName.trim() !== '') {
        payload.middleName = formData.middleName;
      }

      const result = await createUser(payload);
      setUserContext(result);

      router.push('/dashboard');
    } catch (error) {
      setErrorMsg("Error al registrar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("googleUser", JSON.stringify({
        email: user.email || '',
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || ''
      }));

      setTimeout(() => {
        router.push('/registro/completar-registro');
      }, 100);
    } catch (error: any) {
      setErrorMsg("Error con Google. Intenta de nuevo.");
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
            {passwordError && <div className="password-error-pop">{passwordError}</div>}
            <InformationField label="Confirmar contraseña" value={formData.confirmPassword} onChange={(val) => handleFieldChange("confirmPassword", val as string)} placeholder="Repite tu contraseña" variant="password" />
            {confirmError && <div className="password-error-pop">{confirmError}</div>}
            <InformationField label="First Name" value={formData.firstName} onChange={(val) => handleFieldChange("firstName", val as string)} placeholder="First Name" variant="text" />
            <InformationField label="Middle Name (opcional)" value={formData.middleName} onChange={(val) => handleFieldChange("middleName", val as string)} placeholder="Middle Name" variant="text" />
            <InformationField label="First Last Name" value={formData.firstLastName} onChange={(val) => handleFieldChange("firstLastName", val as string)} placeholder="First Last Name" variant="text" />
            <InformationField label="Second Last Name" value={formData.secondLastName} onChange={(val) => handleFieldChange("secondLastName", val as string)} placeholder="Second Last Name" variant="text" />
            <InformationField label="Birthday" value={formData.birthday} onChange={(val) => handleFieldChange("birthday", val as string)} variant="date" />
            <InformationField label="Phone Number" value={formData.phoneNumber} onChange={(val) => handleFieldChange("phoneNumber", val as string)} placeholder="Phone Number" variant="text" />
            {phoneError && <div className="text-sm text-red-600 mt-1 ml-1">{phoneError}</div>}

            <button type="submit" className="registro-btn">Registrarse</button>

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
