import { useQuery } from "@tanstack/react-query";
import { getTickets} from "../service/tickets.service";

export const useTicketsQuery = (user_id) => {
    return useQuery({
        queryKey: ["tickets"],
        queryFn: () => getTickets(user_id),
    });
};