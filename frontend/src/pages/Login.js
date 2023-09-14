import { Auth } from "aws-amplify";
import { useState } from "react";

export const Login = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  async function signIn(event) {
    event.preventDefault();

    try {
      const user = await Auth.signIn(enteredUsername, enteredPassword);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="flex flex-col w-1/3" onSubmit={signIn}>
      <input
        name="username"
        placeholder="username"
        onChange={(event) => {
          setEnteredUsername(event.target.value);
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
