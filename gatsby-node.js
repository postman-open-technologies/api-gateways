if (process.env.NODE_ENV === "development") {
  // lol, tryna override the default type so
  // `gatsby develop` serves my API right
  const mime = require("./node_modules/send/node_modules/mime");
  mime.default_type = "application/vnd.siren+json";
}
