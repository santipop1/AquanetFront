'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/app/libreria/firebase';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { InformationField } from '@/components/InformationField/InformationField';
import ResetPassword from '@/components/ResetPassword/ResetPassword';

import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!correo || !contrasena) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      alert('¡Inicio de sesión exitoso!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(`Error al iniciar sesión:\nFirebase: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert('¡Inicio de sesión con Google exitoso!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(`Error con Google:\nFirebase: ${error.message}`);
    }
  };

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
              value={correo}
              placeholder="Correo electrónico"
              onChange={setCorreo}
            />

            <InformationField
              variant="password"
              label="Contraseña"
              value={contrasena}
              placeholder="Contraseña"
              onChange={setContrasena}
            />

            <button type="submit" className="registro-btn">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <Footer />

      {showResetModal && <ResetPassword onClose={() => setShowResetModal(false)} />}
    </>
  );
}
