import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { Converter } from "showdown";
import sanitizeHtml from "sanitize-html";

const IndexPage = ({ data }) => {
  const gateways = data.allYaml.edges;

  return (
    <Layout data={data}>
      <h1>API Gateways</h1>
      <p>Research collected for the most popular API gateways.</p>
      <div className="collection__wrapper">
        <div className="container">
          <hr />
          <br />
          <h3>API Gateways</h3>
          {gateways.map(({ node: { properties, links } }) => {
            const converter = new Converter();
            const descriptionHtml = converter.makeHtml(properties.description);
            const sanitizedDescription = sanitizeHtml(descriptionHtml);
            const logo = links.find((link) => {
              return link.rel.indexOf("urn:gateway:logo") !== -1;
            }) || { href: "" };
            return (
              <div
                className="row collection"
                key={`gateway-${properties.name}`}
              >
                <div className="col-md-1" style={{ border: "0px solid #000" }}>
                  <img
                    src={logo.href}
                    width="100"
                    alt={`${properties.name} Logo`}
                  />
                </div>
                <div
                  className="col-md-8"
                  style={{
                    border: "0px solid #000;",
                    paddingLeft: "20px",
                  }}
                >
                  <h4>{properties.name}</h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: sanitizedDescription,
                    }}
                  ></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
export const query = graphql`
  query IndexPage {
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
              relativePath
            }
          }
          properties {
            name
            description
            provider
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
