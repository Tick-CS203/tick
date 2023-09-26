import ReCAPTCHA from "react-google-recaptcha";

export const Recaptcha = () => {
  async function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <ReCAPTCHA
      sitekey="6Lc-W-4nAAAAAPjaVV4F0FZGH3-R7YlL_Yx_tiOT"
      onChange={onChange}
    />
  );
};
