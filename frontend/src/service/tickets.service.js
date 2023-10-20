import { axiosInstance } from "../api/axios";

export const getTickets = async (user_id) => {
    return axiosInstance.get(`/tickets/user/${user_id}`).then((res) => res.data);
}