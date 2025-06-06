'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, provider } from '@/app/libreria/firebase';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { InformationField } from '@/components/InformationField/InformationField';
import ResetPassword from '@/components/ResetPassword/ResetPassword';

import { RingLoader } from 'react-spinners';
import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const waitForFirebaseUser = (): Promise<void> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          unsubscribe();
          resolve();
        }
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!correo || !contrasena) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, correo, contrasena);
      await waitForFirebaseUser();
      router.push('/dashboard');
    } catch (error: any) {
      setErrorMsg('Inicio de sesión incorrecto. Verifica tus datos e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      await waitForFirebaseUser();
      router.push('/dashboard');
    } catch (error: any) {
      setErrorMsg('Error con Google. Intenta de nuevo.');
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
          <h2>Iniciar Sesión</h2>
          <p>
            ¿No tienes cuenta?{' '}
            <Link href="/registro" className="link-style">
              Regístrate aquí
            </Link>
          </p>
          <p>
            ¿Olvidaste tu contraseña?{' '}
            <button onClick={() => setShowResetModal(true)} className="link-style-btn">
              Recupérala aquí
            </button>
          </p>

          <button type="button" className="google-auth-btn" onClick={handleGoogleLogin}>
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            <span>Continuar con Google</span>
          </button>

          <hr className="divider" />

          <form onSubmit={handleSubmit}>
            <InformationField
              variant="text"
              label="Correo electrónico"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(val) => setCorreo(String(val))}
            />

            <InformationField
              variant="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(val) => setContrasena(String(val))}
            />

            <button type="submit" className="registro-btn">
              Iniciar sesión
            </button>

            {errorMsg && (
              <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded">
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />

      {showResetModal && <ResetPassword onClose={() => setShowResetModal(false)} />}
    </>
  );
}
