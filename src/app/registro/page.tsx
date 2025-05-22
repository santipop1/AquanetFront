'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import { InformationField } from '@/components/InformationField/InformationField';
import Footer from '@/components/Footer/Footer';
import './Registro.css';

interface FormData {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  contrasena: string;
  verificarContrasena: string;
}

export default function Registro() {
  const [formData, setFormData] = useState<FormData>({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
    contrasena: '',
    verificarContrasena: '',
  });

  const handleFieldChange = (fieldName: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.contrasena !== formData.verificarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    alert(`Registrado:\n${JSON.stringify(formData, null, 2)}`);
  };

  const handleGoogleAuth = () => {
    alert("Redirigiendo a autenticación con Google...");
    // Aquí puedes agregar la lógica real para Firebase/Auth0/etc.
  };

  return (
    <>
      <Header />
      <div className="registro-container">
        <div className="form-card">
          <Image src="/logo.png" alt="aquaNet" width={150} height={60} className="mx-auto" />
          <h2>Regístrate</h2>
          <p>
            ¿Ya tienes cuenta? <a href="/login" className="underline">Inicia sesión</a>
          </p>

          
          <button className="google-auth-btn" onClick={handleGoogleAuth}>
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            <span>Continuar con Google</span>
          </button>

          <hr className="divider" />

          <form onSubmit={handleSubmit}>
            <InformationField
              variant="text"
              label="Primer nombre"
              value={formData.primerNombre}
              placeholder="Primer nombre"
              onChange={(val) => handleFieldChange("primerNombre", val)}
            />

            <InformationField
              variant="text"
              label="Segundo nombre (opcional)"
              value={formData.segundoNombre}
              placeholder="Segundo nombre (opcional)"
              onChange={(val) => handleFieldChange("segundoNombre", val)}
            />

            <InformationField
              variant="text"
              label="Primer apellido"
              value={formData.primerApellido}
              placeholder="Primer apellido"
              onChange={(val) => handleFieldChange("primerApellido", val)}
            />

            <InformationField
              variant="text"
              label="Segundo apellido"
              value={formData.segundoApellido}
              placeholder="Segundo apellido"
              onChange={(val) => handleFieldChange("segundoApellido", val)}
            />

            <InformationField
              variant="date"
              label="Fecha de nacimiento"
              value={formData.fechaNacimiento}
              onChange={(val) => handleFieldChange("fechaNacimiento", val)}
            />

            <InformationField
              variant="text"
              label="Número de teléfono"
              value={formData.telefono}
              placeholder="Número de teléfono"
              onChange={(val) => handleFieldChange("telefono", val)}
            />

            <InformationField
              variant="text"
              label="Correo electrónico"
              value={formData.correo}
              placeholder="Correo electrónico"
              onChange={(val) => handleFieldChange("correo", val)}
            />

            <InformationField
              variant="password"
              label="Contraseña"
              value={formData.contrasena}
              placeholder="Contraseña (mínimo 8 caracteres)"
              onChange={(val) => handleFieldChange("contrasena", val)}
            />

            <InformationField
              variant="password"
              label="Verificar contraseña"
              value={formData.verificarContrasena}
              placeholder="Verificar contraseña"
              onChange={(val) => handleFieldChange("verificarContrasena", val)}
            />

            <button type="submit" className="registro-btn">
              Regístrate
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
