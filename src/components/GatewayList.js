import React from "react";
import Gateway from "./Gateway";

const GatewayList = ({ gateways }) => {
  return (
    <>
      {gateways.map((gateway) => {
        return (
          <div key={gateway.node.properties.name}>
            <Gateway gateway={gateway} />
          </div>
        );
      })}
    </>
  );
};

export default GatewayList;
