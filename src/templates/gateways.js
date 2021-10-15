import React from "react";
import Layout from "../components/Layout";
import { naiveSlugify } from "../helpers/slugify";
import { Converter } from "showdown";
import sanitizeHtml from "sanitize-html";
import { graphql, Link } from "gatsby";

const gatewayTemplate = ({ data }) => {
  const { properties, links } = data.allYaml.edges[0].node;
  const { name, description } = properties;

  const converter = new Converter();
  const descriptionHtml = converter.makeHtml(description);
  const sanitizedDescription = sanitizeHtml(descriptionHtml);

  return (
    <Layout>
      <h1>{name}</h1>
      <div className="collection__wrapper">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
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
                  to={`/platform-capabilities/${naiveSlugify(capability)}/`}
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
                  to={`/gateway-capabilities/${naiveSlugify(capability)}/`}
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
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <h4>Gateway Policies</h4>
            {properties.policies.map((policy) => {
              return (
                <div>
                  <Link
                    style={{
                      color: "#fff",
                      margin: "3px",
                      paddingTop: "5px",
                      fontSize: "85%",
                    }}
                    className="badge badge-info"
                    to={`/policies/${naiveSlugify(policy.category)}/`}
                  >
                    {policy.category}
                  </Link>
                  <ul>
                    {policy.capabilities.map((capability) => {
                      return <li>{capability}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <h4>Links</h4>
            <ul>
              {links.map((item, index) => {
                return (
                  <li key={`link_${index}`}>
                    <Link to={item.href}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default gatewayTemplate;
export const query = graphql`
  query ($id: String!) {
    allYaml(filter: { id: { eq: $id } }) {
      edges {
        node {
          class
          properties {
            name
            provider
            license
            researchDate
            description
            platformCapabilities
            downstreamProtocols
            gatewayCapabilities
            customCodeSupport
            deliveryModels
            policies {
              category
              capabilities
            }
          }
          links {
            href
            rel
            title
          }
        }
      }
    }
  }
`;
