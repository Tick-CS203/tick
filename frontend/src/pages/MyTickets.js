import { useTicketsQuery } from "../api/tickets.query";
import { useSelector } from "react-redux";
import { Ticket } from "../component/ticket/Ticket";

export const MyTickets = () => {
  const { accessToken } = useSelector((state) => state.user);
  const { data: ticketsData, isSuccess } = useTicketsQuery(accessToken);
  console.log(ticketsData);

  return (
    <>
      <h1 className="text-white font-extrabold text-3xl mb-4 font-inter italic">
        My Tickets
      </h1>
      <div className="flex flex-col gap-5">
        {isSuccess &&
          ticketsData.map((ticketData, index) => (
            <Ticket key={index} ticketData={ticketData} />
          ))}
      </div>
    </>
  );
};
