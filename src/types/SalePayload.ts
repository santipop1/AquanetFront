
export interface SalePayload {
  waterPlantId: number;
  amount: number;
  date: string; // ISO string
  description?: string;
  // Agrega aquí otros campos según tu modelo de venta
}
