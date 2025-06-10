import { User } from "@/types/User";
import api from "../api";

export const updateUserInfo = async (user: User) => {
  try {
    const res = await api.put(`/users/update/${user.id}`, user);
    return res.data;
  } catch (err) {
    console.error("Couldn't update user info: ", err);
    throw err;
  }
};
