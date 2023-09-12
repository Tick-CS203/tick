/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#F6E902",
      },
      fontFamily: {
        'inter': ['Inter', 'Helvetica'],
        'lemon': ['Lemon'],
      },
    },
  },
  plugins: [],
};
