import api from "../api";

export const getWaterPlantById = async (waterPlantId: number) => {
    try {
        const res = await api.get(`/waterplants/${waterPlantId}`);
        return res.data;
    } catch(err) {
        console.log("Couldn't get waterPlant: ", err);
        throw err;
    }
}