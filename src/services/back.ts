import axios from "axios";
import Config from "@/config";

const back = axios.create({
    baseURL: Config.BACKEND_URL,
    timeout: 180000
});

back.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response error: ', error);
        return Promise.reject(error);
    }
);

export default back;