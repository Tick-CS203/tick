import { useQuery } from "@tanstack/react-query";
import { getEvent, getEvents } from "../service/events.service";

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