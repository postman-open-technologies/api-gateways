import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import GatewayList from "../components/GatewayList";

const gatewayCapabilityTemplate = ({ data }) => {
  const { properties } = data.allYaml.edges[0].node;
  const { name } = properties;
  const gateways = data.gateways.edges.filter(({ node }) => {
    return node.properties.gatewayCapabilities.indexOf(name) !== -1;
  });

  return (
    <Layout>
      <h1>{name}</h1>
      <div className="collection__wrapper">
        <h2>Related API Gateways</h2>
        <div>
          <GatewayList gateways={gateways} />
        </div>
      </div>
    </Layout>
  );
};

export default gatewayCapabilityTemplate;

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
