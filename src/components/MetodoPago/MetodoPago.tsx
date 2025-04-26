import React from "react";
import "./MetodoPago.css";

const MetodoPago = () => {
  return (
    <div className="metodo-container">
      <img
        src="/aquanet_plus.png"
        alt="Logo aquanet"
        className="metodo-logo"
      />

      <form className="metodo-form">
        <label>
          Número de tarjeta
          <input type="text" placeholder="Número de tarjeta" />
        </label>

        <label>
          Nombre del titular de la tarjeta
          <input type="text" placeholder="Nombre del titular de la tarjeta" />
        </label>

        <div className="metodo-flex">
          <label>
            Fecha de expiración
            <input type="text" placeholder="Mes/Año" />
          </label>

          <label>
            cvv
            <input type="text" placeholder="cvv" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default MetodoPago;
