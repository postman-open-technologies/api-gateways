import React from "react";
import { Link } from "gatsby";
import { naiveSlugify } from "../helpers/slugify";
import AnchorHeading from "./AnchorHeading";

const TagCardText = ({ id, title, slugRoot, items }) => {
  return (
    <div
      style={{ marginTop: "0px", marginBottom: "30px" }}
      className="card-text"
    >
      <AnchorHeading level="4" id={id}>
        {title}
      </AnchorHeading>
      {items.map((item) => {
        return (
          <Link
            className="tag"
            to={`${slugRoot}/${naiveSlugify(item)}/`}
            key={item}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
};
export default TagCardText;
