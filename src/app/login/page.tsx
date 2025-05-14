'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { InformationField } from '@/components/InformationField/InformationField';
import './Login.css'; // Usa el mismo estilo de registro o uno similar

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    alert(`Iniciando sesión con:\nCorreo: ${correo}\nContraseña: ${contrasena}`);
  };

  const handleGoogleLogin = () => {
    alert('Redirigiendo a autenticación con Google...');
  };

  return (
    <>
      <Header />
      <div className="registro-container">
        <div className="form-card">
          <Image src="/logo.png" alt="aquaNet" width={150} height={60} className="mx-auto" />
          <h2>Iniciar Sesión</h2>
          <p>
            ¿No tienes cuenta? <Link href="/registro" className="underline">Regístrate aquí</Link>
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
    </>
  );
}
