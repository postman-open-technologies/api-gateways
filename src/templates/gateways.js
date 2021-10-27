import React from "react";
import { graphql, Link } from "gatsby";
import { Converter } from "showdown";
import sanitizeHtml from "sanitize-html";
import Layout from "../components/Layout";
import GatewayTagCategories from "../components/GatewayTagCategories";
import { naiveSlugify } from "../helpers/slugify";
import AnchorHeading from "../components/AnchorHeading";

const gatewayTemplate = ({ data, location }) => {
  const { properties = {}, links = [] } = data.allYaml.edges[0].node;
  const { name = "", description = "", status = "Planning" } = properties;

  const converter = new Converter();
  const descriptionHtml = converter.makeHtml(description);
  const sanitizedDescription = sanitizeHtml(descriptionHtml);

  const customLinks = [
    {
      type: "subtitle",
      name: "Additional Resources",
    },
    ...links
      .filter((item) => !item.rel.includes("urn:gateway:logo") && item.title)
      .map((item) => {
        return {
          type: "link",
          name: item.title,
          url: item.href,
        };
      }),
  ];

  return (
    <Layout location={location} customLinks={customLinks}>
      <h1>{name}</h1>
      <div className="collection__wrapper">
        <div className="container">
          <div>
            <Link
              to={`/overview/research-status#${naiveSlugify(status)}`}
              className="btn btn__small btn__secondary-light"
              style={{
                height: "auto",
                border: "1px solid #a6a6a6",
                borderRadius: "8px",
                padding: "8px 16px",
              }}
            >
              {status}
            </Link>
          </div>
          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          <GatewayTagCategories properties={properties} />
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <AnchorHeading level="4">Gateway Policies</AnchorHeading>
            {properties.policies.map((policy) => {
              return (
                <div key={policy.category}>
                  <AnchorHeading level="6">{policy.category}</AnchorHeading>
                  <ul>
                    {policy.capabilities.map((capability) => {
                      return <li key={capability}>{capability}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
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
            status
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
