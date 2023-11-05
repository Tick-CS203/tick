import { useQuery } from "@tanstack/react-query";
import { getEvent, getEvents, getRecommendedEvents } from "../service/events.service";

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

export const useRecommendedEventsQuery = (artist_name) => {
    return useQuery({
        queryKey: ["recommended"],
        queryFn: () => getRecommendedEvents(artist_name),
        enabled: !!artist_name,
    });
};