import { Auth } from "aws-amplify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Recaptcha } from "../component/signup/Recaptcha";
import OtpInput from "otp-input-react";
import "./OTP.css";
import { setTokens, setUsername, setUserID } from "../store/userSlice";
import { axiosInstance } from "../api/axios.js";
import toast from "react-hot-toast";

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
      toast.error("Error fetching userID", e);
    }
  }

  async function signIn(event) {
    event.preventDefault();
  
    if (!didRecaptcha) {
      setDidRecaptcha(false);
      toast.error("Please complete the Recaptcha to proceed.");
      return;
    }
    if (recaptchaErrorMessage) {
      toast.error(recaptchaErrorMessage);
      return;
    }
  
    try {
      const signInUser = await Auth.signIn(enteredUsername, enteredPassword);

      if (signInUser.challengeName === "SMS_MFA") {
        setUser(signInUser);
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
  
        const userId = await fetchUserId(
          signInUser.signInUserSession.accessToken.jwtToken
        );
        dispatch(setUserID(userId));
        dispatch(setUsername(enteredUsername));
        navigate(-1);
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
  
      if (error.code === 'UserNotFoundException') {
        errorMessage = "User does not exist";
      } else if (error.code === 'NotAuthorizedException') {
        errorMessage = "Incorrect username or password";
      } else if (error.code === 'UserNotConfirmedException') {
        errorMessage = "User is not confirmed";
      } 
      toast.error(errorMessage);
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

      let userId = await fetchUserId(
        loggedInUser.signInUserSession.accessToken.jwtToken
      );
      dispatch(setUserID(userId));
      dispatch(setUsername(enteredUsername));

      navigate(-1);
    } catch (error) {
        let errorMessage = "Error confirming sign in. Please try again.";
    
        if (error.code === 'CodeMismatchException') {
          errorMessage = "Wrong code entered, please try again.";
        } else if (error.code === 'ExpiredCodeException') {
          errorMessage = "The code has expired, please request a new one.";
        } else if (error.code === 'TooManyRequestsException') {
          errorMessage = "Too many attempts, please try again later.";
        } 
        toast.error(errorMessage);
      }
  }

  const handleResend = async () => {
    if (user && user.challengeName === "SMS_MFA") {
      try {
        const userRes = await Auth.signIn(enteredUsername, enteredPassword);
        toast.success("New OTP code sent");
        setUser(userRes);
      } catch (error) {
        toast.error("Error resending MFA code:", error);
      }
    }
  };

  if (isConfirmSignIn) {
    return (
      <div className="relative grid grid-cols-1 h-screen w-full">
        <img
          className="absolute left-[128px]top-[128px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEaUlEQVR4nO2cQahVVRSGT2iZA4kaFBHVICc5CSQaNAgiSgqKJs7CwkGNBBtYr3fXfiekic5qFBg1y
Yk0UhIaXQeiePe6WimCr0ipePbuWvelkCRmHjk2KEJNO3e9tdbd64M9fez/rHf+y/3vv3dVOScN6eWEvJCQm0ktyHS6h/yCtjZ31P3Td6fMo0kO4+9FP2jrc8cc8usyw/jrLdHW5w5AHkgNJCF9oK3PFTWO1osNI/PFWRw9qK3RFSnTZ4J29am2PlfMfHvuX
kC+IDaQo4tPaGt0BSBtE/zs+Epbny+a5o6UeV5uIOMN2hJdAXn0kuDbcaIduLZGVyTkL8U+Owa8WVufK3rDpUcT0mWRYWRebL/5a2t0Rcq8U+ztQE7a+lyxZX5+lVRuBci/v3f4lwe0NboCkN+Q+zDnj7X1uQOkcqtMV2DIj2vrc0Utm1vt09bnjiSYWyWkZ
7X1uWJGMLeCTN/EF0FDuRUM6TWZf6NppRHMrTL9XJ9o7tKW6AqQzK0yvaOtzx1JKrfK/Ft96Nx92vpc0ZPMrZA+1NbnjiSWW9HlHi4+pq3PFVtEcyv6QlufO0Awt+oNxk9r63MHCOVW7d/V1uaOWjC3msPxRm197khCuVVbDa37zUptfa6Yke1bbdXW5w4Qy
q0A6fy7uHSPtj5fiOZWvFNbnjukcitA+qPGpUe09blDsG+1W1ubOyRzq9nMT2nrc4dUbgXIB7S1uUM0txrQK9r63CF5TjB1W9+nIT1XlUZCOmLg4Tc3GkpVErNDetLAQ29uaHmZv6tKoj3Lp/3Q001WL9NbVSlInxNM3Ve/qM6W7DlB7mZVyBfq4eLaqhjEz
wly11VWMix7TpC7rUyHN+5pVlQlIXlOMHUaBl+sj/K6qiQkc6vUedFMVRqS5wRThwXIx97E5s6qNFKmMwbfjEvFXqfRXgxmcCDbq1Jpr85rGyB2rIqOx7GEDtT9ZuWk4nrI9Gc0GTuScLxhcm8H7+i6n+IBpE8mNIxTbx/6cXXxD9SCXUFrVcPRMzEMM3ZFH
8UwrNhVpjPbDtKaGIgFu8p0JW6sNmVXtGtS+yke6G5XC+2vlMU/SCt2BUivxjCM2BVk/jyGYcSuAInqr8/eHwMxYldzca7Qjl1B5r0T3k4A/9OuINOvs8f4oXiCRuwKMm+KYRixK0DaH8MwYleAdL43GD8cAzFiV72SCtIO7KpfVEHasl1BcQVp+3a1VXvfU
0u6XbsqsSBt1q5ygQVp23ZF5RWkrdoVlFqQtmhXcO1SmdF67f1ONfXt2FWm97X3O/WkW7WrTCfbKzm09zv1wC3YVRSkjdkVREHajl1BFKTt2BVEQdqaXVEUpM3YVY6CtB27ylGQXna7astsN7GqXcu7o8L5D7taiIK0IbuCKEjbsSuIgrQdu4IoSNuyq7koS
C8/7Q9LCYmvY1V7FbYTXM+uIArStuwKoiCtORA++68P8v2K2wkA6ad/DCMK0tqkwfjFNjS8dndW5ue191MZ4SripL01kL62MgAAAABJRU5ErkJggg=="
          alt="lightning"
        />

        <img
          className="absolute left-[64px] bottom-[128px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFQklEQVR4nO1azY8UVRCvV61i+FgFQQ9eUE+o8eOqV3X9CH5dVLxC1gtoOOkB9OaKepHo/+HHQryAR
FBUQE2MsAtKwJ2p6t0BxmXnvZ5I8kz1vDfb7GzP9Ez3fIRQSSedfvU+6r2qelW/aoCbdIOSrcBYRMFWw+ojTepLzXjaMIaaUcvj3k9Lm/AIr52HdTAKZGdglSZ8XZM6qAn/M4y2m0f6aFYHNOFr9g+4bfACnIfbI8a3DeFsc1GMkWZ1SDPuqXHwclSGLdULs
N5auFUeeZdv0qYZ92pWh6VPQrB/IsJdMvZAhDBhMK4JzyYW8Ith3G4vwx3djnXlCtxpGHcYxhOJU5oxYfBMX09Bs/o8IcDJIic0YfCsIfx16YTVflFdKJKuMtzjdl5UqGYId1oLQeGbZSEQlXXOQQT66SrB3YUMbgg2e1USr1MneBj6THWGRzThdFPVCDbnG
nChDJv8gIbx54USbIQBUfUCrDeER50w50QrerYJr06G8AdLsKbw1XZaA8Eaw3jcq1lPNqNJfeHVqXoRNsCQ6N9ZuKupZqz2d9U5KgfPecMehE1kshl2DiAMxrO7WcJzTqV2wohQjfEdZy9nM12amnG3vyf64WJ7JWvhFk34m6xNhGrPPAOrlsKO4GkYMYrKw
fNOU8ptT0UzvunDDhhBshZUHFE07HdbKqMm9a0TZDuMKBnGiYatqIOpF5AmvCYRaZYAUMJuySvkmA1hybCa7CYU77V/VdbJWJcUQILOFgYJr52vPpRlITJxa46hJrMKkqe/YfxO+CMOXmxtJPWJ0709mQaLd3HZQghLmQXJ0d+Q+qDBrz5uaZRMLVXK7AuZz
SnIbJa+NQ5ecdrzdasgEmWKIGXYkkM1PswsSI7+dYKH3OU4vcLAWJFGiW26MNbJeGd7N/ae+i+UYKMTfr6lUTyBNA4FBOiSrFzcDie4cQUxjJekcZghezcJn1OtudzGPkyqe2NnPNPSqFlNOff7Eow41cLgVed+v2p3Ie5NG8AQHotTzgqM9WuRtgJjcYpNe
LTjhchqX7sQ5XD6AHjKB2z9cAo2hmCbgevJ1HUwHom1h4KtbYPGFYOxGESDB8R3+2O1JVhdmBAlWK1ZfeON2DDcvxKfOCMfNKZqRmI3dqRNuDgHj3sPJ2pWq8C9eYWQMQRuMo0xK/UQHk3jNYxvuY08kCWxOtFu4qgMD2rG8473kmZ8o1ch3JyXnX3+3c5rx
omVV+92c8ZYlg/mOqAVApiJrSQCvmOGg6eyCiCptCH8MYH1TnWCRyMKXvDIfUeMqwk+EJ7qBD641HPC241HBWMPGAbjcnJSzJFH3htAtfpUE/6VCBbnYjTfgsoAPvzeMHLc1RUcJIByxw7SZx7WacL3DCFnLvQQkiZ814awNssc2m2wRLyZEccEQKcFHMvUq
bFrqEN4Uvy7IfxeBGsUgDCKhZRvUpoL4QnhzTruYgiPaUbjVL67UoavhcgOZA3t+0ELDSDdVQPUZ/lAbMbjQwGxQ1grLj4XiN3cDcYzzbJCGTbBgKh6ETa4kChfWcGTIbivebSE0+0uq6JoUWxiac78hZ6U0psW7FXcIRRMVlws4+6mYRdZeksrhgqgLN6tk
LEtKLnstLsnvGEXXgxNklxqy8rTgsVOSNDZkx1I7OTCDjOI8vTy04nrFdf/MCA5/xHN+L7gTpLFiduWcF8eeZeikSRFwuN4Y5zguh8GZvp4Cm3zB8Zt7heOaz3+wjElAeBQBFiJBPh2P9XsEwTQ/VRTiXOHxs7L+5+SxwhP/FNNHzPNmwRDpv8BGu4aCal2+
AAAAAAASUVORK5CYII="
          alt="happy"
        />

        <img
          className="absolute right-[192px] bottom-[256px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACFUlEQVR4nO2bTUoEMRBGS3feyH0q5/IGIiroDdWNunGZivgHoig2pjr9Zr4H2QzFzPOjU+kKaCaEE
EIIIYQQQggi3ezAwPSt+/fj46NWy0Wr/vC+zl8+Mwid4t9qOYvq/fNq7qcGoVH8W/Xb76LlziA0iv9XyY9lEILijxGl+2NE6f4YUbo/RpTujxGl+2NE6f4Y0a3695OTQ4ToP5nm/zr7e7ls1R/fVrn4bfZX0CvN/gp65Oxf/WZ00P2PrWlnW9/SH15a3xe2p
p1tfdlBt+RrSUzryw/aU68ll37/zgYdyX/Y1nymiYaCVtCx5luTnmhf561JQfs6b01bDbonDSBD3pp+GeimicbC+uwBZNphvjXRljyAKOiVBhAFvdHgdrZ1BLzeKKIBrzeKaMDrjSIa8HqjiAa83iiiAa83imjA640iGvB6o4gGvN4oogGvN4powOuNItqqP
3ytbV7uKf5GEW1eLr8FXf2c4m+si3+/bl6eXlctV7r4T3wiutnBX/6NeGutzPBbD9LKfkRB+9BWpqBXamU/oifah7YyBb3SmcE/tScNOLZ3p/akAcf27tSeNOAYbev1/57ag75/XtCUrTeIaf6YrTeI6f6b33qDwPhjROn+GFG6P0aU7o8RpftjROn+GFG6P
0aU7o8RpftnX3tmg/HPvvbMBuOffe2ZDc4/+9ozG7q/EEIIIYQQQghh+80zt6Dp54AOR7AAAAAASUVORK5CYII="
          alt="sound"
        />

        <form
          className="flex flex-col justify-center max-w-[650px] w-full mx-auto"
          onSubmit={confirmSignIn}
        >
          <h2 className="text-main-yellow font-inter italic font-extrabold text-4xl">
            ENTER OTP CODE
          </h2>

          <div className="flex items-end py-2">
            <label className="text-white font-inter text-xs mb-20">
              We sent a code to your mobile
            </label>
            <OtpInput
              value={enteredOTP}
              onChange={(value) => setEnteredOTP(value)}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="otp-container"
            ></OtpInput>
          </div>
          <div className="flex items-start justify-between mt-16">
            <button
              type="submit"
              className="bg-main-yellow text-black font-inter font-semibold rounded-lg w-52 h-9"
            >
              Confirm
            </button>
            <div className="flex flex-row">
              <p className="text-white font-inter mr-1">
                Didn't receive the code?
              </p>
              <button
                type="button"
                className="text-main-yellow font-inter"
                onClick={handleResend}
              >
                {" "}
                Click to resend{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="relative grid grid-cols-1 h-screen w-full">
        <img
          className="absolute right-[32px] bottom-[128px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADkUlEQVR4nO2cv0uVYRTHn8h+DRE2FBHVUEstQURDQxBRUlC43C0sWlxdCpcgokW3nIIiF9uajIQm2
yKXiCKwJIXCKAMRkiTTTzzgEJF15b3nnnPueT5/wfm+3/d+4f3e8zwpOQc4D0zTWCaBM9ra3AFsBr4gw3ttfe4ALiHHpLY+dwBjgobc0tbnCuCIoBkLwC5tja4ABgUNua+tzxVAOzAvaMhhbY2uAK4KmvFEW58rgHXAW0FDOrQ1ugI4J2jG62y4tkZXAI8FD
bmirc8VwD7gp5AZn/OXv7ZGVwD9yHFdW58rgE2CvdV3YKe2RlcAl5HjjrY+dyDXWy0DB7X1uQLZ3uqRtj53INtbndTW5wpke6uX5UPQVm91UeY1alGQ7a0+Ahu1NboC2d7qmrY+dyDXW30DtmvrcwWyvdVtbX3uQK63yibv19bnCmR7q4fa+tyBbG91XFufO
5Drrca0tbkD2d6qpq3PHcj1VnmBuk1bnyuQ7a16tPW5A7neag7Ypq3PFcK9Vb+2PncI9laLwF5tfe4Q7K0eaGtzh3BvdUxbnzsEe6un2trcIdxbXdDW5w7hc4JVmABOpWgAz7HLRIoEcBTbvEuRyGf5sE13ikITzglWZTTUzpbwvlVV8otyIEWhCecEqxKrG
Rbet6rKM2B9ioTwOcGqNzgcSpEQ7q2q0puiIXxOsAovgA0pGsAU9vgR9jqNfDEY9riZopKvzlvZALHCq3IsoZqhbQ2s65fKJmP1X1gHjaOv6jzhAe41yIxxYEv4B2okrpaAE8UMO3E1UMywE1dTwNZiiI24Wi43VtuKq7uNmic8VI+rfD98e/gHaSiuOosZd
uJqqJhhJ65mgB3FEDtxVStm2Imr4WKGnbiaBXYXQ+zEVVcxw05cjRQz7MTVHLCnGGInrrqLGXbiajTUgrTxuJoPtSDtIK56tOduWVh7XMVbkDYcVwvhFqSNx1Wv9swtDWuLq5gL0kbjajHfPqc9b0vD2uLqhva8LQ/1x9WbfCWH9rwtD/XFVVmQNhZXfU0ZK
Dp1xtV4WZC2E1dLZUHaVlwNNGue8NQRV1NlQdpOXC2XBenmx1VeZluNsiBtKK6my4K0rbjqbPY8oflPXA1pzxeOf8TVTFmQthVXNY15QpP/WAK+/sWMYe3ZQrJKXM2WBWlbcdWlNU94gE9/mDES/qFoAnz4zYyyIK0NcHalNMx3Z53WnicZ4Rfo+Cpo30SEs
gAAAABJRU5ErkJggg=="
          alt="lightning"
        />

        <img
          className="absolute left-[64px] bottom-[256px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEcUlEQVR4nO1aW4hcRRDtYHwQFN+KKFFBEPzQKMYHqETBB+qHKFEQRPTDaNAvH9nMVM+NX0ZU0A9F/
fLDD8mHguIbXcUQNVM1O+qKD4TgY5Ps3qq7mxWNhpgrNbOz3Mx2zx1I5j6GOdAsTFfd7XOrurqq+hozwggjjNAnYPvsxZb4C0u8D0i+shhdbYYVY1/vOdkiz1iSODH+DjBaaYYRNeR7u8i2B8pjZhgByE87CZNsMkXG2i3xERZ5syXZaUl2W+Jng/F4eZoek
GxxEQbi+02RAcRPORb9TJqeJUG3S4fXmiLDti3btXCeU8v30gNicREOJmbPMUWGXRpp2wtv8AU+nQ0YHe/ev7wv7UXlDov8uXMvYnR37/PXSfgXU3RYkuc9wce7j4H4dreOfGRKe56SfOLT0bPWY+FXTNERUHShO9pyZOJ4mUsHiF9060RjpugIxuPlQLLXR
aBK0dkuHUB+z73v5U5TBliUuptAeJtLHkh+cFq4Ea42ZQAQv+oJQk8uEY7jZT6PCHD+FFMGVDF6yG1hfrtbtjLBZ3qC3LwpCyrIV3j25O/dslWMrvIEuaYpCwKcWmGJ97uIbPxy9+lJ2RqF93gs/JYpEwDle2ekRr7hYDkOPO7/nCkTgPh1T+DacLCcvOZJO
h42ZQKgPOqx3Bv95N4Wo1t0PpiMj1poDuwElCmttfU3UzRUMbzOE7h+SspZ4t96VVcLzYTugLbZFA3BtrmTLPIBT0BS1/4LiH8F5P/cZ/DUCn1Oy6pLX9rU4v8pkgcA8g4f4bTReUbqfJE8AEjeHDhhR4cFSHblQxjZ9ibG3OplofxxCIR7zmdMOLrVs3+pW
g/XJMtFaEQXWeJ3S0244siT9dztBJVgfMcxsD08vxOg9AVY4pdKS1iRCCQHgLi6eGyRrFvsVCL/Y5FrSvgBjI+0yJOlJgwke2skd3UaBBb5Zdcia8T3tXQwWl9awoAybUmuTLRjP/QtEkg+VbkKhZeWlnC1OXuu/tWGOhB/1ytqA/K2BdlVweT0sf0kHmnzu
cAiX96+Z0o5f5ErnZKxFcU9iYVe5ySe3XM+c9RQ1uo9bxpZte4jP8dHqw4gf9bpjmhEV1JqNVfqmDafKSzJE73y6YRlm2Pfzp3Y0sFofbfFXdD+WKGuUi3JplSi7fFj0Nx1WluH71jaKeF39AZR93QwMXuCrfP1QPxB4qW8r7/pnD4H6nKzlpxZk32wH7JaX
ATf8FmqUyW5CZD/7fMlpY7MyAYYrexnz2rSH9D0eW2y0TVaLh4uspkStq5yzTECnLmkc+YCyZ7DSTZrws1+FtTqiDTC1QsVU1xewsRzgyBQWMLg+XRhmAlvzZtsti6NvsvtISX8+NbwuL7y5sGO+Tzy5zivoVWZyRrg+bIuE8J53EttbMyfmo9r8/5e34QNF
NV6uKbVr8rUneUFkycsyo1AHGZCGOVjbQKavFHBmTOSPedBuLFathBkk6jU+TL9Uk8b8YdaMADKnxqNNUDltmdHGGEEUzT8DyA4/6nO9O/gAAAAAElFTkSuQmCC"
          alt="peace"
        />
        <img
          className="absolute right-[384px] top-[128px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADgUlEQVR4nO2ZXYhNURTHd41vSUmePHhAHubJhEE6Oeu/9r0yRLnyne/PCIkRIUqp8UaRKPHgI2lep
Dx48SAvSgaF8OCj8VEyD8osS/vMjLlzzZ17zr1z7zlX86/9cjqds3577bX22msbM6ABlSxlHqlEkxWYr2lvvKkGaSYzRJlrFViozAuE0aLAUgHOKdCozLNNNUiZa4Xpllp/rjLtEeCkMC4L44kwfgnjs6b8qSbpUmC+MB79Zmi+IUzvTZKlwDZh/A6MBX0X0
AMBzqqlzQpsFMaPTpAbJqlSYKuDcEOZDms6PTR43tAwQtmfJ6DWTohmF0cmiVL2t2RBbA+eAesE9DxnSSUYwtLmXAhhOvbXeNDPIHMx7dVMpsYkUQps6obgHdkQLkMp+8tM0qWW1gtIAgiinT0gQO0KLDdVBcG0qzohOoJYnNEKHHDPBiDikDKvzfJEY3V6g
v8LCH+ZMzaAYDqYGAglminAKQGuCdMFN9uujMjz7posT+zrZZ9YUnkAa8e4EqHXahT0QZn9Hu8Dq7s94e9PBoTnDRPQwz5La1CbWjsleJ951V+I3BQbF0Ru7VPgnNCcA9GYGAjt8Ma3UCCg9ryBHSeEk9q5s8JAZA93nkhMduqSWx6RIIBDifCELpw1Sq2dq
NbWKfsb3JGzaE9UGkKBSQI6I4xXUZdRlieOxAahnjdImJrcT4sFcKMdOBofRF3dYAHulALQmXKvxwbh5MqLUiG6DHftme4UjNumUlJLKyMbDNwU4HhIuC8CvHB9KGF8UmB3/0Ok00MF9CbirLe4eIqyy/ecBGrrfxBgRZGxcKzrG1FhhPGx30EEdKWEwC4KR
oDz5QB5GSEmbvYNg/shvvNUPW9sOUBaQ6zpBy4mgn0mD0whj3Q0oXFC6+uH9zuEU5hKNnsvyAfTV2AHAMBoU05JgbuHUmBcUGsqNaGsAF0S4GKEbNMThtFSIBk0mUpJgVTE1BnAhMlSrotYOZBMpkYY7yLBdHZCCoKk/DkVA3Fyp7UoIP8YTDRNmWfkwP7M1
xYqq4Rxr2gQ609XoD4nPppNHFLmccJ4HXbWe/NCLlwsIE6uD+Uq1TCz3psXupcVTpu4pUSTw5YteSDuJOZuTz1vrDDdLQLivDtpmqRJg/0Cb0Ok45fKvNgkWZrJ1CizFaZLAnosoK9B/cT0TICrav1Fib3rNlWoP5M4ZDmpNmZkAAAAAElFTkSuQmCC"
          alt="guitar"
        />

        <form
          className="flex flex-col justify-center max-w-[650px] w-full mx-auto"
          onSubmit={signIn}
        >
          <h2 className="text-main-yellow font-inter italic font-extrabold text-4xl mb-20">
            WELCOME BACK
          </h2>

          <div className="flex justify-between items-end py-2">
            <label className="text-white font-inter font-bold text-xs ">
              Username
            </label>
            <input
              className="bg-black border-b-[1px] border-main-yellow w-4/5 text-white"
              type="text"
              onChange={(event) => {
                setEnteredUsername(event.target.value);
              }}
            />
          </div>
          <div className="flex justify-between items-end py-2">
            <label className="text-white font-inter font-bold text-xs">
              Password
            </label>
            <input
              className="bg-black border-b-[1px] border-main-yellow w-4/5 text-white"
              type="password"
              onChange={(event) => {
                setEnteredPassword(event.target.value);
              }}
            />
          </div>

          <Recaptcha
            setDidRecaptcha={setDidRecaptcha}
            setRecaptchaErrorMessage={setRecaptchaErrorMessage}
          />
          {recaptchaErrorMessage && (
            <p className="text-red-500 text-xs font-inter mt-2 flex">
              {recaptchaErrorMessage}
            </p>
          )}
          {didRecaptcha === false && (
            <p className="text-red-500 text-xs font-inter mt-2 flex">
              Please complete the Recaptcha to proceed.
            </p>
          )}
          <div className="flex items-end justify-between mt-16">
            <button
              type="submit"
              className="bg-main-yellow text-black font-inter font-semibold rounded-lg w-52 h-9"
            >
              Login
            </button>

            <div>
              <div className="flex flex-row">
                <p className="text-white font-inter mr-1">
                  Don't have an account?
                </p>
                <button type="button" className="text-main-yellow font-inter">
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-main-yellow font-inter">
                  <Link to="/forgotpassword">Forgot Password</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};
