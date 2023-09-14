import { Auth } from "aws-amplify";
import { useState } from "react";

export const ConfirmSignUp = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredCode, setEnteredCode] = useState("");

  async function confirmSignUp(event) {
    event.preventDefault();

    try {
      const response = await Auth.confirmSignUp(enteredUsername, enteredCode);
      console.log(response)
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  return (
    <form className="flex flex-col w-1/3" onSubmit={confirmSignUp}>
      <input
        name="username"
        placeholder="username"
        onChange={(event) => {
          setEnteredUsername(event.target.value);
        }}
      />
      <input
        name="code"
        placeholder="code"
        onChange={(event) => {
          setEnteredCode(event.target.value);
        }}
      />
      <button type="submit" className="text-white">
        Submit
      </button>
    </form>
  );
};
