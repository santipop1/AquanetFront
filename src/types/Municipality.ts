export interface Municipality {
  id: number;
  name: string;
  currentChlorinationEfficiency: number;
  chlorinationEfficiencyGrow: number;
  averageRentPerM2: number;
  createdAt: Date;
  updatedAt: Date;
}