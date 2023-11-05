import { Link } from "react-router-dom";

export const Event = (props) => {

  const getDate = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link className="flex flex-col w-[250px]" to={`/event/${props.eventId}`}>
      <img
        className="object-none rounded w-[250px] h-[250px] p-0"
        src={props.imageURL}
        alt={props.eventName}
      />
      <p className="font-mono font-normal text-white text-base py-2.5">
        {props.eventName}
      </p>
      <p className="font-inter font-normal text-white text-sm p-0">
        {props.eventDates.length === 1
          ? getDate(props.eventDates[0].eventDateTime)
          : `${getDate(props.eventDates[0].eventDateTime)} - ${
              getDate(props.eventDates[props.eventDates.length - 1].eventDateTime)
            }`}
      </p>
    </Link>
  );
};
