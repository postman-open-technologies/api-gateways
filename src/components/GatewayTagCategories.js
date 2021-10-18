import React from "react";
import TagCardText from "./TagCardText";

const GatewayTagCategories = ({ properties }) => {
  return (
    <>
      <TagCardText
        title="Platform Capabilities"
        slugRoot="/platform-capabilities"
        items={properties.platformCapabilities}
        key="platform-capabilities"
      />
      <TagCardText
        title="Gateway Capabilities"
        slugRoot="/gateway-capabilities"
        items={properties.gatewayCapabilities}
        key="gateway-capabilities"
      />
      <TagCardText
        title="Delivery Models"
        slugRoot="/delivery-models"
        items={properties.deliveryModels}
        key="delivery-models"
      />
    </>
  );
};

export default GatewayTagCategories;
