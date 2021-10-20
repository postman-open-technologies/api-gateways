import React, { useEffect, useRef } from "react";
import runInPostman from "../helpers/runInPostman";

import "./RunInPostman.scss";

const RunInPostman = () => {
  useEffect(() => {
    runInPostman(window);
    return () => {
      const overlay = document.querySelector("#pm-oip-overlay");
      if (overlay) {
        overlay.remove();
      }
      const styles = document.querySelector("#postman-critical-css");
      if (styles) {
        styles.remove();
      }
    };
  });

  return (
    <div>
      <div
        className="postman-run-button"
        data-postman-action="collection/fork"
        data-postman-var-1="10354132-ab067c9b-4eb8-408f-8ade-708004bda02f"
        data-postman-collection-url="entityId=10354132-ab067c9b-4eb8-408f-8ade-708004bda02f&entityType=collection&workspaceId=f5c5ab05-0656-42a5-a11d-0403c02c9897"
      ></div>
    </div>
  );
};

export default RunInPostman;
