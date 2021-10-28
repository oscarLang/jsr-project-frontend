import axios, { Axios, Method } from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://market.oscarlang.tech";

const apiRequest = async (url: string, method: Method, data?: any): Promise<any> => {
    return await axios({
        method: method,
        url: BASE_URL + url,
        withCredentials: true,
        data: data
    });
};

export default apiRequest;