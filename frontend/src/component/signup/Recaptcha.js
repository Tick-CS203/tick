import ReCAPTCHA from "react-google-recaptcha";
import { axiosLocalHostInstance } from "../../api/axios";

export const Recaptcha = (props) => {
  

  async function onChange(value) {
    try {
      const response = await axiosLocalHostInstance.post("/tickets/recaptcha", {
        recaptchaToken: value,
      });
      console.log(response)
      if (response.data.success) {
        props.setDidRecaptcha(true)
      } else {
        props.setRecaptchaErrorMessage(response.data["error-codes"][0])
      }
    } catch (error) {
      props.setRecaptchaErrorMessage(error.message)
    }
  }

  return (
    <ReCAPTCHA
      sitekey=""
      onChange={onChange}
    />
  );
};
