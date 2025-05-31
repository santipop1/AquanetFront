import { auth } from "@/app/libreria/firebase";
import back from "../back";

const getUserByFirebaseId = async (firebaseId: string) => {
  try {
    const res = await back.get(`/users/${firebaseId}`);

    return res.data;
  } catch (e) {
    console.error("Couldn't fetch user: ", e);
    throw e;
  }
};

export default getUserByFirebaseId;
