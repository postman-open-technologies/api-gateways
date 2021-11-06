const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const publicPath = path.resolve("./public");
const apiPath = path.join(publicPath, "api");

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
                relativeDirectory
                relativePath
                internal {
                  content
                }
              }
            }
          }
        }
      }
    }
  `);

  const apiResponses = {};
  data[typeName].edges.forEach((edge) => {
    const node = edge.node;
    const klasses = node.class;
    if (klasses.length === 0) {
      return;
    }

    const dirPath = path.join(
      apiPath,
      node.parent.relativeDirectory,
      node.parent.name
    );
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    apiResponses[node.parent.relativeDirectory] = [];

    const filePath = path.join(
      apiPath,
      node.parent.relativeDirectory,
      node.parent.name,
      "index.html"
    );

    const json = yaml.load(node.parent.internal.content);
    const value = Object.assign({}, json);
    if (!value.links) {
      value.links = [];
    }
    value.links.push({
      rel: ["self"],
      href: `/api/${path.join(
        node.parent.relativeDirectory,
        node.parent.name
      )}`,
    });

    apiResponses[node.parent.relativeDirectory].push(value);
    fs.writeFileSync(filePath, JSON.stringify(value));

    const klass = klasses[0];
    const routePath = `${node.parent.relativeDirectory}/${node.parent.name}`;

    const template = templates[klass];
    if (!template) {
      return;
    }

    actions.createPage({
      path: `/${routePath}/`,
      component: template,
      context: { id: node.id },
    });
  });

  for ([dir, responses] of Object.entries(apiResponses)) {
    const dirPath = path.join(apiPath, dir);
    fs.writeFileSync(
      path.join(dirPath, "index.html"),
      JSON.stringify({
        class: [dir],
        entities: responses,
        links: [
          {
            rel: ["self"],
            href: `/api/${dir}/`,
          },
        ],
      })
    );
  }
};
