const siteUrl =
  process.env.NETLIFY == "true"
    ? "https://gateways.netlify.app"
    : process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "http://localhost:9000";

module.exports = {
  siteMetadata: {
    siteUrl,
    title: "API Gateways",
    titleTemplate: "%s",
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
          "delivery-model": require.resolve(
            "./src/templates/delivery-models.js"
          ),
          "platform-capability": require.resolve(
            "./src/templates/platform-capabilities.js"
          ),
          "gateway-capability": require.resolve(
            "./src/templates/gateway-capabilities.js"
          ),
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "source-images",
        path: "./src/images/",
      },
      __key: "source-images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "source-templates",
        path: "./src/templates/",
      },
      __key: "source-templates",
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-sri",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "API Gateways",
        short_name: "API Gateways",
        start_url: "/",
        background_color: "#FF6C37",
        theme_color: "#FF6C37",
        display: "minimal-ui",
        icon: "src/images/favicon.png",
      },
    },
  ],
};
