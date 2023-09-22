import { axiosInstance } from "../api/axios";

export const getEvent = async () => {
    return axiosInstance.get("/event").then((res) => res.data);
}