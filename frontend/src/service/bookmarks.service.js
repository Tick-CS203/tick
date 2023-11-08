import { axiosInstance } from "../api/axios";

export const getBookmarks = async (accessToken, func) => {
  try {
    const response = await axiosInstance
      .get(`/bookmarks/user`, {
        headers: {
          Authorization: accessToken
        }
      })
      if (response.status !== 200) {
        func("/login")
      }
      return response.data
  } catch (e) {
    func("/login")
  }
};

export const delBookmark = async (accessToken, eventID, func) => {
  try {
    const response = await axiosInstance
      .delete(`/bookmarks/${eventID}`, {
        headers: {
          Authorization: accessToken
        }
      })
      if (response.status !== 200) {
        func("/login")
      }
      return response.data
  } catch (e) {
    func("/login")
  }
}

export const addBookmark = async (accessToken, eventID, func) => {
  try {
    const response = await axiosInstance
      .post(`/bookmarks/${eventID}`, null, {
        headers: {
          Authorization: accessToken
        }
      })
      if (response.status !== 201) {
        func("/login")
      }
      return response.data
  } catch (e) {
    func("/login")
  }
}