// src/components/RecuadroDashboard/RecuadroDashboard.tsx
import React from "react";
import "./RecuadroDashboard.css";

interface RecuadroDashboardProps {
  variante: "refacciones" | "info" | "ventas";
}

const RecuadroDashboard = ({ variante }: RecuadroDashboardProps) => {
  return (
    <div className={`dc-container dc-${variante}`}>
      {variante === "refacciones" && (
        <>
          <h3 className="dc-title">Refacciones</h3>
          <table className="dc-table">
            <thead>
              <tr>
                <th>Refacción</th>
                <th>Siguiente cambio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Filtro de sedimentos</td><td>4 Meses 17 Días</td><td><button>Registrar cambio</button></td></tr>
              <tr><td>Filtro de carbón activado</td><td>7 Meses 12 Días</td><td><button>Registrar cambio</button></td></tr>
              <tr><td>Membrana de ósmosis inversa</td><td>1 Año 3 Meses 21 Días</td><td><button>Registrar cambio</button></td></tr>
              <tr><td>Bomba de presión</td><td>2 Años 4 Meses</td><td><button>Registrar cambio</button></td></tr>
              <tr><td>Lámpara de luz UV</td><td>3 Meses 15 Días</td><td><button>Registrar cambio</button></td></tr>
              <tr><td>Mangueras</td><td>1 Año 9 Meses 3 Días</td><td><button>Registrar cambio</button></td></tr>
            </tbody>
          </table>
        </>
      )}

      {variante === "info" && (
        <>
          <h3 className="dc-title">Información</h3>
          <p><strong>Dirección</strong><br />Luz Saviñón 830, Col. del Valle Nte, Benito Juárez, 03103, CDMX</p>
          <p><strong>Tipo de purificadora</strong><br />Ventana 24 horas con ósmosis inversa</p>

          <div className="dc-block">
            <strong>Precios</strong>
            <label>$ <input type="number" defaultValue={15} /> por garrafón</label>
            <label>$ <input type="number" defaultValue={0.75} step="0.01" /> por litro</label>
            <label>$ <input type="number" defaultValue={2.8} step="0.1" /> por galón</label>
          </div>

          <div className="dc-block">
            <strong>Gastos</strong>
            <label>$ <input type="number" defaultValue={12000} /> de renta por mes</label>
            <label>$ <input type="number" defaultValue={863} /> de agua por bimestre</label>
            <label>$ <input type="number" defaultValue={1200} /> de luz por bimestre</label>
            <label>$ <input type="number" defaultValue={300} /> por <input type="number" defaultValue={20} /> kg de sal en pellets</label>
            <label>$ <input type="number" defaultValue={2.5} step="0.1" /> kg de sal en pellets por mes</label>
          </div>

          <div className="dc-block">
            <strong>Limpieza de tanques en:</strong><br />
            <span className="dc-fecha">3 Meses 2 Días</span><br />
            <button className="dc-btn-secondary">Registrar limpieza</button>
          </div>
        </>
      )}

      {variante === "ventas" && (
        <>
          <h3 className="dc-title">Ventas proyectadas</h3>
          <div className="dc-tabs">
            <button className="active">Siguiente mes</button>
            <button>3 Meses</button>
            <button>6 Meses</button>
            <button>12 Meses</button>
          </div>

          <div className="dc-grafica-placeholder">
            <p>Gráfico de barras de ventas</p>
          </div>

          <button className="dc-btn-secondary">Generar Reporte</button>
        </>
      )}
    </div>
  );
};

export default RecuadroDashboard;
