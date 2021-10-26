import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import GatewayList from "../../components/GatewayList";

const GatewayIndexPage = ({ data, location }) => {
  const gateways = data.allYaml.edges;

  return (
    <Layout data={data} location={location}>
      <div>
        <h1>API Gateways</h1>
        <div>
          <GatewayList gateways={gateways} />
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
    allYaml(
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
