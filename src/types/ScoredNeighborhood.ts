export interface ScoredNeighborhood {
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