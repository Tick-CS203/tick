import { Auth } from "aws-amplify";
import { useState } from "react";
import OtpInput from "otp-input-react";
import './OTP.css';


export const ConfirmSignUp = () => {
  const [enteredOTP, setEnteredOTP] = useState("");
  

  async function confirmSignUp(event) {
    event.preventDefault();

    try {
      const response = await Auth.confirmSignUp(enteredOTP);
      console.log(response)
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  return (
    <div className="grid grid-cols-1 h-screen w-full">
    <form className="flex flex-col justify-center max-w-[650px] w-full mx-auto" onSubmit={confirmSignUp}>
      <h2 className="text-main-yellow font-inter italic font-extrabold text-4xl">ENTER OTP CODE</h2>
      
      
      <div className='flex items-end py-2'>
        <label className="text-white font-inter text-xs mb-20">We sent a code to number</label>
        <OtpInput
                  value={enteredOTP}
                  onChange={setEnteredOTP}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="otp-container"
                ></OtpInput>
      </div>

      <div className="flex items-start justify-between mt-16">
        <button type="submit" className="bg-main-yellow text-black font-inter font-semibold rounded-lg w-52 h-9">
        Confirm
        </button>
        <div className="flex flex-row">
          <p className="text-white font-inter mr-1">Didn't receive the code?</p>
          <button type="submit" className="text-main-yellow font-inter"> Click to resend </button>
        </div>
      </div>
    </form>
    </div>
  );
};
