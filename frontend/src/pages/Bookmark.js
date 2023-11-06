import { useSelector } from "react-redux";
import { useBookmarks } from "../api/bookmarks.query";
import { BookmarkedEvent } from "../component/bookmarks/BookmarkedEvent";
import { Link } from "react-router-dom";

export const Bookmark = () => {
  const { accessToken } = useSelector((state) => state.user)
  const { data: bookmarks } = useBookmarks(accessToken)
  return (
    <>
      <h1 className="text-white font-extrabold text-3xl mb-4 font-inter italic">
        My Bookmarks
      </h1>
      <div className="flex flex-wrap gap-4 overflow-x-auto">
        {bookmarks && bookmarks['eventList'].map((bookmark, key = {}) =>
          <BookmarkedEvent key={key} bookmark={bookmark} />)}
        {(bookmarks && bookmarks['eventList'].length == 0) &&
          <p className="font-inter font-semibold">
            You don't appear to have any bookmarks currently, head over to <Link className="text-main-yellow underline" to="/event">
              All Events
            </Link> page to start adding!
          </p>}
      </div>
    </>
  );
};
