import React from "react";
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
    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
      <h2>{name}</h2>
      <ul>
        <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </ul>
      <ul>
        {links.forEach((item, index) => {
          return (
            <li key={`link_${index}`}>
              <Link to={item.href}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
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
