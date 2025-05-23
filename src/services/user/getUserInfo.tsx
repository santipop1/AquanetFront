import back from "../back";

const getUserInfo = async(id: number) => {
    try {
        const res = await back.get(`/users/${id}`)
        return res.data;
    }
    catch(e) {
        console.error("Couldn't fetch user data: ", e);
        throw e;
    }
};

export default getUserInfo;