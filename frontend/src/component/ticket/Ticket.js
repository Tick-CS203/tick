import { useState } from "react";
import { useSpring, a } from "react-spring";
import { TicketFront } from "./TicketFront";
import { TicketMenu } from "./TicketMenu";
import { TicketBack } from "./TicketBack";
import { useEventQuery } from "../../api/events.query"

export const Ticket = ({ ticketData }) => {
  const { data: eventData } = useEventQuery(0);
  console.log(eventData);

  const [isFlipped, setIsFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <a.div
      className="flex flex-row w-full gap-x-5 perspective-600 cursor-pointer"
      onClick={handleFlip}
    >
      {!isFlipped && (
        <a.div
          className="w-full will-change-transform will-change-opacity"
          style={{
            /* opacity: opacity.to((o) => 1 - o), */
            transform,
          }}
        >
          <TicketFront ticketData={ticketData} eventData={eventData} />
        </a.div>
      )}

      {isFlipped && (
        <a.div
          className="w-full will-change-transform will-change-opacity"
          style={{
            opacity,
            transform: transform.to((t) => `${t} rotateX(180deg)`),
          }}
        >
          <TicketBack ticketData={ticketData} eventData={eventData} />
        </a.div>
      )}

      <TicketMenu />
    </a.div>
  );
};
