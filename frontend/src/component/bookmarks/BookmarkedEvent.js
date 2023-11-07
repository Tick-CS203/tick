import { useNavigate } from "react-router-dom";
import { useEventQuery } from "../../api/events.query"
import { addBookmark, delBookmark } from "../../service/bookmarks.service"
import { Event } from "../homepage/Event"
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const BookmarkedEvent = (props) => {
    const bookmark = props.bookmark
    const { accessToken } = useSelector((state) => state.user)
    const event = useEventQuery(bookmark).data

    const navigate = useNavigate();
    const toggleBookmark = (button) => {
        const target = button.target
        if (target.getAttribute("data-added") === "true") {
            delBookmark(accessToken, event.eventID, navigate)
            target.innerHTML = "Add bookmark"
            toast.error("Bookmark deleted")
            target.setAttribute("data-added", "false")
        } else {
            addBookmark(accessToken, event.eventID, navigate)
            target.innerHTML = "Delete bookmark"
            toast.success("Bookmark added")
            target.setAttribute("data-added", "true")
        }
        target.classList.toggle("bg-main-red")
        target.classList.toggle("bg-green-500")
        target.classList.toggle("hover:bg-rose-900")
        target.classList.toggle("hover:bg-green-700")
    }

    return (
        <>
            <div className="flex flex-col justify-between">
                {event && <Event
                    key={event.eventID}
                    eventId={event.eventID}
                    imageURL={event.banner}
                    eventName={event.name}
                    eventDates={event.date} />
                }
                {event && <button
                    className="w-full bg-main-red text-black border-2 border-black rounded-full px-2 py-1 mt-2 font-inter hover:bg-black hover:bg-rose-900 hover:text-white focus-visible:outline-none"
                    onClick={toggleBookmark}
                    data-added="true">
                    Delete bookmark
                </button>
                }
            </div>
        </>
    )
}