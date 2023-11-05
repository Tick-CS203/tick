import { useSelector } from "react-redux";
import { useBookmarks } from "../api/bookmarks.query";
import { BookmarkedEvent } from "../component/bookmarks/BookmarkedEvent";

export const Bookmark = () => {
  const { accessToken } = useSelector((state) => state.user)
  const { data: bookmarks } = useBookmarks(accessToken)
  return (
    <>
      <h1 className="text-white font-extrabold text-3xl mb-4 font-inter italic">Your Bookmarks</h1>
      <div className="flex flex-row gap-4 overflow-x-auto">
        {bookmarks && bookmarks['eventList'].map((bookmark) => <BookmarkedEvent bookmark={bookmark}/>)}
      </div>
    </>
  );
};
