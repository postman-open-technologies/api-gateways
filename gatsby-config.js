module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "API Gateway Catalog",
  },
  plugins: [
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-pages",
        path: "./src/markdown-pages/",
      },
      __key: "markdown-pages",
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "yaml",
      },
    },
    {
      resolve: "gatsby-siren-api-plugin",
      options: {
        typeName: "allYaml",
        templates: {
          gateway: require.resolve("./src/templates/platforms.js"),
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "source-yaml",
        path: "./src/content/",
      },
      __key: "source-yaml",
    },
  ],
};
