export const TicketBack = ({ ticketData, eventData }) => {
  return (
    <div className="relative w-full lg:max-h-[200px] bg-white shadow-md flex lg:flex-row flex-col font-inter">
      
      {/* Admit One Section for LARGE screens */}
      <div className="hidden lg:flex justify-center items-center relative">
        <div className="flex justify-center items-center w-[20px]">
          <div className="w-[20px] h-[40px] bg-black rounded-full rounded-tl-none rounded-bl-none absolute left-0 top-1/2 transform -translate-y-1/2"></div>
        </div>
        <div className="flex justify-center items-center w-[35px]">
          <h3 className="whitespace-nowrap transform -rotate-90 text-gray-500 text-xs">
            ADMIT ONE
          </h3>
        </div>
        <div className="h-full border-l border-dashed border-gray-500" />
      </div>

     {/* Admit One Section for SMALLER screens */}
     <div className="lg:hidden flex flex-col justify-center items-center relative">
        <div className="flex justify-center items-center h-[20px]">
        <div className="w-[20px] h-[40px] bg-black rounded-full rounded-tl-none rounded-bl-none absolute top-[-10px] transform rotate-90"></div>
        </div>
        <div className="flex justify-center items-center h-[35px]">
          <h3 className="whitespace-nowrap transform text-gray-500 text-xs">
            ADMIT ONE
          </h3>
        </div>
        <div className="w-full border-t border-dashed border-gray-500" />
      </div>

      {/* Ticket Details Section*/}
      <div className="w-full flex lg:flex-row md:flex-row flex-col gap-y-5 p-6">
        {/* Seating Information Section */}
        <div className="flex flex-col justify-between pe-10">
          <div className="flex flex-col">
            <p className="text-black font-inter font-bold text-base opacity-60">
              Category
            </p>
            <p className="text-black font-inter font-bold text-3xl opacity-80">
              {ticketData.category}
            </p>
          </div>

          <div className="flex flex-row gap-x-5">
            <div className="flex flex-col">
              <p className="text-black font-inter font-bold text-base opacity-60">
                Section
              </p>
              <p className="text-black font-inter font-bold text-3xl opacity-80">
                {ticketData.key.section}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-black font-inter font-bold text-base opacity-60">
                Row
              </p>
              <p className="text-black font-inter font-bold text-3xl opacity-80">
                {ticketData.key.row}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-black font-inter font-bold text-base opacity-60">
                Seat
              </p>
              <p className="text-black font-inter font-bold text-3xl opacity-80">
                {ticketData.key.seatNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Concert Guidelines Section */}
        <div>
          {eventData && (
            <h1 className="lg:text-sm text-lg font-bold font-lemon text-black">
              {eventData.name}
            </h1>
          )}
          <ul className="list-disc list-inside pt-2">
            <li className="text-black font-inter font-semibold text-sm opacity-80">
              Do arrive early for security checks
            </li>
            <li className="text-black font-inter font-semibold text-sm opacity-80">
              No re-entry
            </li>
            <li className="text-black font-inter font-semibold text-sm opacity-80">
              No photography & videography allowed
            </li>
            <li className="text-black font-inter font-semibold text-sm opacity-80">
              No admission for children aged below 12 for Standing
            </li>
            <li className="text-black font-inter font-semibold text-sm opacity-80">
              No admission for children aged below 3 for Seated
            </li>
          </ul>
        </div>
      </div>

      {/* Admit One Section */}
      <div className="hidden lg:flex justify-center items-center relative">

        {/* Grey Dotted Line */}
        <div className="h-full border-l border-dashed border-gray-500" />

        {/* Admit One */}
        <div className="flex justify-center items-center w-[35px]">
          <h3 className="whitespace-nowrap transform rotate-90 text-gray-500 text-xs">ADMIT ONE</h3>
        </div>

        {/* Semicircle */}
        <div className="flex justify-center items-center w-[20px]">
          <div className="w-[20px] h-[40px] bg-black rounded-full rounded-tr-none rounded-br-none absolute right-0 top-1/2 transform -translate-y-1/2"></div>
        </div>
      </div>

      {/* Admit One Section for SMALLER screens */}
      <div className="flex lg:hidden flex-col justify-center items-center relative">

        {/* Grey Dotted Line */}
        <div className="w-full border-t border-dashed border-gray-500"></div>

        {/* Admit One */}
        <div className="flex justify-center items-center h-[35px]">
          <h3 className="whitespace-nowrap text-gray-500 text-xs">ADMIT ONE</h3>
        </div>

        {/* Semicircle */}
        <div className="flex justify-center items-center h-[20px]">
          <div className="w-[20px] h-[40px] bg-black rounded-full rounded-tr-none rounded-br-none absolute bottom-[-10px] transform rotate-90"></div>
        </div>
      </div>
    </div>
  );
};
