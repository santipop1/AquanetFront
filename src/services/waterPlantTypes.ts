import api from './api';

export interface WaterPlantTypeCard {
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
    title: item.name,
    year: '2025', 
    description: item.description,
    imageUrl: item.userProfilePictureUrl ?? 'https://via.placeholder.com/300x300?text=Sin+Imagen',
    price: `$${item.price.toLocaleString()} MXN`,
    size: `${item.sizeM2} m²`,
    brand: item.userFirstName, 
  }));
};
