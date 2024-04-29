/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.purple,
          DEFAULT: colors.purple[400],
        },
        secondary: {
          ...colors.gray,
          DEFAULT: colors.gray[400],
        },
        accent: {
          ...colors.yellow,
          DEFAULT: colors.yellow[400],
        },
      },
    },
  },
  plugins: [],
};
