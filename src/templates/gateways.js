import React from "react";
import { graphql, Link } from "gatsby";
import { Converter } from "showdown";
import sanitizeHtml from "sanitize-html";
import Layout from "../components/Layout";
import GatewayTagCategories from "../components/GatewayTagCategories";

const gatewayTemplate = ({ data, location }) => {
  const { properties, links } = data.allYaml.edges[0].node;
  const { name, description } = properties;

  const converter = new Converter();
  const descriptionHtml = converter.makeHtml(description);
  const sanitizedDescription = sanitizeHtml(descriptionHtml);

  return (
    <Layout location={location}>
      <h1>{name}</h1>
      <div className="collection__wrapper">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          <GatewayTagCategories properties={properties} />
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <h4>Gateway Policies</h4>
            {properties.policies.map((policy) => {
              return (
                <div key={policy.category}>
                  {policy.category}
                  <ul>
                    {policy.capabilities.map((capability) => {
                      return <li key={capability}>{capability}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <h4>Links</h4>
            <ul>
              {links
                .filter((item) => !item.rel.includes("urn:gateway:logo"))
                .map((item, index) => {
                  return (
                    <li key={`link_${index}`}>
                      {item.href.startsWith("http://") ||
                      item.href.startsWith("https://") ? (
                        <a href={item.href}>{item.title}</a>
                      ) : (
                        <Link to={item.href}>{item.title}</Link>
                      )}
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
