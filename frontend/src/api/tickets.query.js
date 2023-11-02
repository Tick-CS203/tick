import { useQuery } from "@tanstack/react-query";
import { getTickets} from "../service/tickets.service";

export const useTicketsQuery = (accessToken) => {
    return useQuery({
        queryKey: ["tickets/user"],
        queryFn: () => getTickets(accessToken),
    });
};