/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f48023",
          secondary: "#3b83f6",
          accent: "#bcbbbb",
          neutral: "#9A9A9A",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
