// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  const resolveConfig = require("tailwindcss/resolveConfig");
  const tailwindConfig = resolveConfig(require("./tailwind.config"));
  const { GraphQLJSON, GraphQLJSONObject } = require("graphql-type-json");

  api.loadSource(store => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api

    // const tailwind = store.addContentType("Tailwind");

    // tailwind.addSchemaField("config", () => ({
    //   type: GraphQLJSONObject,
    //   resolve() {
    //     return tailwindConfig;
    //   }
    // }));

    store.addMetaData("tailwind", {
      theme: { screens: tailwindConfig.theme.screens }
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  });

  api.loadSource(async store => {
    store.addMetaData("coverImage", "~/images/DevTreff3_35.jpg");
  });

  const postcssImport = require("postcss-import")();

  const tailwind = require("tailwindcss");

  const purgeConfig = {
    content: [
      "./src/**/*.vue",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.html",
      "./src/**/*.pug",
      "./src/**/*.md"
    ],
    whitelist: [
      "body",
      "html",
      "img",
      "a",
      "g-image",
      "g-image--lazy",
      "g-image--loaded"
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  };

  const presetEnvConfig = {
    stage: 0
  };

  const postcssPresetEnv = require("postcss-import")(presetEnvConfig);

  const purgecss = require("@fullhuman/postcss-purgecss")(purgeConfig);

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
