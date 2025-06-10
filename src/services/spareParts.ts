import api from '../services/api';
import { SparePart } from '../types/SparePart';

export const getSpareParts = async (waterplantid: number): Promise<SparePart[]> => {
  try {
    const { data } = await api.post('/spareparts', waterplantid, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    console.log('Repuestos obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener repuestos:', error);
    throw error;
  }
};

export const UpdatedSparePart = async (sparepartid: number) => {
   try {
    const { data } = await api.post('/spareparts/updated', sparepartid, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    console.log('Repuestos actualizados:', data);
    return data;
  } catch (error) {
    console.error('Error al actualizar repuestos:', error);
    throw error;
  }
};