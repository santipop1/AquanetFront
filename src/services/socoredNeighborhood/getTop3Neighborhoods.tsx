import back from "../back";
import { getIdToken } from "firebase/auth";
import { auth } from "@/app/libreria/firebase";

const getTop3Neighborhoods = async(waterPlantId: number) => {
    try {
        const user = auth.currentUser;
        //const token = user && (await getIdToken(user));
        const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlODk1YzQ3YTA0YzVmNmRlMzExMmFmZjE2ODFhMzUwNzdkMWNjZDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXF1YW5ldC05OTVlMCIsImF1ZCI6ImFxdWFuZXQtOTk1ZTAiLCJhdXRoX3RpbWUiOjE3NDkwODQxMTQsInVzZXJfaWQiOiJtSndRWExMcW8yVENpZ0lLNGtaSU5USmlJNUYzIiwic3ViIjoibUp3UVhMTHFvMlRDaWdJSzRrWklOVEppSTVGMyIsImlhdCI6MTc0OTA4NDExNCwiZXhwIjoxNzQ5MDg3NzE0LCJlbWFpbCI6Imt1aW5vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJrdWlub0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.cC3MQZ9y1ol-d2f6-CNZQjrONrAI2kBxKYF3Tlg_F1AXMF_Qj8RTcHwVAl2VvOS-BRS5XDl6AxgkIvGtvfy9kZA_LKF00uGq3RksGNK31tZZte2PnIWCND9z6G1R67KTNEtUTtw4-EVyMTTZRmfbjKDFbcVy5VSD6t5845zOY4ZHUIQ0e88Pf00flmCJyL6Sj_fQKakoJHQF5IRaJ_hyMg8lmmCReefXB_uiDp028C1visyVUbsX6tH3iCwoRhU6QktuzqK1ZMVW77EQaz8NVNcPgnzy-_WDSJ6hrT3k2iUO6h41YPUyi2os96ZIjbg7BOqzhjpRZXDq_qzsCMU0Uw"

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