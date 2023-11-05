import { axiosInstance } from "../api/axios";

export const getVenue = async (venue_id) => {
    return axiosInstance.get(`/venue/${venue_id}`).then((res) => res.data);
}