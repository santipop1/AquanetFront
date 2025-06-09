import { User } from "./User";

export interface WaterPlantType {
  id: number;
  name: string;
  description: string;
  company: User;
  price: number;
  sizeM2: number;
  tankCleaningFreqMonths: number;
  osmosis: boolean;
  createdAt: Date;
  updatedAt: Date;
}