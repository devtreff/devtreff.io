/* eslint-disable @typescript-eslint/no-var-requires */
const { colors } = require("tailwindcss/defaultTheme");
const gradients = require("tailwindcss-gradients");

module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#F6F6F6",
          200: "#EBEBEC",
          300: "#DFDFE0",
          400: "#C7C7C8",
          500: "#AFAFB1",
          600: "#9E9E9F",
          700: "#69696A",
          800: "#4F4F50",
          900: "#353535"
        },
        dark: "#222327",
        orange: {
          ...colors.orange,
          "500": "#F5A623",
          "600": "#cc8229"
        }
      },
      linearGradients: theme => ({
        colors: theme("colors")
      }),
      height: {
        80: "20rem",
        96: "24rem"
      },
      width: {
        80: "20rem",
        96: "24rem",
        160: "40rem"
      }
    }
  },
  variants: {},
  plugins: [gradients()]
};
