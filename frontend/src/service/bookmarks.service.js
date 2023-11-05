import { axiosInstance } from "../api/axios";

export const getBookmarks = async (accessToken) => {
  return axiosInstance
    .get(`/bookmarks/user`, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data);
};

export const delBookmark = async (accessToken, eventID) => {
  return axiosInstance
  .delete(`/bookmark/${eventID}`, {
    headers: {
      Authorization: accessToken
    }
  }).then((res) => res.data)
}