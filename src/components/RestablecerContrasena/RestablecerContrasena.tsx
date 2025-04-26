import React, { useState } from "react";
import "./RestablecerContrasena.css";
import { ButtonText } from "@/components/ButtonText/ButtonText";

const RestablecerContrasena = () => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    alert(`Correo enviado a: ${email}`);
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
        <ButtonText
          label="Enviar correo"
          variant="variant2"
          onClick={handleSend}
          disabled={!email}
        />
      </div>
    </div>
  );
};

export default RestablecerContrasena;
