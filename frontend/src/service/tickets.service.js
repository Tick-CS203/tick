import { axiosInstance } from "../api/axios";

export const getTickets = async (accessToken) => {
  return axiosInstance
    .get(`/tickets/user`, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};
