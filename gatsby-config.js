const siteUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://gateways.netlify.app";

module.exports = {
  siteMetadata: {
    siteUrl,
    title: "API Gateways",
    titleTemplate: "%s - Postman Open Technologies",
    description: "A research project providing detail on popular API gateways.",
    twitterUsername: "@getpostman",
    image: "/images/postman-horizontal-white-logo.svg",
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
          gateway: require.resolve("./src/templates/gateways.js"),
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
    "gatsby-plugin-react-helmet",
  ],
};
