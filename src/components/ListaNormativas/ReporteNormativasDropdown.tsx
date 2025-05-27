import React, { useState } from 'react';
import './ReporteNormativasDropdown.css';

const normativas = [
  "NOM-127-SSA1-2021",
  "NOM-201-SSA1-2015",
  "NOM-179-SSA1-2020",
  "NOM-244-SSA1-2020",
  "NOM-014-SSA1-1993",
  "NOM-117-SSA1-1994",
  "NOM-160-SSA1-1995",
  "NOM-041-SSA1-1993",
  "NOM-012-SSA1-1993",
  "NOM-013-SSA1-1993",
  "NOM-086-SSA1-1994",
  "NOM-120-SSA1-1994",
  "NOM-161-SEMARNAT-2011",
  "Ley General para la Prevención y Gestión Integral de los Residuos (LGPGIR)",
  "NOM-052-SEMARNAT-2005"
];

export const ReporteNormativasDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div>
      <button className="open-popup-button" onClick={() => setIsOpen(true)}>
        Reporte de cumplimiento de normativas vigentes
      </button>

      {isOpen && (
        <div className="popup-overlay" onClick={handleOverlayClick}>
          <div className={`popup-content ${closing ? 'fade-out' : 'fade-in'}`}>
            <button className="close-popup-button" onClick={handleClose}>
              &times;
            </button>
            <h2 className="dropdown-title">Reporte de cumplimiento de normativas vigentes</h2>
            <p className="dropdown-message">
              ¡Felicidades! Tu franquicia cumple todos los parámetros vigentes
            </p>
            <ul className="dropdown-list">
              {normativas.map((norma, index) => (
                <li key={index} className="dropdown-item">{norma}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
