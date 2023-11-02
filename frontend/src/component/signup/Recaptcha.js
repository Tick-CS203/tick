import ReCAPTCHA from "react-google-recaptcha";
import { axiosInstance } from "../../api/axios";

export const Recaptcha = (props) => {
  
  async function onChange(value) {
    props.setDidRecaptcha(true)
    try {
      const response = await axiosInstance.post("/tickets/recaptcha", {
        recaptchaToken: value,
      });
      console.log(response)
      if (!response.data.success) {
        props.setRecaptchaErrorMessage(response.data["error-codes"][0])
      }
    } catch (error) {
      props.setRecaptchaErrorMessage(error.message)
    }
  }

  return (
    <ReCAPTCHA
      sitekey="6Lc-W-4nAAAAAPjaVV4F0FZGH3-R7YlL_Yx_tiOT"
      onChange={onChange}
    />
  );
};
