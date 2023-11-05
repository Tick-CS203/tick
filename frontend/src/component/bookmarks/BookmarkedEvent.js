import { useEventQuery } from "../../api/events.query"
import { delBookmark } from "../../service/bookmarks.service"
import { Event } from "../homepage/Event"
import { useSelector } from "react-redux";

export const BookmarkedEvent = (props) => {
    const bookmark = props.bookmark
    const { accessToken } = useSelector((state) => state.user)
    const event = useEventQuery(bookmark).data

    const removeBookmark = () => {
        delBookmark(accessToken, event.eventID)
    }

    return (
        <>
            <div>
                {event && <Event
                    key={event.eventID}
                    eventId={event.eventID}
                    imageURL={event.banner}
                    eventName={event.name}
                    eventDates={event.date} />
                }
                {event && <button
                    className="bg-main-red border-2 border-black rounded-full px-2 font-inter hover:bg-black hover:border-main-red"
                    onClick={removeBookmark}>
                    Delete bookmark
                </button>
                }
            </div>
        </>
    )
}