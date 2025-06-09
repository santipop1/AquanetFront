import { User } from "./User";
import { Neighborhood } from "./Neighborhood";
import { WaterPlantType } from "./WaterPlantType";

export interface WaterPlant {
  id: number;
  logoRgb: string;
  plantType: WaterPlantType;
  user: User;
  street: string;
  exteriorNumber: number;
  interiorNumber: number;
  postalCode: number;
  neighborhood: Neighborhood;
  status: string;
  pricePerJug: number;
  pricePerLiter: number;
  pricePerGallon: number;
  rentPerMonth: number;
  waterPricePerBimester: number;
  lightPricePerBimester: number;
  pelletsPrice: number;
  pelletsKg: number;
  pelletsKgPerMonth: number;
  nextTankCleaningDate: Date;
  createdAt: Date;
  updatedAt: Date;
}