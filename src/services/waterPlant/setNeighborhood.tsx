import api from "../api";

export const setNeighborhood = async (waterPlantId: number, neighborhoodId: number) => {
    try {
        const res = await api.patch(`/waterplants/set-neighborhood/${waterPlantId}/${neighborhoodId}`);
        return res.data;
    } catch(err) {
        console.log("Couldn't set neighborhood: ", err);
        throw err;
    }
}