const fs = require("fs");
const path = require("path");
const { Converter } = require("showdown");

if (process.env.NODE_ENV === "development") {
  // lol, tryna override the default type so
  // `gatsby develop` serves my API right
  const mime = require("./node_modules/send/node_modules/mime");
  mime.default_type = "application/json";
}

const sanitizeHtml = require("sanitize-html");
const yaml = require("js-yaml");

const publicPath = path.resolve("./public");
const apiPath = path.join(publicPath, "api");
const gatewaysPath = path.join(apiPath, "gateways");
const contentPath = "./src/content/gateways";

const apiResponses = {};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const docs = fs.readdirSync(contentPath);
  const converter = new Converter();
  const result = await graphql(
    `
      {
        allSite {
          edges {
            node {
              siteMetadata {
                siteUrl
              }
            }
          }
        }
      }
    `
  );
  console.log(result);
  const siteUrl = result.data.allSite.edges[0].node.siteMetadata.siteUrl;
  const apiRoot = {
    api: {
      title: "API Gateway Research",
      links: {
        author: "kevin.swiber@postman.com",
        describedBy: `${siteUrl}/openapi.yaml`,
      },
    },
    resources: {},
  };

  docs.forEach((doc) => {
    const parts = doc.split(".");
    const joined = parts.slice(0, parts.length - 1).join(".");

    const content = fs.readFileSync(path.join(contentPath, doc));
    const context = yaml.load(content);

    apiResponses[joined] = JSON.stringify(context);

    const descriptionHtml = converter.makeHtml(context.description);
    context.description = sanitizeHtml(descriptionHtml);

    createPage({
      path: `/${joined}/`,
      component: require.resolve("./src/templates/platforms.js"),
      context,
    });

    if (fs.existsSync(gatewaysPath)) {
      fs.writeFileSync(path.join(gatewaysPath, joined), apiResponses[joined]);
      delete apiResponses[joined];
    }
  });
};

exports.onPostBootstrap = () => {
  if (!fs.existsSync(apiPath)) {
    fs.mkdirSync(apiPath);
  }

  if (!fs.existsSync(gatewaysPath)) {
    fs.mkdirSync(gatewaysPath);
  }

  for ([key, value] of Object.entries(apiResponses)) {
    fs.writeFileSync(path.join(gatewaysPath, key), value);
  }
};
