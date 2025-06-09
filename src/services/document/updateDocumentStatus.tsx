import api from "../api";
import { UpdateDocumentDTO } from "@/types/UpdateDocumentDTO";

export const updateDocumentStatus = async (updateDocumentDTO: UpdateDocumentDTO) => {
    try {
        const res = await api.patch(`/documents/update/`, updateDocumentDTO);
        return res.data;
    }
    catch(err) {
        console.error("Couldn't update document: ", err);
        throw err;
    }
};