import React from "react";
import { Link } from "gatsby";
import { naiveSlugify } from "../helpers/slugify";

const TagCardText = ({ title, slugRoot, items }) => {
  return (
    <div
      style={{ marginTop: "0px", marginBottom: "30px" }}
      className="card-text"
    >
      <h4>{title}</h4>
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
