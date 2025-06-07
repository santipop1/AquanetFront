import api from './api';

export interface WaterPlantTypeCard {
  id: number;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  price: string;
  size: string;
  brand: string; 
}

export interface WaterPlantTypeDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  sizeM2: number;
  userId: number;
  userFirstName: string;
  userProfilePictureUrl: string;
}

export const getWaterPlantTypes = async (): Promise<WaterPlantTypeCard[]> => {
  const { data } = await api.get<WaterPlantTypeDTO[]>('/water-plant-types/list');

  return data.map((item) => ({
    id: item.id,
    title: item.name,
    year: '2025', 
    description: item.description,
    imageUrl: item.userProfilePictureUrl ?? 'https://via.placeholder.com/300x300?text=Sin+Imagen',
    price: `$${item.price.toLocaleString()} MXN`,
    size: `${item.sizeM2} m²`,
    brand: item.userFirstName, 
  }));
};

export const getWaterPlantTypesByUser = async (id: number): Promise<WaterPlantTypeCard[]> => {
  try {
    const { data } = await api.get<WaterPlantTypeDTO[]>('/water-plant-types/listbyuser', { params: { id } });
    return data.map((item) => ({
      id: item.id,
      title: item.name,
      year: '2025', 
      description: item.description,
      imageUrl: item.userProfilePictureUrl ?? 'https://via.placeholder.com/300x300?text=Sin+Imagen',
      price: `$${item.price.toLocaleString()} MXN`,
      size: `${item.sizeM2} m²`,
      brand: item.userFirstName, 
    }));
  } catch (error) {
    console.error('Error al obtener franquicias:', error);
    throw error;
  }
};



export const updatedWaterPlantType = async (payload: any) => {
  try {
      const res = await api.patch('/water-plant-types/updated', payload);
      return res.data;
    } catch (error) {
      console.error('Error updateando waterplantypes:', error);
      throw error;
    }
};

export const patchWaterPlantType = async (payload: any) => {
  try {
    const res = await api.patch('/water-plant-types/updated', payload);
    return res.data;
  } catch (error) {
    console.error('Error actualizando waterplanttypes:', error);
    throw error;
  }
};

export const createWaterPlantType = async (payload: any) => {
  try {
    const res = await api.post('/water-plant-types', payload);
    return res.data;
  } catch (error) {
    console.error(' Error creando waterplantype:', error);
    throw error;
  }
};

export const deleteWaterPlantType = async (id: number) => {
  try {
    await api.delete(`/water-plant-types`, { params: { id } });
  } catch (error) {
    console.error(`Error eliminando waterplantype con ID ${id}:`, error);
    throw error;
  }
};