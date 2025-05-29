import back from "../back";

const getSubscriptionByUserId = async(id: number) => {
    try {
        const res = await back.get(`/subscriptions/${id}`)
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fetch subscription: ", e);
        throw e;
    }
};

export default getSubscriptionByUserId;