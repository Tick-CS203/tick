import { useQuery } from "@tanstack/react-query";

export const useEventQuery = () => {
    return useQuery({
        queryKey: ["event", event_id],
        queryFn: () => getEvent(event_id),
    });
};