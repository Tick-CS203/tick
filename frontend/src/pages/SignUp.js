import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredMobileNumber, setEnteredMobileNumber] =
    useState("");

  async function signUp(event) {
    event.preventDefault();
    console.log(enteredUsername);

    try {
      const { user } = await Auth.signUp({
        username: enteredUsername,
        password: enteredPassword,
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
    <form className="flex flex-col w-1/3" onSubmit={signUp}>
      <input
        name="username"
        placeholder="username"
        onChange={(event) => {
          setEnteredUsername(event.target.value);
        }}
      />
      <input
        name="email"
        placeholder="email"
        onChange={(event) => {
          setEnteredEmail(event.target.value);
        }}
      />
      <input
        name="mobile number"
        placeholder="mobile number"
        onChange={(event) => {
          setEnteredMobileNumber(event.target.value);
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        onChange={(event) => {
          setEnteredPassword(event.target.value);
        }}
      />
      <button type="submit" className="text-white">
        Submit
      </button>
    </form>
  );
};
