import { axiosInstance } from "../api/axios";

export const getEvent = async (event_id) => {
  return axiosInstance.get(`/event/${event_id}`).then((res) => res.data);
};

export const getEvents = async () => {
  const today = new Date();
  return axiosInstance
    .get(
      `/event?startDate=${today.getFullYear()}-${today
        .getMonth()
        .toString()
        .padStart(2, "0")}-${today
        .getDate()
        .toString()
        .padStart(2, "0")}T00:00:00`
    )
    .then((res) => res.data);
};

export const getFilteredEvents = async (
  category,
  maxPrice,
  eventStartDate,
  eventEndDate
) => {
  let query = `/event?`;

  if (category.length > 0) {
    query += `category=${category}&`;
  }

  if (maxPrice > 0) {
    query += `maxPrice=${maxPrice}&`;
  }

  if (eventStartDate.length > 0) {
    query += `startDate=${eventStartDate}&`;
  }

  if (eventEndDate.length > 0) {
    query += `endDate=${eventEndDate}&`;
  }

  if (query.endsWith("&")) {
    query = query.slice(0, -1);
  }

  console.log(query);
  return axiosInstance.get(query).then((res) => res.data);
};

export const getRecommendedEvents = async (artist_name) => {
  return axiosInstance
    .get(`/event/recommend/${artist_name}`)
    .then((res) => res.data);
};
