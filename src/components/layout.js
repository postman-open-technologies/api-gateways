import React from "react";
import { StaticQuery, graphql } from "gatsby";
import ContextualLinks from "../components/ContextualLinks/ContextualLinks";
import Header from "./Header/Header";
import LeftNav from "./LeftNav/LeftNav";
import Seo from "./seo";

import "../styles/config/normalize.css";
import "./layout.scss";
import "./doc.scss";
import pose from "../assets/pose-learning-center.svg";

const { v4: uuidv4 } = require("uuid");

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
      name: "API Gateways",
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
  const contextual = [
    {
      type: "subtitle",
      name: "Postman Toolboxes",
    },
    {
      type: "link",
      name: "API Specification Tools",
      url: "https://postman-toolboxes.github.io/tools/",
    },
    {
      type: "link",
      name: "API Service Providers",
      url: "https://postman-toolboxes.github.io/service-providers/",
    },
    {
      type: "link",
      name: "Postman API Resource Center",
      url: "https://postman-toolboxes.github.io/postman/",
    },
    {
      type: "link",
      name: "Postman Newman",
      url: "https://postman-toolboxes.github.io/newman/",
    },
    {
      type: "subtitle",
      name: "Open Technologies Research",
    },
    {
      type: "link",
      name: "Linting Rules",
      url: "http://rules.linting.org/",
    },
    {
      type: "link",
      name: "OpenAPI Linting API",
      url: "https://github.com/postman-open-technologies/openapi-linting-api",
    },
    {
      type: "link",
      name: "API Lifecycle Blueprints",
      url: "https://apis.how/",
    },
    {
      type: "link",
      name: "A History of Compute",
      url: "https://github.com/postman-open-technologies/history",
    },
  ];
  const contextualLinks = <ContextualLinks key={uuidv4()} links={contextual} />;
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
              <aside className="col-sm-12 col-md-12 col-lg-3 offset-lg-0 col-xl-3 offset-xl-1 right-column">
                <hr className="d-block d-lg-none" />
                {/*
                <div className="edit-button">
                  <EditDoc className="btn btn__small btn__secondary-light edit-button-styles" />
                </div>
                */}
                {contextualLinks}
                <figure className="sticky posmanaut-dab">
                  <img src={pose} alt="pose" className="img-fluid" />
                </figure>
              </aside>
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
