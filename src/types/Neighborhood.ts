import { Municipality } from "./Municipality";

export interface Neighborhood {
  id: number;
  name: string;
  geojsonId: string;
  municipality: Municipality;
  areaHectares: number;
  currentPopulationDensity: number;
  populationDensityGrow: number;
  leakReports: number;
  shortageReports: number;
  badQualityReports: number;
  createdAt: Date;
  updatedAt: Date;
}
