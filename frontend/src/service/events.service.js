import { axiosInstance } from "../api/axios";

export const getEvent = async (event_id) => {
    return axiosInstance.get(`/event/${event_id}`).then((res) => res.data);
}

export const getEvents = async () => {
    return axiosInstance.get(`/event`).then((res) => res.data);
}

export const getFilteredEvents = async (category, maxPrice, eventStartDate, eventEndDate) => {
    let query = `/event?`;

    if (category.length > 0) {
        query += `category=${category}&`;
    }

    if (maxPrice.length > 0) {
        query += `maxPrice=${maxPrice}&`;
    }

    if (eventStartDate.length > 0) {
        query += `beforeDate=${eventStartDate}&`;
    }

    if (eventEndDate.length > 0) {
        query += `afterDate=${eventEndDate}&`;
    }

    if (query.endsWith('&')) {
        query = query.slice(0, -1);
    }

    console.log(query)
    return axiosInstance.get(query).then((res) => res.data);
}

export const getEventsByName = async (searchString) => {
    return axiosInstance.get(`/event/search/${searchString}`).then((res) => res.data);
}