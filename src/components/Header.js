import React from "react";
import "./Header.scss";

import postmanLogo from "../images/postman-logo-icon.svg";
import RunInPostman from "./RunInPostman";
const Header = () => {
  return (
    <>
      <nav className="navbar-v6 navbar navbar-expand-lg navbar-light bg-light nav-secondary blurred-container">
        <a className="navbar-brand" href="https://www.postman.com">
          <div className="navbar-logo-container">
            <img src={postmanLogo} alt="Postman" width="32" height="32" />
          </div>
        </a>
        <a className="navbar-brand" href="/">
          <span id="learning-center-home-link" className="nav-link uber-nav">
            API Gateways
            <span className="sr-only">(current)</span>
          </span>
        </a>
        <div className="form-inline my-2 my-lg-0 ml-auto navbar-nav">
          <div>
            <RunInPostman />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
