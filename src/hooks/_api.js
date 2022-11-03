import Axios from "./_axios";
// ** Declare Auth API
export const getCurrentPrice = async (coinId, vsCurrency) => {
    const response = await Axios({
        endpoint: `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}`,
        method: "GET",
    });
    if (response.status === 200) {
        return response.data;
    } else {
        throw response;
    }
};