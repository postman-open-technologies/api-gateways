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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "source-yaml",
        path: "./src/content/",
      },
      __key: "source-yaml",
    },
  ],
};
