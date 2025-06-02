import { getIdToken } from "firebase/auth";
import { auth } from "@/app/libreria/firebase";
import back from "../back";

const getUserByFirebaseId = async (firebaseId: string) => {
  try {
    const user = auth.currentUser;
    const token = user && (await getIdToken(user));

    const res = await back.get(`/users/firebase_id/${firebaseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (e) {
    console.error("Couldn't fetch user: ", e);
    throw e;
  }
};

export default getUserByFirebaseId;

