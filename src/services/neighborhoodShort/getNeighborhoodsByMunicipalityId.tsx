import api from "../api";

export const getNeighborhoodsByMunicipalityId = async (municipalityId: number) => {
    try {
        const res = await api.get(`/neighborhoods/municipality/${municipalityId}`);
        return res.data;
    } catch(err) {
        console.log("Couldn't get neighborhoods: ", err);
        throw err;
    }
}