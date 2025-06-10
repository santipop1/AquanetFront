import React, { useState, useEffect } from 'react';
import './ResetPassword.css';

interface ResetPasswordProps {
  onClose: () => void;
  emailDefault?: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onClose, emailDefault }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (emailDefault) setEmail(emailDefault);
  }, [emailDefault]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  const handleReset = async () => {
    if (!email) {
      setMessage("Por favor, ingresa tu correo.");
      return;
    }

    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      const { auth } = await import('@/app/libreria/firebase');

      await sendPasswordResetEmail(auth, email);
      setMessage('Correo enviado. Revisa tu bandeja de entrada.');
    } catch (error) {
      console.error('Error al enviar correo:', error);
      setMessage('Error. Intenta de nuevo.');
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className="reset-title">Restablecer Contraseña</h2>
        <input
          type="email"
          className="reset-input"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="reset-button"
          onClick={handleReset}
          disabled={!email.trim()}
        >
          Enviar correo
        </button>
        {message && <p className="reset-message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
