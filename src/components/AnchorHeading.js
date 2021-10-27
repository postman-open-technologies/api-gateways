import React, { useEffect } from "react";
import { naiveSlugify } from "../helpers/slugify";

import "./AnchorHeading.scss";

const Heading = ({ level, id, className, children }) => {
  const tag = `h${level}`;
  const el = React.createElement(tag, {
    id,
    className,
    style: { position: "relative" },
    children,
  });

  return el;
};

const AnchorHeading = ({ id, level, children, className }) => {
  useEffect(() => {
    var hash = window.decodeURI(window.location.hash.replace("#", ""));
    console.log(hash);
    if (hash !== "") {
      var element = document.getElementById(hash);
      if (element) {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        var clientTop =
          document.documentElement.clientTop || document.body.clientTop || 0;
        var offset =
          element.getBoundingClientRect().top + scrollTop - clientTop;
        // Wait for the browser to finish rendering before scrolling.
        setTimeout(function () {
          window.scrollTo(0, offset - 60);
        }, 0);
      }
    }
  });
  const elementId = id || naiveSlugify(children);
  return (
    <Heading
      level={level}
      id={elementId}
      title={children}
      className={className}
    >
      <a
        href={`#${elementId}`}
        aria-label={`${elementId} permalink`}
        className="anchor before"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          height="16"
          version="1.1"
          viewBox="0 0 16 16"
          width="16"
        >
          <path
            fillRule="evenodd"
            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
          ></path>
        </svg>
      </a>
      {children}
    </Heading>
  );
};

export default AnchorHeading;
