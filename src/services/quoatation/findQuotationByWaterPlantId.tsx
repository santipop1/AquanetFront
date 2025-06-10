import api from "../api";

export const findQuotationByWaterPlantId = async (waterPlantId: number) => {
    try {
        const res = await api.get(`/quotations/${waterPlantId}`);
        return res.data;
    } catch(err) {
        console.log("Couldn't get quotation: ", err);
        throw err;
    }
}