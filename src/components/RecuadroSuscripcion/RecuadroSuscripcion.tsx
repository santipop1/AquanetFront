import React from "react";
import "./RecuadroSuscripcion.css";

export interface RecuadroSuscripcionProps {
  variante: "variant1" | "variant2";
  logoSrc: string;
  nombre: string;
  descripcion: string;
  botonTexto: string;
  precio: string;
  nota?: string;
  fechaInicio?: string;
}

const RecuadroSuscripcion = ({
  variante,
  logoSrc,
  nombre,
  descripcion,
  botonTexto,
  precio,
  nota,
  fechaInicio,
}: RecuadroSuscripcionProps) => {
  return (
    <div className={`rs-container ${variante}`}>
      <div className="rs-header">
        <img src={logoSrc} alt="logo" className="rs-logo" />
        <div className="rs-info">
          <p className="rs-nombre">{nombre}</p>
          <p className="rs-descripcion">{descripcion}</p>
        </div>
      </div>

      <div className="rs-body">
        <button className="rs-boton">
          <div className="rs-boton-content">
            <span>{botonTexto}</span>
            <span>{precio}</span>
          </div>
        </button>
      </div>

      {variante === "variant1" && (
        <>
          {nota && <p className="rs-nota">{nota}</p>}
          {fechaInicio && (
            <p className="rs-fecha">
              Se te cobrará a partir de <strong>{fechaInicio}</strong>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default RecuadroSuscripcion;
