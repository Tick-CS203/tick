import { Auth } from "aws-amplify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneNumberValidation from "../component/signup/PhoneNumberValidation";

export const SignUp = () => {
  const navigate = useNavigate();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredMobileNumber, setEnteredMobileNumber] = useState("");
  const handlePhoneNumberChange = (value) => {setEnteredMobileNumber(value)};

  async function signUp(event) {
    event.preventDefault();
    console.log(enteredUsername);

    try {
      const { user } = await Auth.signUp({
        username: enteredUsername,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
        attributes: {
          email: enteredEmail, // optional
          phone_number: enteredMobileNumber, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      navigate("/confirmsignup");
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  return (
    <div className="grid grid-cols-1 h-screen w-full">
    <form className="flex flex-col justify-center max-w-[650px] w-full mx-auto" onSubmit={signUp}>
      <h2 className="text-main-yellow font-inter italic font-extrabold text-4xl mb-20">CREATE AN ACCOUNT</h2>
      
      <div className='flex justify-between items-end py-2'>
        <label className="text-white font-inter font-bold text-xs ">Username</label>
        <input className= 'bg-black border-b-[1px] border-main-yellow text-white w-4/5' type="text"
            onChange={(event) => {
              setEnteredUsername(event.target.value);
              }} />
      </div>

      <div className='flex justify-between items-end py-2'>
        <label className="text-white font-inter font-bold text-xs ">Email</label>
        <input className= 'bg-black border-b-[1px] border-main-yellow text-white w-4/5' type="email"
            onChange={(event) => {
              setEnteredEmail(event.target.value);
              }} />
      </div>
    
      <div className='flex justify-between items-end py-2'>
        <label className="text-white font-inter font-bold text-xs">Password</label>
        <input className= 'bg-black border-b-[1px] border-main-yellow text-white w-4/5' type="password"
            onChange={(event) => {
              setEnteredPassword(event.target.value);
              }} />
      </div>

      <div className='flex justify-between items-end py-2'>
        <label className="text-white font-inter font-bold text-xs ">Confirm Password</label>
        <input className= 'bg-black border-b-[1px] border-main-yellow text-white w-4/5' type="password"
            onChange={(event) => {
              setEnteredConfirmPassword(event.target.value);
              }} />
      </div>

      <div className='flex justify-between items-end py-2'>
        <label className="text-white font-inter font-bold text-xs ">Mobile Number</label>
        <PhoneNumberValidation onPhoneNumberChange={handlePhoneNumberChange} />
      </div>
      
      <div className="flex items-start justify-between mt-16">
        <button type="submit" className="bg-main-yellow text-black font-inter font-semibold rounded-lg w-52 h-9">
        <Link to="/confirmsignup">Next</Link>
        </button>
        <div className="flex flex-row">
          <p className="text-white font-inter mr-1">Already have an account?</p>
          <button type="submit" className="text-main-yellow font-inter">
          <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

