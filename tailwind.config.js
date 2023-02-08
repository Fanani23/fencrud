const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#000000",
          500: "#333340",
          100: "#0A0A0D",
        },
        catacean: {
          100: "#010A35",
          75: "#010A35BF",
          50: "#010A3580",
          25: "#010A3540",
        },
        onyx: {
          100: "",
          75: "",
          50: "",
          25: "",
        },
        gamboge: {
          100: "",
          75: "",
          50: "",
          25: "",
        },
        g: {
          100: "",
          75: "",
          50: "",
          25: "",
        },
      },
      fontFamily: {
        "nunito-sans": "Nunito Sans",
        montserrat: "Montserrat",
        "noto-sans": "Noto Sans",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-auto-hide": {
          "&::-webkit-scrollbar": {
            width: ".5rem",
            opacity: 0,
          },
          "&::-webkit-scrollbar:hover": {
            opacity: 1,
          },
          "&::-webkit-scrollbar-track": {
            "background-color": "none",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            "background-color": "#333340",
            "border-radius": "1rem",
          },
        },
        ".scrollbar-shown": {
          "&::-webkit-scrollbar": {
            width: ".5rem",
            opacity: 0,
          },
          "&::-webkit-scrollbar:hover": {
            opacity: 1,
          },
          "&::-webkit-scrollbar-track": {
            "background-color": "none",
          },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "#333340",
            "border-radius": "1rem",
          },
        },
      });
    }),
  ],
};
