import { useQuery } from "@tanstack/react-query";
import { getVenue } from "../service/venue.service";

export const useVenueQuery = (venue_id) => {
    return useQuery({
        queryKey: ["venue", venue_id],
        queryFn: () => getVenue(venue_id),
        enabled: !!venue_id
    });
};