'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import './Registro.css';

interface FormData {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
}

export default function Registro() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Registrado:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <>
      <Header />
      <div className="registro-container">
        <div className="form-card">
          
          <Image src="/logo.png" alt="aquaNet" width={150} height={60} className='mx-auto'/>
          

          <h2>Regístrate</h2>
          <p>¿Ya tienes cuenta? <a href="/login" className='underline'>Inicia sesión</a></p>

          {/* Botón personalizado de Google */}
          <button className="google-auth-btn">
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            <span>Continue with Google</span>
          </button>

          <hr className="divider" />

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre(s)"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido(s)"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
            <button type="submit" className="registro-btn">
              Regístrate
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
