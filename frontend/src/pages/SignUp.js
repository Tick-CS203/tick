import { Auth } from "aws-amplify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneNumberValidation from "../component/signup/PhoneNumberValidation";
import { useDispatch } from "react-redux";
import { setUsername } from "../store/userSlice";
import toast from "react-hot-toast";

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredMobileNumber, setEnteredMobileNumber] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");

  function validatePassword(password) {
    const minLength = 8;
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
  
    if (password.length < minLength) {
      return "Password is too short. It must be at least 8 characters.";
    } else if (!hasSpecialCharacter) {
      return "Password must contain at least one special character.";
    } else if (!hasUppercase) {
      return "Password must contain at least one uppercase character.";
    } else if (!hasNumber) {
      return "Password must contain at least one number.";
    } else {
      return "";
    }
  }

  function passwordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    } else {
      return "";
    }
  }

  function validateEmail(email) {
    const hasAtSign = /[@]/.test(email);

    if(!hasAtSign) {
      return "Please enter a valid email address."
    } else {
      return "";
    }
  }
  
  async function signUp(event) {
    event.preventDefault();

    try {
      const { user } = await Auth.signUp({
        username: enteredUsername,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
        attributes: {
          email: enteredEmail, // optional
          phone_number: "+" + enteredMobileNumber, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      dispatch(
        setUsername(user.username)
      );
      navigate("/confirmsignup");
    } catch (error) {
      toast.error("error signing up:", error);
    }
  }

  return (
    <div className="relative grid grid-cols-1 h-screen w-full">
      <img
        className="absolute left-[32px] top-[256px] hidden lg:block"
        src="data:image/png;base64,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"
        alt="wings"
      />

      <img
        className="absolute right-[256px] top-[128px] hidden lg:block"
        img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEcUlEQVR4nO1aW4hcRRDtYHwQFN+KKFFBEPzQKMYHqETBB+qHKFEQRPTDaNAvH9nMVM+NX0ZU0A9F/fLDD8mHguIbXcUQNVM1O+qKD4TgY5Ps3qq7mxWNhpgrNbOz3Mx2zx1I5j6GOdAsTFfd7XOrurqq+hozwggjjNAnYPvsxZb4C0u8D0i+shhdbYYVY1/vOdkiz1iSODH+DjBaaYYRNeR7u8i2B8pjZhgByE87CZNsMkXG2i3xERZ5syXZaUl2W+Jng/F4eZoekGxxEQbi+02RAcRPORb9TJqeJUG3S4fXmiLDti3btXCeU8v30gNicREOJmbPMUWGXRpp2wtv8AU+nQ0YHe/ev7wv7UXlDov8uXMvYnR37/PXSfgXU3RYkuc9wce7j4H4dreOfGRKe56SfOLT0bPWY+FXTNERUHShO9pyZOJ4mUsHiF9060RjpugIxuPlQLLXRaBK0dkuHUB+z73v5U5TBliUuptAeJtLHkh+cFq4Ea42ZQAQv+oJQk8uEY7jZT6PCHD+FFMGVDF6yG1hfrtbtjLBZ3qC3LwpCyrIV3j25O/dslWMrvIEuaYpCwKcWmGJ97uIbPxy9+lJ2RqF93gs/JYpEwDle2ekRr7hYDkOPO7/nCkTgPh1T+DacLCcvOZJOh42ZQKgPOqx3Bv95N4Wo1t0PpiMj1poDuwElCmttfU3UzRUMbzOE7h+SspZ4t96VVcLzYTugLbZFA3BtrmTLPIBT0BS1/4LiH8F5P/cZ/DUCn1Oy6pLX9rU4v8pkgcA8g4f4bTReUbqfJE8AEjeHDhhR4cFSHblQxjZ9ibG3OplofxxCIR7zmdMOLrVs3+pWg/XJMtFaEQXWeJ3S0244siT9dztBJVgfMcxsD08vxOg9AVY4pdKS1iRCCQHgLi6eGyRrFvsVCL/Y5FrSvgBjI+0yJOlJgwke2skd3UaBBb5Zdcia8T3tXQwWl9awoAybUmuTLRjP/QtEkg+VbkKhZeWlnC1OXuu/tWGOhB/1ytqA/K2BdlVweT0sf0kHmnzucAiX96+Z0o5f5ErnZKxFcU9iYVe5ySe3XM+c9RQ1uo9bxpZte4jP8dHqw4gf9bpjmhEV1JqNVfqmDafKSzJE73y6YRlm2Pfzp3Y0sFofbfFXdD+WKGuUi3JplSi7fFj0Nx1WluH71jaKeF39AZR93QwMXuCrfP1QPxB4qW8r7/pnD4H6nKzlpxZk32wH7JaXATf8FmqUyW5CZD/7fMlpY7MyAYYrexnz2rSH9D0eW2y0TVaLh4uspkStq5yzTECnLmkc+YCyZ7DSTZrws1+FtTqiDTC1QsVU1xewsRzgyBQWMLg+XRhmAlvzZtsti6NvsvtISX8+NbwuL7y5sGO+Tzy5zivoVWZyRrg+bIuE8J53EttbMyfmo9r8/5e34QNFNV6uKbVr8rUneUFkycsyo1AHGZCGOVjbQKavFHBmTOSPedBuLFathBkk6jU+TL9Uk8b8YdaMADKnxqNNUDltmdHGGEEUzT8DyA4/6nO9O/gAAAAAElFTkSuQmCC"
        alt="peace"
      />

      <img
        className="absolute right-[32px] bottom-[128px] hidden lg:block"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACFUlEQVR4nO2bTUoEMRBGS3feyH0q5/IGIiroDdWNunGZivgHoig2pjr9Zr4H2QzFzPOjU+kKaCaEEEIIIYQQQggi3ezAwPSt+/fj46NWy0Wr/vC+zl8+Mwid4t9qOYvq/fNq7qcGoVH8W/Xb76LlziA0iv9XyY9lEILijxGl+2NE6f4YUbo/RpTujxGl+2NE6f4Y0a3695OTQ4ToP5nm/zr7e7ls1R/fVrn4bfZX0CvN/gp65Oxf/WZ00P2PrWlnW9/SH15a3xe2pp1tfdlBt+RrSUzryw/aU68ll37/zgYdyX/Y1nymiYaCVtCx5luTnmhf561JQfs6b01bDbonDSBD3pp+GeimicbC+uwBZNphvjXRljyAKOiVBhAFvdHgdrZ1BLzeKKIBrzeKaMDrjSIa8HqjiAa83iiiAa83imjA640iGvB6o4gGvN4oogGvN4powOuNItqqP3ytbV7uKf5GEW1eLr8FXf2c4m+si3+/bl6eXlctV7r4T3wiutnBX/6NeGutzPBbD9LKfkRB+9BWpqBXamU/oifah7YyBb3SmcE/tScNOLZ3p/akAcf27tSeNOAYbev1/57ag75/XtCUrTeIaf6YrTeI6f6b33qDwPhjROn+GFG6P0aU7o8RpftjROn+GFG6P0aU7o8RpftnX3tmg/HPvvbMBuOffe2ZDc4/+9ozG7q/EEIIIYQQQghh+80zt6Dp54AOR7AAAAAASUVORK5CYII="
        alt="sound"
      />

      <form
        className="flex flex-col justify-center max-w-[650px] w-full mx-auto"
        onSubmit={signUp}
      >
        <h2 className="text-main-yellow font-inter italic font-extrabold text-4xl mb-20">
          CREATE AN ACCOUNT
        </h2>

        <div className="flex justify-between items-end py-2">
          <label className="text-white font-inter font-bold text-xs ">
            Username
          </label>
          <input
            className="bg-black border-b-[1px] border-main-yellow text-white w-4/5"
            type="text"
            onChange={(event) => {
              setEnteredUsername(event.target.value);
            }}
          />
        </div>

        <div className="flex justify-between items-end py-2">
          <label className="text-white font-inter font-bold text-xs ">
            Email
          </label>
          <div className="w-4/5">
            <input
              className="bg-black border-b-[1px] border-main-yellow text-white w-full"
              type="email"
              onChange={(event) => {
                setEnteredEmail(event.target.value);
                setEmailValidationMessage(validateEmail(event.target.value))
              }}
            />
            {emailValidationMessage && (
              <p className="text-red-500 text-xs font-inter mt-2 flex"> {emailValidationMessage}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end py-2">
          <label className="text-white font-inter font-bold text-xs">
            Password
          </label>

          <div className="w-4/5">
            <input
              className="bg-black border-b-[1px] border-main-yellow text-white w-full"
              type="password"
              onChange={(event) => {
                setEnteredPassword(event.target.value);
                setPasswordValidationMessage(validatePassword(event.target.value))
              }}
            />
            {passwordValidationMessage && (
            <p className="text-red-500 text-xs font-inter mt-2 flex"> {passwordValidationMessage}</p>
          )}
          </div>
        </div>
        
        <div className="flex justify-between items-end py-2">
          <label className="text-white font-inter font-bold text-xs ">
            Confirm Password
          </label>
          <div className="w-4/5">
            <input
              className="bg-black border-b-[1px] border-main-yellow text-white w-full"
              type="password"
              onChange={(event) => {
                setEnteredConfirmPassword(event.target.value);
                setConfirmPasswordMessage(passwordMatch(enteredPassword, event.target.value))
              }}
            />
            {confirmPasswordMessage && (
            <p className="text-red-500 text-xs font-inter ">{confirmPasswordMessage}</p>
          )}
          </div>
        </div>
        

        <div className="flex justify-between items-end py-2">
          <label className="text-white font-inter font-bold text-xs ">
            Mobile Number
          </label>
          <PhoneNumberValidation
            onPhoneNumberChange={(value) => {setEnteredMobileNumber(value)}}
          />
        </div>

        <div className="flex items-start justify-between mt-16">
          <button
            type="submit"
            className="bg-main-yellow text-black font-inter font-semibold rounded-lg w-52 h-9"
          >
            Next
          </button>
          <div className="flex flex-row">
            <p className="text-white font-inter mr-1">
              Already have an account?
            </p>
            <button type="button" className="text-main-yellow font-inter">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
