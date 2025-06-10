import React, { useEffect, useState } from "react";
import { GetPrices, UpdatePrices } from "@/services/waterPlants";
import "./RecuadroInfo.css";

interface RecuadroInfoProps {
  franquiciaId: number | null;
}

const defaultPrices = {
  pricePerJug: "",
  pricePerLiter: "",
  pricePerGallon: "",
  rentPerMonth: "",
  waterPricePerBimester: "",
  lightPricePerBimester: "",
  pelletsPrice: "",
  pelletsKg: "",
  pelletsKgPerMonth: ""
};

const RecuadroInfo = ({ franquiciaId }: RecuadroInfoProps) => {
  const [prices, setPrices] = useState({ ...defaultPrices });
  const [originalPrices, setOriginalPrices] = useState({ ...defaultPrices });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!franquiciaId) return;
    setLoading(true);
    GetPrices(franquiciaId)
      .then((data) => {
        const loadedPrices = {
          pricePerJug: data.pricePerJug ?? "",
          pricePerLiter: data.pricePerLiter ?? "",
          pricePerGallon: data.pricePerGallon ?? "",
          rentPerMonth: data.rentPerMonth ?? "",
          waterPricePerBimester: data.waterPricePerBimester ?? "",
          lightPricePerBimester: data.lightPricePerBimester ?? "",
          pelletsPrice: data.pelletsPrice ?? "",
          pelletsKg: data.pelletsKg ?? "",
          pelletsKgPerMonth: data.pelletsKgPerMonth ?? ""
        };
        setPrices(loadedPrices);
        setOriginalPrices(loadedPrices);
      })
      .finally(() => setLoading(false));
  }, [franquiciaId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrices({ ...prices, [e.target.name]: e.target.value });
  };

  const isChanged = Object.keys(prices).some(
    (key) => prices[key as keyof typeof prices] !== originalPrices[key as keyof typeof originalPrices]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!franquiciaId) return;
    setLoading(true);
    try {
      // Convierte los valores string a number (o undefined si vacío)
      const numericPrices = Object.fromEntries(
        Object.entries(prices).map(([key, value]) => [key, value === '' ? undefined : Number(value)])
      );
      await UpdatePrices({ id: franquiciaId, ...numericPrices });
      alert("Precios actualizados correctamente");
      setOriginalPrices(prices); // Actualiza el original después de guardar
    } catch {
      alert("Error al actualizar precios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dc-container recuadro-info">
      <h3 className="dc-title">Información</h3>
      <form onSubmit={handleSubmit}>
        <div className="dc-block">
          <strong>Precios</strong>
          <p>
            <label>
              $ <input type="number" name="pricePerJug" value={prices.pricePerJug} onChange={handleChange} /> por garrafón
            </label>
          </p>
          <p>
            <label>
              $ <input type="number" name="pricePerLiter" value={prices.pricePerLiter} onChange={handleChange} step="0.01" /> por litro
            </label>
          </p>
          <label>
            $ <input type="number" name="pricePerGallon" value={prices.pricePerGallon} onChange={handleChange} step="0.1" /> por galón
          </label>
        </div>
        <div className="dc-block">
          <strong>Gastos</strong>
          <p>
            <label>
              $ <input type="number" name="rentPerMonth" value={prices.rentPerMonth} onChange={handleChange} /> de renta por mes
            </label>
          </p>
          <p>
            <label>
              $ <input type="number" name="waterPricePerBimester" value={prices.waterPricePerBimester} onChange={handleChange} /> de agua por bimestre
            </label>
          </p>
          <p>
            <label>
              $ <input type="number" name="lightPricePerBimester" value={prices.lightPricePerBimester} onChange={handleChange} /> de luz por bimestre
            </label>
          </p>
          <p>
            <label>
              $ <input type="number" name="pelletsPrice" value={prices.pelletsPrice} onChange={handleChange} /> por{" "}
              <input type="number" name="pelletsKg" value={prices.pelletsKg} onChange={handleChange} /> kg de sal en pellets
            </label>
          </p>
          <p>
            <label>
              $ <input type="number" name="pelletsKgPerMonth" value={prices.pelletsKgPerMonth} onChange={handleChange} /> kg de sal en pellets por mes
            </label>
          </p>
        </div>
        <button
          className={`dc-btn-secondary${loading || !isChanged ? ' dc-btn-disabled' : ''}`}
          type="submit"
          disabled={loading || !isChanged}
        >
          {loading ? "Actualizando..." : "Actualizar precios"}
        </button>
      </form>
    </div>
  );
};

export default RecuadroInfo;