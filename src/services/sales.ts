import api from '../services/api';
import { SalePayload } from '../types/SalePayload';


export const getSales = async (waterplantid: number) => {
  try {
    const { data } = await api.post('/sales/graph', waterplantid, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    console.log('Ventas obtenidas:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    throw error;
  }
};

export const createSale = async (payload: SalePayload) => {
    try {
        const res = await api.post('/sales', payload);
        console.log('Venta creada:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error creando venta:', error);
        throw error;
    }
};