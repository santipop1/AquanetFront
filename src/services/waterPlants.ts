import api from './api';
import { WaterPlant } from '../types/WaterPlant';
import { UpdatePricesPayload } from '../types/UpdatePricesPayload';

export const ListWaterPlantsAll = async (): Promise<WaterPlant[]> => {
  try {
      const { data } = await api.get('/waterplants/listall');
      console.log('Plantas de agua obtenidas:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener plantas de agua:', error);
      throw error;
    }
};

export const ListWaterPlants = async (params: { id: string }): Promise<WaterPlant[]> => {
  try {
      const { data } = await api.post('/waterplants/list', params);
      console.log('Plantas de agua obtenidas:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener plantas de agua:', error);
      throw error;
    }
};

export const UpdatePrices = async (payload: UpdatePricesPayload) => {
    try {
        const { data } = await api.patch('/waterplants/moneyinfo', payload);
        console.log('Precios actualizados:', data);
        return data;
    } catch (error) {
        console.error('Error al actualizar precios:', error);
        throw error;
    }
};

export const GetPrices = async (id: number) => {
    try {
        const { data } = await api.post('/waterplants/moneyinfo', id, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
        console.log('Precios obtenidas:', data);
        return data;
      } catch (error) {
        console.error('Error al obtener precios:', error);
        throw error;
      }
};