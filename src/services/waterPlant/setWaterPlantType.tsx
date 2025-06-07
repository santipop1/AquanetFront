import api from "../api";

export const setWaterPlantType = async (waterPlantId: number, waterPlantTypeId: number) => {
    try {
        const res = await api.patch(`/waterplants/set-water-plant-type/${waterPlantId}/${waterPlantTypeId}`);
        return res.data;
    } catch(err) {
        console.log("Couldn't set waterPlantType: ", err);
        throw err;
    }
}