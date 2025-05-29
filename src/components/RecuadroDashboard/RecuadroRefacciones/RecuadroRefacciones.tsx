import React from "react";
import "./RecuadroRefacciones.css";

const RecuadroRefacciones = () => {
  return (
    <div className="dc-container recuadro-refacciones">
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
    </div>
  );
};

export default RecuadroRefacciones;
