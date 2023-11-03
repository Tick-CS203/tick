import { Auth } from "aws-amplify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Recaptcha } from "../component/signup/Recaptcha";
import OtpInput from "otp-input-react";
import "./OTP.css";
import { setTokens, setUsername, setUserID } from "../store/userSlice";
import { axiosInstance } from "../api/axios.js";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [didRecaptcha, setDidRecaptcha] = useState(null);
  const [recaptchaErrorMessage, setRecaptchaErrorMessage] = useState("");
  const [isConfirmSignIn, setIsConfirmSignIn] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState("");
  const [user, setUser] = useState(null);

  async function fetchUserId(accessToken) {
    try {
      const response = await axiosInstance.post(
        "/token/access",
        JSON.stringify({ token: accessToken })
      );
      return response.data.id;
    } catch (e) {
      console.log(e);
    }
  }

  async function signIn(event) {
    event.preventDefault();

    try {
      if (!didRecaptcha) {
        setDidRecaptcha(false);
        return;
      }
      if (recaptchaErrorMessage) {
        return;
      }

      const signInUser = await Auth.signIn(enteredUsername, enteredPassword);

      if (signInUser.challengeName === "SMS_MFA") {
        setUser(signInUser); // Use local setUser instead of Redux
        setIsConfirmSignIn(true);
      } else {
        // sign in flow without MFA enabled
        dispatch(
          setTokens({
            accessToken: signInUser.signInUserSession.accessToken.jwtToken,
            refreshToken: signInUser.signInUserSession.refreshToken.token,
            idToken: signInUser.signInUserSession.idToken.jwtToken,
          })
        );

        let userId = fetchUserId(signInUser.signInUserSession.accessToken.jwtToken);
        dispatch(setUserID(userId));
        dispatch(setUsername(enteredUsername));
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmSignIn(event) {
    event.preventDefault();

    try {
      const loggedInUser = await Auth.confirmSignIn(
        user, // Use local user state
        enteredOTP,
        "SMS_MFA"
      );

      dispatch(
        setTokens({
          accessToken: loggedInUser.signInUserSession.accessToken.jwtToken,
          refreshToken: loggedInUser.signInUserSession.refreshToken.token,
          idToken: loggedInUser.signInUserSession.idToken.jwtToken,
        })
      );

      let userId = fetchUserId(loggedInUser.signInUserSession.accessToken.jwtToken);
      dispatch(setUserID(userId));
      dispatch(setUsername(enteredUsername));

      navigate(-1);
    } catch (error) {
      console.log("error confirming sign in", error);
    }
  }
}