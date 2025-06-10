import React, { useEffect, useState } from "react";
import "./RecuadroRefacciones.css";
import { getSpareParts, UpdatedSparePart } from "@/services/spareParts";

const RecuadroRefacciones = ({ waterPlantId }: { waterPlantId: number | null }) => {
  const [spareParts, setSpareParts] = useState<any[]>([]);

  useEffect(() => {
    if (!waterPlantId) return;
    getSpareParts(waterPlantId).then(setSpareParts);
  }, [waterPlantId]);

  const getCountdown = (date: string | null) => {
    if (!date) return 'Sin registro';
    const now = new Date();
    const target = new Date(date);
    let diff = target.getTime() - now.getTime();
    if (diff <= 0) return '¡Ya toca!';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remDays = days % 30;
    let str = '';
    if (years > 0) str += `${years} Año${years > 1 ? 's' : ''} `;
    if (months > 0) str += `${months} Mes${months > 1 ? 'es' : ''} `;
    if (remDays > 0) str += `${remDays} Día${remDays > 1 ? 's' : ''}`;
    return str.trim();
  };

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
          {spareParts.map((sp) => (
            <tr key={sp.id}>
              <td>{sp.name}</td>
              <td>{getCountdown(sp.nextChangeDate)}</td>
              <td>
                <button
                 className="text-white font-bold bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded"
                 onClick={async () => {
                  try {
                    await UpdatedSparePart(sp.id);
                    alert('Cambio registrado correctamente');
                  } catch {
                    alert('Error al registrar cambio');
                  }
                }}>
                  Registrar cambio
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecuadroRefacciones;