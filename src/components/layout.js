import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Seo from "./seo";
import Header from "./Header/Header";
import LeftNav from "./LeftNav/LeftNav";

import "../styles/config/normalize.css";
import "./layout.scss";

export default function Layout({ children }) {
  return <StaticQuery query={query} render={render(children)} />;
}

const render = (children) => (data) => {
  const gateways = data.allYaml.edges;
  let platformCapabilityList = [];
  let gatewayCapabilityList = [];

  gateways.forEach(
    ({
      node: {
        properties: { platformCapabilities, gatewayCapabilities },
      },
    }) => {
      platformCapabilityList =
        platformCapabilityList.concat(platformCapabilities);
      gatewayCapabilityList = gatewayCapabilityList.concat(gatewayCapabilities);
    }
  );

  const leftNavItems = [
    {
      name: "Gateways",
      parentSlug: "gateways",
      url: "/gateways",
      subMenuItems1: gateways.map((gateway) => {
        const parts = gateway.node.parent.relativePath.split(".");
        const routePath = parts.slice(0, parts.length - 1).join(".");
        return {
          name: gateway.node.properties.name,
          url: `/${routePath}`,
        };
      }),
    },
    {
      name: "Platform Capabilities",
      url: "/platform-capabilities",
      parentSlug: "platform-capabilities",
      subMenuItems1: platformCapabilityList.map((pc) => {
        return {
          name: pc,
          url: `/platform-capabilities/${pc
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")}`,
        };
      }),
    },
    {
      name: "Gateway Capabilities",
      parentSlug: "gateway-capabilities",
      url: "/gateway-capabilities",
      subMenuItems1: gatewayCapabilityList.map((gc) => {
        return {
          name: gc,
          url: `/gateway-capabilities/${gc
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")}`,
        };
      }),
    },
  ];
  return (
    <>
      <Seo />
      <Header />
      <div className="container-fluid">
        <div className="row row-eq-height">
          <nav className="col-sm-12 col-md-4 col-lg-3 left-nav-re">
            <LeftNav LeftNavItems={leftNavItems} />
          </nav>
          <div className="col">
            <div className="row row-eq-height">
              <main className="col-sm-12 col-md-12 col-lg-9 offset-lg-0 col-xl-7 doc-page ml-xl-5">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const query = graphql`
  query LayoutComponent {
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
            platformCapabilities
            gatewayCapabilities
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
