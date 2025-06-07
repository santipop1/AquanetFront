import api from "../api";

export const listDocumentsByWaterPlantId = async (waterPlantId: number) => {
    try {
        const res = await api.get(`/documents/${waterPlantId}`);
        return res.data;
    }
    catch(err) {
        console.error("Couldn't get documents: ", err);
        throw err;
    }
};
