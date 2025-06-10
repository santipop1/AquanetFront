export interface ScoredNeighborhood {
    id: number;
    name: string;
    geojsonId: string;
    municipalityName: string;
    currentScore: number;
    futureScore: number;
    growthRate: number;
    predictedMonthlyRevenue: number;
    waterPlantTypeId: number;
    waterPlantTypeName: string;
    monthsToRecoverInvestment: number;
    estimatedRentCostPerMonth: number;
    waterPlantPrice: number;
}