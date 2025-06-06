import { getIdToken } from "firebase/auth";
import { auth } from "@/app/libreria/firebase";
import back from "../back";

type CreateDocumentPayload = {
  documentTypeId: number;
  documentUrl: string;
  waterPlantId: number;
  status: string;
  comments?: string;
};

const createDocument = async (payload: CreateDocumentPayload) => {
  try {
    console.log('Payload a enviar a /documents:', payload);
    const user = auth.currentUser;
    const token = user && (await getIdToken(user));

    const res = await back.post("/documents", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data; 
  } catch (e) {
    console.error("❌ Error al crear el documento: ", e);
    throw e;
  }
};

export default createDocument;
