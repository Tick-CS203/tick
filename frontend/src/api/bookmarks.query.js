import { useQuery } from "@tanstack/react-query";
import { getBookmarks, delBookmark } from "../service/bookmarks.service";

export const useBookmarks = (accessToken) => {
    return useQuery({
        queryKey: ["bookmarks"],
        queryFn: () => getBookmarks(accessToken),
    });
};

export const useRemoveBookmark = (accessToken, eventID) => {
    return useQuery({
        queryKey: ["bookmarks", "delete"],
        queryFn: () => delBookmark(accessToken, eventID),
    });
};