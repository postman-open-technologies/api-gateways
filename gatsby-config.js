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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "source-yaml",
        path: "./src/data/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "source-markdown",
        path: "./src/content/",
      },
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
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: 60,
              elements: ["h2", "h3", "h4", "h5", "h6"],
            },
          },
        ],
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-sri",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
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
