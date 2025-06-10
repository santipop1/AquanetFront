import axios from "axios";
import { getAuth } from "firebase/auth";

export const api = axios.create({
  baseURL: "https://aquanetbackend-985736944539.us-central1.run.app",
  timeout: 15000,
});

api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken(); 
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.accept = "application/json";
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

export default api;
