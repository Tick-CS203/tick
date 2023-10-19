import React, { useState } from 'react';
import { useSpring, a } from 'react-spring';
import { TicketDetails } from '../../pages/Ticket';
import './TicketFlip.css';

const TicketFlip = ({ ticket }) => {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleFlip = () => {
    set(!flipped);
  };

  // return (
  //   <div className="ticket-flip-container" onClick={() => set(state => !state)}>
  //     <a.div
  //       className="ticket-c front"
  //       style={{ opacity, transform, rotateX: '180deg' }}
  //     >
  //       <TicketDetails {...ticket} />
  //     </a.div>
  //   </div>
  // );

  return (
    <a.div className="ticket-flip-container" onClick={handleFlip}>
      <a.div
        className={`ticket-c ${flipped ? 'front' : 'back'}`}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
        }}
      >
        <TicketDetails {...ticket} />
      </a.div>

      <a.div
        className={`ticket-c ${flipped ? 'back' : 'front'}`}
        style={{
          opacity,
          transform: transform.to(t => `${t} rotateX(180deg)`),
        }}
      >
        <TicketDetails {...ticket} />
      </a.div>
    </a.div>
  );
};

export default TicketFlip;