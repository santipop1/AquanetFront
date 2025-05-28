'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './RecuadroVentas.css';

const initialData = [
  { mes: 'Ene', ventas: 400 },
  { mes: 'Feb', ventas: 300 },
  { mes: 'Mar', ventas: 500 },
  { mes: 'Abr', ventas: 200 },
  { mes: 'May', ventas: 350 },
];

const RecuadroVentas = () => {
  const [data, setData] = useState(initialData);
  const [nuevaVenta, setNuevaVenta] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarVenta = () => {
    if (nuevaVenta.trim() === '') return;

    const nuevaEntrada = {
      mes: `Mes ${data.length + 1}`,
      ventas: parseFloat(nuevaVenta),
    };

    setData([...data, nuevaEntrada]);
    setNuevaVenta('');
    setMostrarFormulario(false);
  };

  return (
    <div className="recuadro-ventas ">
      <h3 className="titulo-ventas">Ventas Proyectadas</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ventas" fill="#2455f4" />
        </BarChart>
      </ResponsiveContainer>

      <button
        className="btn-registrar-venta"
        onClick={() => setMostrarFormulario(true)}
      >
        Registrar venta del mes
      </button>

      {mostrarFormulario && (
        <div className="dc-popup">
          <div className="dc-popup-inner">
            <h4>Registrar Venta</h4>
            <input
              type="number"
              value={nuevaVenta}
              onChange={(e) => setNuevaVenta(e.target.value)}
              placeholder="Monto de la venta"
            />
            <div className="dc-popup-buttons">
              <button onClick={agregarVenta}>Guardar</button>
              <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecuadroVentas;
