import api from "../api";

export const listMunicipalities = async () => {
    try {
        const res = await api.get(`/municipalities/`);
        return res.data;
    } catch(err) {
        console.log("Couldn't get neighborhoods: ", err);
        throw err;
    }
}