import api from "../api";

export const setStatus = async (waterPlantId: number, status: string) => {
    try {
        const res = await api.patch(`/waterplants/set-status/${waterPlantId}/${status}`);
        return res.data;
    } catch(err) {
        console.log("Couldn't set status: ", err);
        throw err;
    }
}