import api from "../api";

export interface CreateWaterPlantAquanetPlusPayload {
    userId: number;
    plantTypeId: number;
    street: string;
    exteriorNumber: number;
    interiorNumber: number;
    postalCode: number;
    neighborhoodId: number;
}

export const createWaterPlantAquanetPlus = async (waterPlant: CreateWaterPlantAquanetPlusPayload) => {
    try {
        const res = await api.post(`/waterplants/create-aquanet-plus`, waterPlant);
        return res.data;
    } 
    catch(err) {
        console.log("Couldn't get waterPlant: ", err);
        throw err;
    }
}