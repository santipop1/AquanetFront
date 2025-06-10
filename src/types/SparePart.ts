
export interface SparePart {
  id: number;
  name: string;
  description?: string;
  waterPlantId: number;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  // Agrega aquí otros campos según tu modelo de repuesto
}
