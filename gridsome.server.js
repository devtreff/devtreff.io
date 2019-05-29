// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.loadSource(({ addContentType }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  });

  api.loadSource(async store => {
    store.addMetaData("coverImage", "~/images/DevTreff3_35.jpg");
  });

  const postcssImport = require("postcss-import")();

  const tailwind = require("tailwindcss");

  const postcssPresetEnv = require("postcss-import")(null);

  const purgecss = require("@fullhuman/postcss-purgecss")(null);

  api.chainWebpack(config => {
    config.module
      .rule("scss")
      .oneOf("normal")
      .use("postcss-loader")
      .tap(options => {
        options.plugins.push(postcssImport);

        options.plugins.unshift(tailwind);

        options.plugins.push(postcssPresetEnv);

        process.env.NODE_ENV === "production" && options.plugins.push(purgecss);

        return options;
      });

    config.module
      .rule("css")
      .oneOf("normal")
      .use("postcss-loader")
      .tap(options => {
        options.plugins.push(postcssImport);

        options.plugins.unshift(tailwind);

        options.plugins.push(postcssPresetEnv);

        process.env.NODE_ENV === "production" && options.plugins.push(purgecss);

        return options;
      });
  });
};
