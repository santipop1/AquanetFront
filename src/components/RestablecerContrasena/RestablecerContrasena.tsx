import React, { useState } from "react";
import "./RestablecerContrasena.css";

const RestablecerContrasena = () => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    alert(`Correo enviado a: ${email}`);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="rc-container">
      <h2 className="rc-title">Restablecer contraseña</h2>
      <p className="rc-subtitle">Confirma tu correo electrónico</p>

      <label htmlFor="email" className="rc-label">
        Correo electrónico
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingresa tu correo"
        className="rc-input"
      />

      <div className="rc-button-wrapper">
        {/* El botón se deshabilita visualmente y funcionalmente si el email no es válido */}
        <div style={{ width: '100%' }}>
          <button
            className="button-text variant2 size-md"
            onClick={handleSend}
            disabled={!isValidEmail(email)}
            style={{ width: '100%' }}
            type="button"
          >
            Enviar correo
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestablecerContrasena;
