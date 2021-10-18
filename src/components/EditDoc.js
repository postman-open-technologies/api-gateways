import React from "react";

const EditDoc = ({ location = { pathname: "" }, className }) => {
  console.log("location from EditDoc:", location);

  const repo = "https://github.com/kevinswiber/api-gateways";
  const branch = `/blob/main`;

  const parts = location.pathname.split("/").filter((s) => s.length > 0);
  const file =
    parts.length === 1
      ? `/src/pages/${parts[0]}/index.js`
      : parts.length > 1
      ? `/src/content/${parts.join("/")}.yaml`
      : "";

  const githubUrl = file.length > 0 ? `${repo}${branch}${file}` : repo;

  const classes = className ? `${className}` : "";
  return (
    <a
      id="GTM-LC-id"
      className={classes}
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <i>
        <svg
          className="button-icon--left"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <title>logo-github</title>
          <g fill="#212121">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#212121"
              d="M8,0.2c-4.4,0-8,3.6-8,8c0,3.5,2.3,6.5,5.5,7.6 C5.9,15.9,6,15.6,6,15.4c0-0.2,0-0.7,0-1.4C3.8,14.5,3.3,13,3.3,13c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5,0.1-0.5,0.1-0.5 c0.8,0.1,1.2,0.8,1.2,0.8C4.4,13.4,5.6,13,6,12.8c0.1-0.5,0.3-0.9,0.5-1.1c-1.8-0.2-3.6-0.9-3.6-4c0-0.9,0.3-1.6,0.8-2.1 c-0.1-0.2-0.4-1,0.1-2.1c0,0,0.7-0.2,2.2,0.8c0.6-0.2,1.3-0.3,2-0.3c0.7,0,1.4,0.1,2,0.3c1.5-1,2.2-0.8,2.2-0.8 c0.4,1.1,0.2,1.9,0.1,2.1c0.5,0.6,0.8,1.3,0.8,2.1c0,3.1-1.9,3.7-3.7,3.9C9.7,12,10,12.5,10,13.2c0,1.1,0,1.9,0,2.2 c0,0.2,0.1,0.5,0.6,0.4c3.2-1.1,5.5-4.1,5.5-7.6C16,3.8,12.4,0.2,8,0.2z"
            />
          </g>
        </svg>
      </i>
      {"  "}Edit this doc
    </a>
  );
};

export default EditDoc;
