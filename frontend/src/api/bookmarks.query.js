import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../service/bookmarks.service";
import { useNavigate } from "react-router-dom";

export const useBookmarks = (accessToken) => {
    const navigate = useNavigate()
    return useQuery({
        queryKey: ["bookmarks"],
        queryFn: () => getBookmarks(accessToken, navigate),
    });
};