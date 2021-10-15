import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../../components/Layout";
import { naiveSlugify } from "../../helpers/slugify";

import "./index.scss";

const GatewayIndexPage = ({ data }) => {
  const gateways = data.allYaml.edges;

  return (
    <Layout data={data}>
      <h1>API Gateways</h1>
      <p>Research collected for the most popular API Gateways.</p>
      <h2>Overview</h2>
      <p>
        The first wave of API Gateways, historically, were offered as a
        component within larger API Management platforms. As the industry
        evolved, a new wave of API Gateways were introduced in isolation. Some
        of these gateway providers are now supplementing their standalone
        offering with additional tools, often centered around a management
        approach more conducive to internal API lifecycles.
      </p>
      <div>
        <p>
          Presented here is a comprehensive, yet not entirely exhaustive, list
          of popular API Gateways in use today. A few areas of research have
          been highlighted:
        </p>
        <ul>
          <li>Platform Capabilities</li>
          <li>Gateway Capabilities</li>
          <li>Delivery Models</li>
        </ul>
      </div>
      <div className="collection__wrapper">
        <h2>Popular Gateways</h2>
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

export default GatewayIndexPage;
export const query = graphql`
  query GatewayIndexPage {
    site {
      siteMetadata {
        description
      }
    }
    allYaml(sort: { order: ASC, fields: properties___name }) {
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
