'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {  getSales, createSale } from '@/services/sales';
import './RecuadroVentas.css';

const RecuadroVentas = ({ waterPlantId }: { waterPlantId: number | null }) => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [nuevaVenta, setNuevaVenta] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [form, setForm] = useState({ quantityJug: '', quantityLiter: '', quantityGallon: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!waterPlantId) return;
    getSales(waterPlantId).then((res) => {
      setSalesData(res);
      if (res.length > 0) setSelectedYear(res[0].year);
    });
  }, [waterPlantId]);

  useEffect(() => {
    if (!selectedYear || salesData.length === 0) return;
    const yearData = salesData.find((y) => y.year === selectedYear);
    if (!yearData) return setData([]);
    // Map months to names
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    const chartData = yearData.salesByMonth.map((m: any) => ({
      mes: months[m.month - 1],
      ventas: m.totalLiters,
    }));
    setData(chartData);
  }, [selectedYear, salesData]);

  const agregarVenta = async () => {
    if (!form.quantityJug && !form.quantityLiter && !form.quantityGallon) return;
    setLoading(true);
    try {
      await createSale({
        waterPlantId,
        quantityJug: Number(form.quantityJug),
        quantityLiter: Number(form.quantityLiter),
        quantityGallon: Number(form.quantityGallon)
      });
      setForm({ quantityJug: '', quantityLiter: '', quantityGallon: '' });
      setMostrarFormulario(false);
      // Opcional: recargar ventas después de agregar
    } catch (e) {
      alert('Error al registrar venta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recuadro-ventas">
      <h3 className="titulo-ventas">Ventas Proyectadas</h3>
      {salesData.length > 0 && (
        <select
          value={selectedYear ?? ''}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="ventas-dropdown"
        >
          {salesData.map((y) => (
            <option key={y.year} value={y.year}>
              {y.year}
            </option>
          ))}
        </select>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A', //Recuadro de info
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
            }}
            itemStyle={{ color: '#ffffff' }}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
          />
          <Bar dataKey="ventas" fill="#8cc2c0" /> {/* Color de las barras */}
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
          <h4 style={{ color: 'white' }}>Registrar Venta</h4>
          <input
            type="number"
            value={form.quantityJug}
            onChange={(e) => setForm(f => ({ ...f, quantityJug: e.target.value }))}
            placeholder="Cantidad de garrafones"
            style={{ color: 'white' }}
          />

            <input
              type="number"
              value={form.quantityLiter}
              onChange={(e) => setForm(f => ({ ...f, quantityLiter: e.target.value }))}
              placeholder="Cantidad de litros"
              style={{ color: 'white' }}
            />
            <input
              type="number"
              value={form.quantityGallon}
              onChange={(e) => setForm(f => ({ ...f, quantityGallon: e.target.value }))}
              placeholder="Cantidad de galones"
              style={{ color: 'white' }}
            />
            <div className="dc-popup-buttons">
              <button onClick={agregarVenta} disabled={loading}>Guardar</button>
              <button onClick={() => setMostrarFormulario(false)} disabled={loading}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecuadroVentas;
