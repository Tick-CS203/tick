import { Link, useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'

export const Navbar = (props) => {

  const navigate = useNavigate();
    
  const handleLogout = async () => {
      try {
        await Auth.signOut()
        props.updateAuthStatus(false)
        navigate('/')
      } catch (error) { 
        console.log(error) }
  }

  return (
    <nav className="bg-black">
      <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-8">
        <div className="font-lemon text-main-yellow text-xl">
          <Link to="/">TICK</Link>
        </div>
        <input
          placeholder="Search Event"
          className="bg-black placeholder-main-yellow text-main-yellow rounded p-1 border-solid border-main-yellow text-sm"
        />

        {
          props.isAuthenticated !== false && (
            <div className='flex items-center'>
              <div className=" text-main-yellow font-inter text-sm font-semibold mr-10">
              <Link to="/ticket">My Tickets</Link>
            </div>

            <button className="bg-main-yellow text-black px-3 py-1 rounded-xl font-inter text-sm font-semibold">
              <Link onClick={handleLogout}>Logout</Link>
            </button>
            </div>
          )
        }

        {
          props.isAuthenticated == false && (
            <button className="bg-main-yellow text-black px-3 py-1 rounded-xl font-inter text-sm font-semibold">
              <Link to="/login">Login/Signup</Link>
            </button>
          )
        }
      </div>
    </nav>
  );
};
