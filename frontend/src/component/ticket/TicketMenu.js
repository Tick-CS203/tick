export const TicketMenu = () => {
    return (
      <div
        className="min-w-[250px] h-[200px] flex flex-col justify-between font-inter"
      >
        <button className="border-2 border-yellow-500 bg-main-yellow text-black rounded-full py-2 px-4 w-full flex items-center justify-center hover:text-main-yellow hover:bg-black">
          My QR Code
        </button>
        <button className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-8 w-full hover:text-black hover:bg-main-yellow">
          Download
        </button>
        <button className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-8 w-full hover:text-black hover:bg-main-yellow">
          Event Details
        </button>
        <button className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-8 w-full hover:text-black hover:bg-main-yellow">
          Transfer Ticket
        </button>
      </div>
    );
  };