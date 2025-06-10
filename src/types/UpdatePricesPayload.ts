
export interface UpdatePricesPayload {
  waterPlantId: number;
  pricePerJug?: number;
  pricePerLiter?: number;
  pricePerGallon?: number;
  rentPerMonth?: number;
  waterPricePerBimester?: number;
  lightPricePerBimester?: number;
  pelletsPrice?: number;
  pelletsKg?: number;
  pelletsKgPerMonth?: number;
  // Agrega aquí otros campos si tu endpoint espera más datos
}
