const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const publicPath = path.resolve("./public");
const apiPath = path.join(publicPath, "api");

const apiResponses = {};
const directories = [];

exports.onCreateNode = ({ node }) => {
  if (node.sourceInstanceName !== "source-yaml") {
    return;
  }

  if (node.internal.type === "Directory" && node.relativePath !== "") {
    const dirPath = path.join(apiPath, node.relativePath);
    directories.push(dirPath);
    if (fs.existsSync(publicPath)) {
      if (!fs.existsSync(apiPath)) {
        fs.mkdirSync(apiPath);
      }

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    }
  }

  if (node.internal.type === "File") {
    const full = path.join(apiPath, node.relativePath);
    const parts = full.split(".");
    const filePath = parts.slice(0, parts.length - 1).join(".");

    const json = yaml.load(node.internal.content);
    delete json.id;
    if (fs.existsSync(publicPath)) {
      fs.writeFileSync(filePath, JSON.stringify(json));
    } else {
      apiResponses[filePath] = JSON.stringify(json);
    }
  }
};

exports.createPages = async ({ actions, graphql }, pluginOptions) => {
  const templates = pluginOptions.templates || [];
  const typeName = pluginOptions.typeName || "allYaml";

  const { data } = await graphql(`
    query {
      ${typeName} {
        edges {
          node {
            id
            class
            parent {
              ... on File {
                name
              }
            }
          }
        }
      }
    }
  `);

  data[typeName].edges.forEach((edge) => {
    const klasses = edge.node.class;
    if (klasses.length === 0) {
      return;
    }

    const klass = klasses[0];
    const routePath = edge.node.parent.name;

    const template = templates[klass];
    if (!template) {
      return;
    }

    actions.createPage({
      path: `/gateways/${routePath}/`,
      component: template,
      context: { id: edge.node.id },
    });
  });
};

exports.onPostBootstrap = () => {
  if (!fs.existsSync(apiPath)) {
    fs.mkdirSync(apiPath);
  }

  for (dir of directories) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

  for ([key, value] of Object.entries(apiResponses)) {
    fs.writeFileSync(key, value);
  }
};
