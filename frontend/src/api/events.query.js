import { useQuery } from "@tanstack/react-query";
import { getEvent, getEvents, getFilteredEvents, getEventsByName } from "../service/events.service";

export const useEventQuery = (event_id) => {
    return useQuery({
        queryKey: ["event", event_id],
        queryFn: () => getEvent(event_id),
    });
};

export const useEventsQuery = () => {
    return useQuery({
        queryKey: ["event"],
        queryFn: () => getEvents(),
    });
};

export const useFilteredEventsQuery = (category, maxPrice, eventDate) => {
    return useQuery({
        queryKey: ["event", category, maxPrice, eventDate],
        queryFn: async () => {
            try {
                const response = await getFilteredEvents(category, maxPrice, eventDate);
                return response;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    });
}

export const useEventSearchQuery = (searchString) => {
    return useQuery({
        queryKey: ["event", "search"],
        queryFn: () => getEventsByName(searchString),
    });
};

