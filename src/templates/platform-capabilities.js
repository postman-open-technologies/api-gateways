import React from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import { naiveSlugify } from "../helpers/slugify";

const platformCapabilityTemplate = ({ data }) => {
  const { properties } = data.allYaml.edges[0].node;
  const { name } = properties;
  const gateways = data.gateways.edges.filter(({ node }) => {
    return node.properties.platformCapabilities.indexOf(name) !== -1;
  });

  return (
    <Layout>
      <h1>{name}</h1>
      <div className="collection__wrapper">
        <h2>Related API Gateways</h2>
        <div>
          {gateways.map(({ node: { parent, properties, links } }) => {
            const logo = links.find((link) => {
              return link.rel.indexOf("urn:gateway:logo") !== -1;
            }) || { href: "" };

            return (
              <div
                className="row collection"
                key={`gateway-${properties.name}`}
              >
                <div
                  className="col-md-8"
                  style={{
                    border: "0px solid #000",
                    paddingLeft: "20px",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  <div className="row" style={{ border: "0px solid #000" }}>
                    <div className="col-sm">
                      <h3>
                        <Link to={`/gateways/${parent.name}/`}>
                          {properties.name}
                        </Link>
                      </h3>
                    </div>
                    <div className="col-sm">
                      <Link to={`/gateways/${parent.name}/`}>
                        <img
                          src={logo.href}
                          alt={`${properties.name} Logo`}
                          width="100"
                          style={{ marginBottom: "10px" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div style={{ marginTop: "0px", marginBottom: "30px" }}>
                    <h4>Platform Capabilities</h4>
                    {properties.platformCapabilities.map((capability) => {
                      return (
                        <Link
                          style={{
                            color: "#fff",
                            margin: "3px",
                            paddingTop: "5px",
                            fontSize: "85%",
                          }}
                          className="badge badge-info"
                          to={`/platform-capabilities/${naiveSlugify(
                            capability
                          )}/`}
                        >
                          {capability}
                        </Link>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <h4>Gateway Capabilities</h4>
                    {properties.gatewayCapabilities.map((capability) => {
                      return (
                        <Link
                          style={{
                            color: "#fff",
                            margin: "3px",
                            paddingTop: "5px",
                            fontSize: "85%",
                          }}
                          className="badge badge-info"
                          to={`/gateway-capabilities/${naiveSlugify(
                            capability
                          )}/`}
                        >
                          {capability}
                        </Link>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <h4>Delivery Models</h4>
                    {properties.deliveryModels.map((model) => {
                      return (
                        <Link
                          style={{
                            color: "#fff",
                            margin: "3px",
                            paddingTop: "5px",
                            fontSize: "85%",
                          }}
                          className="badge badge-info"
                          key={model}
                          to={`/delivery-models/${naiveSlugify(model)}/`}
                        >
                          {model}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default platformCapabilityTemplate;

export const query = graphql`
  query ($id: String!) {
    allYaml(filter: { id: { eq: $id } }) {
      edges {
        node {
          class
          properties {
            name
          }
        }
      }
    }
    gateways: allYaml(
      filter: { class: { in: ["gateway"] } }
      sort: { order: ASC, fields: properties___name }
    ) {
      edges {
        node {
          parent {
            ... on File {
              name
            }
          }
          properties {
            name
            description
            provider
            platformCapabilities
            gatewayCapabilities
            deliveryModels
          }
          links {
            rel
            title
            href
          }
        }
      }
    }
  }
`;
