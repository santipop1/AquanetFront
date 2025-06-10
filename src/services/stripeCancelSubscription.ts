import api from "./api";

export const stripeCancelSubscription = async (firebaseUserId: string) => {
    try {
        const res = await api.post(`stripe/cancel-subscription/${firebaseUserId}`);
        return res.data;
    } catch(err) {
        console.log("Couldn't cancel suscription: ", err);
        throw err;
    }
}