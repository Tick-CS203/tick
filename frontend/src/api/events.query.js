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

export const useFilteredEventsQuery = (category, maxPrice, eventDateTime) => {
    return useQuery({
        queryKey: ["event", category, maxPrice, eventDateTime],
        queryFn: () => getFilteredEvents(category, maxPrice, eventDateTime),
    });
}

