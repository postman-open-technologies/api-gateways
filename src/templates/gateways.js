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
            <h6>Platform Capabilities</h6>
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
            <h6>Gateway Capabilities</h6>
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
            <h6>Delivery Models</h6>
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
            <h6>Links</h6>
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
            notes
            platformCapabilities
            downstreamProtocols
            gatewayCapabilities
            customCodeSupport
            deliveryModels
            policies {
              capabilities
              name
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
