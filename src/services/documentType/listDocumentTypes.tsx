import api from "../api";

export const listDocumentTypes = async () => {
    try {
        const res = await api.get(`/document-types`);
        return res.data;
    }
    catch(err) {
        console.error("Couldn't list document types: ", err);
        throw err;
    }
};
