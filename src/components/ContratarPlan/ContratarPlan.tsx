import React from "react";
import "./ContratarPlan.css";

export interface ContratarPlanProps {
  titulo: string;
  precio: string;
  periodicidad: string;
  notaAdicional?: string;
  onContratar?: () => void;
}

const ContratarPlan = ({
  titulo,
  precio,
  periodicidad,
  notaAdicional,
  onContratar,
}: ContratarPlanProps) => {
  return (
    <div className="plan-card hover:-translate-y-1 duration-300 shadow-2xl">
      <h3 className="plan-titulo">{titulo}</h3>
      <p className="plan-precio">{precio}</p>
      <p className="plan-periodicidad">{periodicidad}</p>
      {notaAdicional && <p className="plan-nota">{notaAdicional}</p>}
      <button className="plan-boton bg-gradient-to-r from-green-400 to-green-600" onClick={onContratar}>
        Contratar
      </button>
    </div>
  );
};

export default ContratarPlan;
