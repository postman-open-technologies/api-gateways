import React from "react";
import { Link } from "gatsby";
const gatewayTemplate = (props) => {
  const { pageContext } = props;
  const { name, description, links } = pageContext;
  return (
    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
      <h2>{name}</h2>
      <ul>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </ul>
      <ul>
        {Object.keys(links).map((key, index) => {
          const item = links[key];
          return (
            <li key={`link_${index}`}>
              <Link to={item.url}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default gatewayTemplate;
