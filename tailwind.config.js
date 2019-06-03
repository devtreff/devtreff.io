const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          "200": "#F7F7F7",
          "900": "#222327"
        },
        orange: {
          ...colors.orange,
          "500": "#F5A623",
          "600": "#cc8229"
        }
      }
    }
  },
  variants: {},
  plugins: []
};
