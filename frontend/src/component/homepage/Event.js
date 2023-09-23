export const Event = (props) => {
  return (
    <div className="flex flex-col w-[250px]">
      <img
        className="rounded w-[250px] h-[250px] p-0"
        src={props.imageURL}
        alt={props.eventName}
      />
      <p className="font-mono font-normal text-white text-base py-2.5">{props.eventName}</p>
      <p className="font-inter font-normal text-white text-sm p-0">{props.eventDate}</p>
    </div>
  );
};
