import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../service/bookmarks.service";

export const useBookmarks = (accessToken) => {
    return useQuery({
        queryKey: ["bookmarks"],
        queryFn: () => getBookmarks(accessToken),
    });
};