import { axiosInstance } from "../api/axios";

export const getEvent = async (event_id) => {
    return axiosInstance.get(`/event/${event_id}`).then((res) => res.data);
}

export const getEvents = async () => {
    return axiosInstance.get(`/event`).then((res) => res.data);
}

export const getFilteredEvents = async (category, maxPrice, eventStartDate, eventEndDate) => {
    let query = `/event?`;

    if (category) {
        query += `category=${category}&`;
    }

    if (maxPrice) {
        query += `maxPrice=${maxPrice}&`;
    }

    if (eventStartDate) {
        query += `eventDate=${eventStartDate}&`;
    }

    if (eventEndDate) {
        query += `eventDate=${eventEndDate}&`;
    }

    if (query.endsWith('&')) {
        query = query.slice(0, -1);
    }
    return axiosInstance.get(query).then((res) => res.data);
}