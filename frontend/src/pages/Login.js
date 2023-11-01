import { Auth } from "aws-amplify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTokens, setUsername, setUserID } from "../store/userSlice";
import { Recaptcha } from "../component/signup/Recaptcha";

export const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [didRecaptcha, setDidRecaptcha] = useState(null);
  const [recaptchaErrorMessage, setRecaptchaErrorMessage] = useState("");

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
      const user = await Auth.signIn(enteredUsername, enteredPassword);
      console.log(user);

      dispatch(
        setTokens({
          accessToken: user.signInUserSession.accessToken.jwtToken,
          refreshToken: user.signInUserSession.refreshToken.token,
          idToken: user.signInUserSession.idToken.jwtToken,
        })
      );

      //fetching will be refactored to higher level in next iter
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
      let userId = fetchUserId(user.signInUserSession.accessToken.jwtToken);

      dispatch(setUserID(userId));

      dispatch(setUsername(enteredUsername));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative grid grid-cols-1 h-screen w-full">
      <img
        className="absolute right-[32px] bottom-[128px] hidden lg:block"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADkUlEQVR4nO2cv0uVYRTHn8h+DRE2FBHVUEstQURDQxBRUlC43C0sWlxdCpcgokW3nIIiF9uajIQm2yKXiCKwJIXCKAMRkiTTTzzgEJF15b3nnnPueT5/wfm+3/d+4f3e8zwpOQc4D0zTWCaBM9ra3AFsBr4gw3ttfe4ALiHHpLY+dwBjgobc0tbnCuCIoBkLwC5tja4ABgUNua+tzxVAOzAvaMhhbY2uAK4KmvFEW58rgHXAW0FDOrQ1ugI4J2jG62y4tkZXAI8FDbmirc8VwD7gp5AZn/OXv7ZGVwD9yHFdW58rgE2CvdV3YKe2RlcAl5HjjrY+dyDXWy0DB7X1uQLZ3uqRtj53INtbndTW5wpke6uX5UPQVm91UeY1alGQ7a0+Ahu1NboC2d7qmrY+dyDXW30DtmvrcwWyvdVtbX3uQK63yibv19bnCmR7q4fa+tyBbG91XFufO5Drrca0tbkD2d6qpq3PHcj1VnmBuk1bnyuQ7a16tPW5A7neag7Ypq3PFcK9Vb+2PncI9laLwF5tfe4Q7K0eaGtzh3BvdUxbnzsEe6un2trcIdxbXdDW5w7hc4JVmABOpWgAz7HLRIoEcBTbvEuRyGf5sE13ikITzglWZTTUzpbwvlVV8otyIEWhCecEqxKrGRbet6rKM2B9ioTwOcGqNzgcSpEQ7q2q0puiIXxOsAovgA0pGsAU9vgR9jqNfDEY9riZopKvzlvZALHCq3IsoZqhbQ2s65fKJmP1X1gHjaOv6jzhAe41yIxxYEv4B2okrpaAE8UMO3E1UMywE1dTwNZiiI24Wi43VtuKq7uNmic8VI+rfD98e/gHaSiuOosZduJqqJhhJ65mgB3FEDtxVStm2Imr4WKGnbiaBXYXQ+zEVVcxw05cjRQz7MTVHLCnGGInrrqLGXbiajTUgrTxuJoPtSDtIK56tOduWVh7XMVbkDYcVwvhFqSNx1Wv9swtDWuLq5gL0kbjajHfPqc9b0vD2uLqhva8LQ/1x9WbfCWH9rwtD/XFVVmQNhZXfU0ZKDp1xtV4WZC2E1dLZUHaVlwNNGue8NQRV1NlQdpOXC2XBenmx1VeZluNsiBtKK6my4K0rbjqbPY8oflPXA1pzxeOf8TVTFmQthVXNY15QpP/WAK+/sWMYe3ZQrJKXM2WBWlbcdWlNU94gE9/mDES/qFoAnz4zYyyIK0NcHalNMx3Z53WnicZ4Rfo+Cpo30SEsgAAAABJRU5ErkJggg=="
        alt="lightning"
      />

      <img
        className="absolute left-[64px] bottom-[256px] hidden lg:block"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEcUlEQVR4nO1aW4hcRRDtYHwQFN+KKFFBEPzQKMYHqETBB+qHKFEQRPTDaNAvH9nMVM+NX0ZU0A9F/fLDD8mHguIbXcUQNVM1O+qKD4TgY5Ps3qq7mxWNhpgrNbOz3Mx2zx1I5j6GOdAsTFfd7XOrurqq+hozwggjjNAnYPvsxZb4C0u8D0i+shhdbYYVY1/vOdkiz1iSODH+DjBaaYYRNeR7u8i2B8pjZhgByE87CZNsMkXG2i3xERZ5syXZaUl2W+Jng/F4eZoekGxxEQbi+02RAcRPORb9TJqeJUG3S4fXmiLDti3btXCeU8v30gNicREOJmbPMUWGXRpp2wtv8AU+nQ0YHe/ev7wv7UXlDov8uXMvYnR37/PXSfgXU3RYkuc9wce7j4H4dreOfGRKe56SfOLT0bPWY+FXTNERUHShO9pyZOJ4mUsHiF9060RjpugIxuPlQLLXRaBK0dkuHUB+z73v5U5TBliUuptAeJtLHkh+cFq4Ea42ZQAQv+oJQk8uEY7jZT6PCHD+FFMGVDF6yG1hfrtbtjLBZ3qC3LwpCyrIV3j25O/dslWMrvIEuaYpCwKcWmGJ97uIbPxy9+lJ2RqF93gs/JYpEwDle2ekRr7hYDkOPO7/nCkTgPh1T+DacLCcvOZJOh42ZQKgPOqx3Bv95N4Wo1t0PpiMj1poDuwElCmttfU3UzRUMbzOE7h+SspZ4t96VVcLzYTugLbZFA3BtrmTLPIBT0BS1/4LiH8F5P/cZ/DUCn1Oy6pLX9rU4v8pkgcA8g4f4bTReUbqfJE8AEjeHDhhR4cFSHblQxjZ9ibG3OplofxxCIR7zmdMOLrVs3+pWg/XJMtFaEQXWeJ3S0244siT9dztBJVgfMcxsD08vxOg9AVY4pdKS1iRCCQHgLi6eGyRrFvsVCL/Y5FrSvgBjI+0yJOlJgwke2skd3UaBBb5Zdcia8T3tXQwWl9awoAybUmuTLRjP/QtEkg+VbkKhZeWlnC1OXuu/tWGOhB/1ytqA/K2BdlVweT0sf0kHmnzucAiX96+Z0o5f5ErnZKxFcU9iYVe5ySe3XM+c9RQ1uo9bxpZte4jP8dHqw4gf9bpjmhEV1JqNVfqmDafKSzJE73y6YRlm2Pfzp3Y0sFofbfFXdD+WKGuUi3JplSi7fFj0Nx1WluH71jaKeF39AZR93QwMXuCrfP1QPxB4qW8r7/pnD4H6nKzlpxZk32wH7JaXATf8FmqUyW5CZD/7fMlpY7MyAYYrexnz2rSH9D0eW2y0TVaLh4uspkStq5yzTECnLmkc+YCyZ7DSTZrws1+FtTqiDTC1QsVU1xewsRzgyBQWMLg+XRhmAlvzZtsti6NvsvtISX8+NbwuL7y5sGO+Tzy5zivoVWZyRrg+bIuE8J53EttbMyfmo9r8/5e34QNFNV6uKbVr8rUneUFkycsyo1AHGZCGOVjbQKavFHBmTOSPedBuLFathBkk6jU+TL9Uk8b8YdaMADKnxqNNUDltmdHGGEEUzT8DyA4/6nO9O/gAAAAAElFTkSuQmCC"
        alt="peace"
      />

      <img
        className="absolute right-[384px] top-[128px] hidden lg:block"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADgUlEQVR4nO2ZXYhNURTHd41vSUmePHhAHubJhEE6Oeu/9r0yRLnyne/PCIkRIUqp8UaRKPHgI2lepDx48SAvSgaF8OCj8VEyD8osS/vMjLlzzZ17zr1z7zlX86/9cjqds3577bX22msbM6ABlSxlHqlEkxWYr2lvvKkGaSYzRJlrFViozAuE0aLAUgHOKdCozLNNNUiZa4Xpllp/rjLtEeCkMC4L44kwfgnjs6b8qSbpUmC+MB79Zmi+IUzvTZKlwDZh/A6MBX0X0AMBzqqlzQpsFMaPTpAbJqlSYKuDcEOZDms6PTR43tAwQtmfJ6DWTohmF0cmiVL2t2RBbA+eAesE9DxnSSUYwtLmXAhhOvbXeNDPIHMx7dVMpsYkUQps6obgHdkQLkMp+8tM0qWW1gtIAgiinT0gQO0KLDdVBcG0qzohOoJYnNEKHHDPBiDikDKvzfJEY3V6gv8LCH+ZMzaAYDqYGAglminAKQGuCdMFN9uujMjz7posT+zrZZ9YUnkAa8e4EqHXahT0QZn9Hu8Dq7s94e9PBoTnDRPQwz5La1CbWjsleJ951V+I3BQbF0Ru7VPgnNCcA9GYGAjt8Ma3UCCg9ryBHSeEk9q5s8JAZA93nkhMduqSWx6RIIBDifCELpw1Sq2dqNbWKfsb3JGzaE9UGkKBSQI6I4xXUZdRlieOxAahnjdImJrcT4sFcKMdOBofRF3dYAHulALQmXKvxwbh5MqLUiG6DHftme4UjNumUlJLKyMbDNwU4HhIuC8CvHB9KGF8UmB3/0Ok00MF9CbirLe4eIqyy/ecBGrrfxBgRZGxcKzrG1FhhPGx30EEdKWEwC4KRoDz5QB5GSEmbvYNg/shvvNUPW9sOUBaQ6zpBy4mgn0mD0whj3Q0oXFC6+uH9zuEU5hKNnsvyAfTV2AHAMBoU05JgbuHUmBcUGsqNaGsAF0S4GKEbNMThtFSIBk0mUpJgVTE1BnAhMlSrotYOZBMpkYY7yLBdHZCCoKk/DkVA3Fyp7UoIP8YTDRNmWfkwP7M1xYqq4Rxr2gQ609XoD4nPppNHFLmccJ4HXbWe/NCLlwsIE6uD+Uq1TCz3psXupcVTpu4pUSTw5YteSDuJOZuTz1vrDDdLQLivDtpmqRJg/0Cb0Ok45fKvNgkWZrJ1CizFaZLAnosoK9B/cT0TICrav1Fib3rNlWoP5M4ZDmpNmZkAAAAAElFTkSuQmCC"
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
};
