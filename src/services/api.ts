// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3ZDhjZWU0ZTYwYmYwMzYxNmM1ODg4NTJiMjA5MTZkNjRjMzRmYmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXF1YW5ldC05OTVlMCIsImF1ZCI6ImFxdWFuZXQtOTk1ZTAiLCJhdXRoX3RpbWUiOjE3NDc3ODIwNjUsInVzZXJfaWQiOiJtSndRWExMcW8yVENpZ0lLNGtaSU5USmlJNUYzIiwic3ViIjoibUp3UVhMTHFvMlRDaWdJSzRrWklOVEppSTVGMyIsImlhdCI6MTc0Nzc4MjA2NSwiZXhwIjoxNzQ3Nzg1NjY1LCJlbWFpbCI6Imt1aW5vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJrdWlub0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.K6YVQX1jdp-_8jFrMzabdm68P8LUwtOOJD8wpYhfvIhc1IcqIDC2nU-yfbT35w6jzr7E5JO2SlGtbgX-nL8sLmFRLEMWKGrIxpmgXgu8Gft6uyaj5M5WLLNh4FC8uScHGOJJn6Zb8UTUQ4Mdv7MEKLJcy_dE_p89_wI86RJBUJgbDlR71VZh_W_NvLefaQG8TYXHIaySa582BccArU0AXRFl7YojmJWId39GSUYNdXiI0L9eldRGFj-Z6LBjd1lETVCjIhUVOg0Rz2mw01ETUSl-AbKck_-NWCM6Ds3fjSdoPWE-lAI7z_8CQIFzO1-hjR3fyIZFcQ4bSuhn1HuJrw'
    newConfig.headers.Authorization = `Bearer ${token}`;
    newConfig.headers.accept = "application/json";
    newConfig.headers["Content-Type"] = "application/json";
    return newConfig;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default api;
