import back from "../back";
import { getIdToken } from "firebase/auth";
import { auth } from "@/app/libreria/firebase";

const getTop3Neighborhoods = async(waterPlantId: number) => {
    try {
        const user = auth.currentUser;
        const token = user && (await getIdToken(user));
        //const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlODk1YzQ3YTA0YzVmNmRlMzExMmFmZjE2ODFhMzUwNzdkMWNjZDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXF1YW5ldC05OTVlMCIsImF1ZCI6ImFxdWFuZXQtOTk1ZTAiLCJhdXRoX3RpbWUiOjE3NDkwOTkwOTksInVzZXJfaWQiOiJtSndRWExMcW8yVENpZ0lLNGtaSU5USmlJNUYzIiwic3ViIjoibUp3UVhMTHFvMlRDaWdJSzRrWklOVEppSTVGMyIsImlhdCI6MTc0OTA5OTA5OSwiZXhwIjoxNzQ5MTAyNjk5LCJlbWFpbCI6Imt1aW5vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJrdWlub0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.jE4n2o6f6cU6dNiTfNDwqAF3R2fQmAw6g1EyJLze0rL6eKKByoGH_tNf4FPon7oid7uISCX-NxVAK_uNldkFoiklmD06KJtAu_T2uHvP4IVqFtH6BQhtuzcz2oZbPOdWyU2yPxsv4jaJyzuJDWCPJZaVufW1lRYTa-oXJSIg0scfSZmqS3cKBpj7tiU-6TDzJjPFTEmQC1BEtUIvVbKwPyx0Kerud8IuJZXyhU86cotKSc9ughnp-M4rNOsgg5Zo_TkNY-1oHwCoXzdL6vkoATYzEbl04NdU3_yi8Y8BVXYwS4Hsbks7hI6xZwteLZsLR-b72MHJyTptUsY8mdMPKQ"

        const res = await back.get(`/neighborhoods/top/${waterPlantId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fetch subscription: ", e);
        throw e;
    }
};

export default getTop3Neighborhoods;