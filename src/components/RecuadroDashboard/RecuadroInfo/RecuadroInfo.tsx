import React from "react";
import "./RecuadroInfo.css";

const RecuadroInfo = () => {
  return (
    <div className="dc-container recuadro-info">
      <h3 className="dc-title">Información</h3>
      <p><strong>Dirección</strong><br />Luz Saviñón 830, Col. del Valle Nte, Benito Juárez, 03103, CDMX</p>
      <p><strong>Tipo de purificadora</strong><br />Ventana 24 horas con ósmosis inversa</p>

      <div className="dc-block">
        <strong>Precios</strong>
        <label></label>
        <p><label> $ <input type="number" defaultValue={15} /> por garrafón</label></p>
        <p><label> $ <input type="number" defaultValue={0.75} step="0.01" /> por litro</label></p>
        <label>$ <input type="number" defaultValue={2.8} step="0.1" /> por galón</label>
      </div>

      <div className="dc-block">
        <strong>Gastos</strong>
       <p><label>$ <input type="number" defaultValue={12000} /> de renta por mes</label></p>
       <p><label>$ <input type="number" defaultValue={863} /> de agua por bimestre</label></p>
       <p><label>$ <input type="number" defaultValue={1200} /> de luz por bimestre</label></p>
       <p><label>$ <input type="number" defaultValue={300} /> por <input type="number" defaultValue={20} /> kg de sal en pellets</label></p>
       <p><label>$ <input type="number" defaultValue={2.5} step="0.1" /> kg de sal en pellets por mes</label></p>
      </div>

      <div className="dc-block">
        <strong>Limpieza de tanques en:</strong><br />
        <span className="dc-fecha">3 Meses 2 Días</span><br />
        <button className="dc-btn-secondary">Registrar limpieza</button>
      </div>
    </div>
  );
};

export default RecuadroInfo;
