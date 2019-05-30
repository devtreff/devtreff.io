const path = require("path");

// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "devtreff",
  plugins: [
    {
      use: path.resolve("./src/plugins/source-storyblok"),
      options: {
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN
      }
    }
  ]
};
