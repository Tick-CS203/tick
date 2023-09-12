export const Navbar = () => {
  return (
    <nav className="bg-black">
      <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-8">
        <button className="font-lemon text-main-yellow text-xl">TICK</button>
        <input
          placeholder="Search Event"
          className="bg-black placeholder-main-yellow text-main-yellow rounded p-1 border-solid border-main-yellow text-sm"
        />
        <button className="bg-main-yellow text-black px-3 py-1 rounded-xl font-inter text-sm font-semibold">
          Login/Signup
        </button>
      </div>
    </nav>
  );
};
