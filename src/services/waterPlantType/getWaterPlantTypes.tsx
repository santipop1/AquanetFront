import api from "../api";
import { WaterPlantTypeDTO } from "../waterPlantTypes";

export const getWaterPlantTypesForSelection = async () => {
    try {
        const res = await api.get<WaterPlantTypeDTO[]>('/water-plant-types/list');
        return res.data;
    }
    catch(err) {
        console.log("Couldn't fetch waterPlantTypes: ", err);
        throw(err);
    }
};