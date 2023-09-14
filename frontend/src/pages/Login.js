import { Auth } from "aws-amplify";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  async function signIn(event) {
    event.preventDefault();

    try {
      const user = await Auth.signIn(enteredUsername, enteredPassword);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div className="grid grid-cols-1 h-screen w-full">
    <form className="flex flex-col justify-center max-w-[650px] w-full mx-auto" onSubmit={signIn}>
      <h2 className="text-main-yellow font-inter italic font-extrabold text-4xl mb-20">WELCOME BACK</h2>
      
      <div className='flex justify-between items-end py-2'>
        <label className="text-white font-inter font-bold text-xs ">Username</label>
        <input className= 'bg-black border-b-[1px] border-main-yellow w-4/5' type="text"
            onChange={(event) => {
              setEnteredUsername(event.target.value);
              }} />
      </div>
    
      <div className='flex justify-between items-end py-2'>
        <label className="text-white font-inter font-bold text-xs">Password</label>
        <input className= 'bg-black border-b-[1px] border-main-yellow w-4/5' type="password"
            onChange={(event) => {
              setEnteredPassword(event.target.value);
              }} />
      </div>
      
      <div className="flex items-start justify-between mt-16">
        <button type="submit" className="bg-main-yellow text-black font-inter font-semibold rounded-lg w-52 h-9">
          Login
        </button>
        <div className="flex flex-row">
          <p className="text-white font-inter mr-1">Don't have an account?</p>
          <button type="submit" className="text-main-yellow font-inter">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
    </form>
    </div>
    
  );
};
