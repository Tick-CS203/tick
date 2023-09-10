import ReCAPTCHA from "react-google-recaptcha";

export const Recaptcha = () => {
  async function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <ReCAPTCHA
      sitekey=""
      onChange={onChange}
    />
  );
};
