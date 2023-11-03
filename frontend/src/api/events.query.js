import { useQuery } from "@tanstack/react-query";
import { getEvent, getEvents, getFilteredEvents } from "../service/events.service";

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

export const useFilteredEventsQuery = (category, maxPrice, eventStartDate, eventEndDate) => {
    return useQuery({
        queryKey: ["event", category, maxPrice, eventStartDate, eventEndDate],
        queryFn: async () => {
            try {
                const response = await getFilteredEvents(category, maxPrice, eventStartDate, eventEndDate);
                return response;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    });
}

