import { useNavigate } from "react-router-dom";

export const TicketMenu = ({ eventData }) => {
  const navigate = useNavigate();
  return (
    <div className="min-w-[250px] h-[200px] flex flex-col justify-between font-inter">
      <button className="border-2 border-main-yellow bg-main-yellow text-black rounded-full py-2 px-4 w-full flex items-center justify-center hover:text-main-yellow hover:bg-black">
        My QR Code
      </button>
      <button className="border-2 border-main-yellow text-main-yellow rounded-full py-2 px-8 w-full hover:text-black hover:bg-main-yellow">
        Download
      </button>
      {eventData && (
        <a
          className="border-2 border-main-yellow text-main-yellow rounded-full py-2 px-8 w-full text-center hover:text-black hover:bg-main-yellow"
          onClick={() => navigate("/event/" + eventData.eventID)}
        >
          Event Details
        </a>
      )}
      <button className="border-2 border-main-yellow text-main-yellow rounded-full py-2 px-8 w-full hover:text-black hover:bg-main-yellow">
        Transfer Ticket
      </button>
    </div>
  );
};
