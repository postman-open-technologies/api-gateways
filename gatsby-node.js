const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  // lol, tryna override the default type so
  // `gatsby develop` serves my API right
  const mime = require("./node_modules/send/node_modules/mime");
  mime.default_type = "application/vnd.siren+json";
}

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect(
    {
      fromPath: "/",
      toPath: "/overview/introduction/",
      statusCode: 302,
      redirectInBrowser: isDevelopment,
    },
    {
      fromPath: "/overview/",
      toPath: "/overview/introduction/",
      statusCode: 302,
      redirectInBrowser: isDevelopment,
    }
  );
};
