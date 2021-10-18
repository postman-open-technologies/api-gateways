import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import GatewayTagCategories from "./GatewayTagCategories";

const Gateway = ({ gateway }) => {
  const {
    node: { parent, properties, links },
  } = gateway;

  const logo = links.find((link) => {
    return link.rel.indexOf("urn:gateway:logo") !== -1;
  }) || { href: "" };
  const product = links.find((link) => {
    return link.rel.indexOf("urn:gateway:product") !== -1;
  }) || { href: "" };

  return (
    <div className="card" style={{ marginBottom: "20px", borderRadius: "8px" }}>
      <div className="card-body">
        <div className="row">
          <h3 className="col-sm card-title">{properties.name}</h3>
          <div className="col-sm">
            <Link to={`/gateways/${parent.name}/`}>
              <img
                src={logo.href}
                alt={`${properties.name} Logo`}
                width="100"
                style={{ marginBottom: "10px" }}
              />
            </Link>
          </div>
        </div>
        <div
          style={{
            border: "0px solid #000",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          <GatewayTagCategories properties={properties} />
        </div>
        <Link
          to={`/gateways/${parent.name}/`}
          className="card-link"
          style={{
            height: "auto",
            fontWeight: "bold",
          }}
        >
          Go to {properties.name} -&gt;
        </Link>
        <a
          href={product.href}
          className="card-link"
          style={{
            height: "auto",
            marginLeft: "30px",
          }}
          target="_blank"
          rel="noreferrer"
        >
          Product Page
          <FontAwesomeIcon
            style={{ marginLeft: "10px" }}
            icon={faExternalLinkAlt}
            size="1x"
          />
        </a>
      </div>
    </div>
  );
};
export default Gateway;
