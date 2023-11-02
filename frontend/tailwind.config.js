/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#F6E902",
        "main-blue": "#7DCCEC",
        "main-red" : "#FF4545",
      },
      fontFamily: {
        inter: ["Inter", "Helvetica"],
        lemon: ["Lemon"],
        mono: ["Azeret Mono"]
      },
    },
  },
  plugins: [],
};
