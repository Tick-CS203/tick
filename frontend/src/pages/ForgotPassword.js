import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setUsername } from "../store/userSlice";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredNewPassword, setEnteredNewPassword] = useState("");
  const [enteredConfirmNewPassword, setEnteredConfirmNewPassword] = useState("");

  // Send confirmation code to user's email
  async function forgotPassword(event) {
    event.preventDefault();

    try {
      await Auth.forgotPassword(enteredUsername);
      dispatch(setUsername(enteredUsername));
      navigate("/resetpassword")
    } catch(err) {
      console.log(err);
    }
  } 


  return (
    <div className="grid grid-cols-1 h-screen w-full relative">

        <img
          className="absolute left-[128px]top-[128px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEaUlEQVR4nO2cQahVVRSGT2iZA4kaFBHVICc5CSQaNAgiSgqKJs7CwkGNBBtYr3fXfiekic5qFBg1yYk0UhIaXQeiePe6WimCr0ipePbuWvelkCRmHjk2KEJNO3e9tdbd64M9fez/rHf+y/3vv3dVOScN6eWEvJCQm0ktyHS6h/yCtjZ31P3Td6fMo0kO4+9FP2jrc8cc8usyw/jrLdHW5w5AHkgNJCF9oK3PFTWO1osNI/PFWRw9qK3RFSnTZ4J29am2PlfMfHvuXkC+IDaQo4tPaGt0BSBtE/zs+Epbny+a5o6UeV5uIOMN2hJdAXn0kuDbcaIduLZGVyTkL8U+Owa8WVufK3rDpUcT0mWRYWRebL/5a2t0Rcq8U+ztQE7a+lyxZX5+lVRuBci/v3f4lwe0NboCkN+Q+zDnj7X1uQOkcqtMV2DIj2vrc0Utm1vt09bnjiSYWyWkZ7X1uWJGMLeCTN/EF0FDuRUM6TWZf6NppRHMrTL9XJ9o7tKW6AqQzK0yvaOtzx1JKrfK/Ft96Nx92vpc0ZPMrZA+1NbnjiSWW9HlHi4+pq3PFVtEcyv6QlufO0Awt+oNxk9r63MHCOVW7d/V1uaOWjC3msPxRm197khCuVVbDa37zUptfa6Yke1bbdXW5w4Qyq0A6fy7uHSPtj5fiOZWvFNbnjukcitA+qPGpUe09blDsG+1W1ubOyRzq9nMT2nrc4dUbgXIB7S1uUM0txrQK9r63CF5TjB1W9+nIT1XlUZCOmLg4Tc3GkpVErNDetLAQ29uaHmZv6tKoj3Lp/3Q001WL9NbVSlInxNM3Ve/qM6W7DlB7mZVyBfq4eLaqhjEzwly11VWMix7TpC7rUyHN+5pVlQlIXlOMHUaBl+sj/K6qiQkc6vUedFMVRqS5wRThwXIx97E5s6qNFKmMwbfjEvFXqfRXgxmcCDbq1Jpr85rGyB2rIqOx7GEDtT9ZuWk4nrI9Gc0GTuScLxhcm8H7+i6n+IBpE8mNIxTbx/6cXXxD9SCXUFrVcPRMzEMM3ZFH8UwrNhVpjPbDtKaGIgFu8p0JW6sNmVXtGtS+yke6G5XC+2vlMU/SCt2BUivxjCM2BVk/jyGYcSuAInqr8/eHwMxYldzca7Qjl1B5r0T3k4A/9OuINOvs8f4oXiCRuwKMm+KYRixK0DaH8MwYleAdL43GD8cAzFiV72SCtIO7KpfVEHasl1BcQVp+3a1VXvfU0u6XbsqsSBt1q5ygQVp23ZF5RWkrdoVlFqQtmhXcO1SmdF67f1ONfXt2FWm97X3O/WkW7WrTCfbKzm09zv1wC3YVRSkjdkVREHajl1BFKTt2BVEQdqaXVEUpM3YVY6CtB27ylGQXna7astsN7GqXcu7o8L5D7taiIK0IbuCKEjbsSuIgrQdu4IoSNuyq7koSC8/7Q9LCYmvY1V7FbYTXM+uIArStuwKoiCtORA++68P8v2K2wkA6ad/DCMK0tqkwfjFNjS8dndW5ue191MZ4SripL01kL62MgAAAABJRU5ErkJggg=="
          alt="lightning"
        />
        
        <img
          className="absolute left-[64px] bottom-[128px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFQklEQVR4nO1azY8UVRCvV61i+FgFQQ9eUE+o8eOqV3X9CH5dVLxC1gtoOOkB9OaKepHo/+HHQryARFBUQE2MsAtKwJ2p6t0BxmXnvZ5I8kz1vDfb7GzP9Ez3fIRQSSedfvU+6r2qelW/aoCbdIOSrcBYRMFWw+ojTepLzXjaMIaaUcvj3k9Lm/AIr52HdTAKZGdglSZ8XZM6qAn/M4y2m0f6aFYHNOFr9g+4bfACnIfbI8a3DeFsc1GMkWZ1SDPuqXHwclSGLdULsN5auFUeeZdv0qYZ92pWh6VPQrB/IsJdMvZAhDBhMK4JzyYW8Ith3G4vwx3djnXlCtxpGHcYxhOJU5oxYfBMX09Bs/o8IcDJIic0YfCsIfx16YTVflFdKJKuMtzjdl5UqGYId1oLQeGbZSEQlXXOQQT66SrB3YUMbgg2e1USr1MneBj6THWGRzThdFPVCDbnGnChDJv8gIbx54USbIQBUfUCrDeER50w50QrerYJr06G8AdLsKbw1XZaA8Eaw3jcq1lPNqNJfeHVqXoRNsCQ6N9ZuKupZqz2d9U5KgfPecMehE1kshl2DiAMxrO7WcJzTqV2wohQjfEdZy9nM12amnG3vyf64WJ7JWvhFk34m6xNhGrPPAOrlsKO4GkYMYrKwfNOU8ptT0UzvunDDhhBshZUHFE07HdbKqMm9a0TZDuMKBnGiYatqIOpF5AmvCYRaZYAUMJuySvkmA1hybCa7CYU77V/VdbJWJcUQILOFgYJr52vPpRlITJxa46hJrMKkqe/YfxO+CMOXmxtJPWJ0709mQaLd3HZQghLmQXJ0d+Q+qDBrz5uaZRMLVXK7AuZzSnIbJa+NQ5ecdrzdasgEmWKIGXYkkM1PswsSI7+dYKH3OU4vcLAWJFGiW26MNbJeGd7N/ae+i+UYKMTfr6lUTyBNA4FBOiSrFzcDie4cQUxjJekcZghezcJn1OtudzGPkyqe2NnPNPSqFlNOff7Eow41cLgVed+v2p3Ie5NG8AQHotTzgqM9WuRtgJjcYpNeLTjhchqX7sQ5XD6AHjKB2z9cAo2hmCbgevJ1HUwHom1h4KtbYPGFYOxGESDB8R3+2O1JVhdmBAlWK1ZfeON2DDcvxKfOCMfNKZqRmI3dqRNuDgHj3sPJ2pWq8C9eYWQMQRuMo0xK/UQHk3jNYxvuY08kCWxOtFu4qgMD2rG8473kmZ8o1ch3JyXnX3+3c5rxomVV+92c8ZYlg/mOqAVApiJrSQCvmOGg6eyCiCptCH8MYH1TnWCRyMKXvDIfUeMqwk+EJ7qBD641HPC241HBWMPGAbjcnJSzJFH3htAtfpUE/6VCBbnYjTfgsoAPvzeMHLc1RUcJIByxw7SZx7WacL3DCFnLvQQkiZ814awNssc2m2wRLyZEccEQKcFHMvUqbFrqEN4Uvy7IfxeBGsUgDCKhZRvUpoL4QnhzTruYgiPaUbjVL67UoavhcgOZA3t+0ELDSDdVQPUZ/lAbMbjQwGxQ1grLj4XiN3cDcYzzbJCGTbBgKh6ETa4kChfWcGTIbivebSE0+0uq6JoUWxiac78hZ6U0psW7FXcIRRMVlws4+6mYRdZeksrhgqgLN6tkLEtKLnstLsnvGEXXgxNklxqy8rTgsVOSNDZkx1I7OTCDjOI8vTy04nrFdf/MCA5/xHN+L7gTpLFiduWcF8eeZeikSRFwuN4Y5zguh8GZvp4Cm3zB8Zt7heOaz3+wjElAeBQBFiJBPh2P9XsEwTQ/VRTiXOHxs7L+5+SxwhP/FNNHzPNmwRDpv8BGu4aCal2+AAAAAAASUVORK5CYII="
          alt="happy"
        />

        <img
          className="absolute right-[192px] bottom-[200px] hidden lg:block"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACFUlEQVR4nO2bTUoEMRBGS3feyH0q5/IGIiroDdWNunGZivgHoig2pjr9Zr4H2QzFzPOjU+kKaCaEEEIIIYQQQggi3ezAwPSt+/fj46NWy0Wr/vC+zl8+Mwid4t9qOYvq/fNq7qcGoVH8W/Xb76LlziA0iv9XyY9lEILijxGl+2NE6f4YUbo/RpTujxGl+2NE6f4Y0a3695OTQ4ToP5nm/zr7e7ls1R/fVrn4bfZX0CvN/gp65Oxf/WZ00P2PrWlnW9/SH15a3xe2pp1tfdlBt+RrSUzryw/aU68ll37/zgYdyX/Y1nymiYaCVtCx5luTnmhf561JQfs6b01bDbonDSBD3pp+GeimicbC+uwBZNphvjXRljyAKOiVBhAFvdHgdrZ1BLzeKKIBrzeKaMDrjSIa8HqjiAa83iiiAa83imjA640iGvB6o4gGvN4oogGvN4powOuNItqqP3ytbV7uKf5GEW1eLr8FXf2c4m+si3+/bl6eXlctV7r4T3wiutnBX/6NeGutzPBbD9LKfkRB+9BWpqBXamU/oifah7YyBb3SmcE/tScNOLZ3p/akAcf27tSeNOAYbev1/57ag75/XtCUrTeIaf6YrTeI6f6b33qDwPhjROn+GFG6P0aU7o8RpftjROn+GFG6P0aU7o8RpftnX3tmg/HPvvbMBuOffe2ZDc4/+9ozG7q/EEIIIYQQQghh+80zt6Dp54AOR7AAAAAASUVORK5CYII="
          alt="sound"
        />

      
        <form className="flex flex-col justify-center max-w-[650px] w-full mx-auto" onSubmit={forgotPassword}>
          <h2 className="text-main-yellow font-inter italic font-extrabold text-4xl">RESET PASSWORD</h2>
          <div className='flex justify-between items-end py-4'>
            <label className="text-white font-inter font-bold text-xs ">Username</label>
            <input className= 'bg-black border-b-[1px] border-main-yellow text-white w-4/5' type="text"
              onChange={(event) => {
                setEnteredUsername(event.target.value);
                }} />
          </div>

          <div className= "flex justify-center my-10">
          <button type="submit" className="bg-main-yellow text-black font-inter font-semibold rounded-lg w-52 h-9">Send verification link</button>
          </div>
        </form>
    </div>
  );
};

