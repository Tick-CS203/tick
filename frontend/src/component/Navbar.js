import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../store/userSlice";

export const Navbar = () => {
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      dispatch(resetUserState());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-black">
      <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-8">
        <div className="flex flex-row items-center gap-x-10">
          <div className="font-lemon text-main-yellow text-xl">
            <Link to="/">TICK</Link>
          </div>
          <div className="lg:flex hidden text-main-yellow font-inter text-sm font-semibold mr-10">
            <Link to="/event">All Events</Link>
          </div>
        </div>

        {accessToken && (
          <div className="flex items-center gap-x-10">
            <div className=" text-main-yellow font-inter text-sm font-semibold">
              <Link to="/ticket">My Tickets</Link>
            </div>

            <button className="bg-main-yellow text-black px-3 py-1 rounded-xl font-inter text-sm font-semibold">
              <Link onClick={handleLogout}>Logout</Link>
            </button>
          </div>
        )}

        {!accessToken && (
          <button className="bg-main-yellow text-black px-3 py-1 rounded-xl font-inter text-sm font-semibold">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
};
