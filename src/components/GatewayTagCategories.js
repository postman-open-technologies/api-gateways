import React from "react";
import TagCardText from "./TagCardText";
import { naiveSlugify } from "../helpers/slugify";

const GatewayTagCategories = ({ properties }) => {
  return (
    <>
      <TagCardText
        id={`${naiveSlugify(properties.name)}-platform-capabilities`}
        title="Platform Capabilities"
        slugRoot="/platform-capabilities"
        items={properties.platformCapabilities}
        key="platform-capabilities"
      />
      <TagCardText
        id={`${naiveSlugify(properties.name)}-gateway-capabilities`}
        title="Gateway Capabilities"
        slugRoot="/gateway-capabilities"
        items={properties.gatewayCapabilities}
        key="gateway-capabilities"
      />
      <TagCardText
        id={`${naiveSlugify(properties.name)}-delivery-models`}
        title="Delivery Models"
        slugRoot="/delivery-models"
        items={properties.deliveryModels}
        key="delivery-models"
      />
    </>
  );
};

export default GatewayTagCategories;
