import api from "./api";

export const stripeCheckoutSuccess = async (session_id: string) => {
    try {
        const res = await api.get(`/stripe/checkout-success/${session_id}`);
        return res.data;
    } catch(err) {
        console.log("Couldn't verify checkout success: ", err);
        throw err;
    }
}