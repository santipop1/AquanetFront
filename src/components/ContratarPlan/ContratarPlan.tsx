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
    <div className="plan-card">
      <h3 className="plan-titulo">{titulo}</h3>
      <p className="plan-precio">{precio}</p>
      <p className="plan-periodicidad">{periodicidad}</p>
      {notaAdicional && <p className="plan-nota">{notaAdicional}</p>}
      <button className="plan-boton" onClick={onContratar}>
        Contratar
      </button>
    </div>
  );
};

export default ContratarPlan;
