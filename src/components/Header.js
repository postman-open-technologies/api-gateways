import React from "react";
import "./Header.scss";
//import { trackCustomEvent } from "gatsby-plugin-google-analytics";
import $ from "jquery";

/*
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination,
} from "react-instantsearch-dom";
import { CustomHits } from "../Search/searchPreview";
*/

import postmanLogo from "../images/postman-logo-icon.svg";

// window.$ = $;

/* Algolia Search Bar */
//const ClickOutHandler = require("react-onclickout");

/*const algoliaClient = algoliasearch(
  "4A5N71XYH0",
  "bf5cf4783437b12c2dca33724c9c04b0"
);*/

// removes empty query searches from analytics
/*
const searchClient = {
  search(requests) {
    const newRequests = requests.map((request) => {
      // test for empty string and change request parameter: analytics
      if (!request.params.query || request.params.query.length === 0) {
        request.params.analytics = false;
      }
      return request;
    });
    return algoliaClient.search(newRequests);
  },
};

// Get Cookie for Sign In toggler
const getCookie = (a) => {
  if (typeof document !== "undefined") {
    const b = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`);
    return b ? b.pop() : "";
  }
  return false;
};

// changes button in navbar based on cookie presence
const LoginCheck = (props) => {
  const { cookie, beta } = props;

  if (cookie !== "yes") {
    return (
      <>
        <a
          href={`https://go.postman${beta}.co/build`}
          className="button__sign-in pingdom-transactional-check__sign-in-button"
          onClick={() => {
            trackCustomEvent({
              // string - required - The object that was interacted with (e.g.video)
              category: "lc-top-nav",
              // string - required - Type of interaction (e.g. 'play')
              action: "Click",
              // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
              label: "sign-in-button-clicked",
            });
          }}
        >
          Sign In
        </a>
        <a
          href={`https://identity.getpostman${beta}.com/signup?continue=https%3A%2F%2Fgo.postman.co%2Fbuild`}
          className="button__sign-up"
          onClick={() => {
            trackCustomEvent({
              // string - required - The object that was interacted with (e.g.video)
              category: "lc-top-nav",
              // string - required - Type of interaction (e.g. 'play')
              action: "Click",
              // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
              label: "sign-in-button-clicked",
            });
          }}
        >
          Sign Up for Free
        </a>
      </>
    );
  }
  return (
    <a href="https://go.postman.co/home" className="button__sign-up ml-3">
      Launch Postman
    </a>
  );
};
*/
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beta: "",
      cookie: "",
      hasInput: false,
      refresh: false,
    };
  }

  componentDidMount() {
    /* eslint-disable func-names */
    /* Applies styling for sticky nav */
    $("#secondaryNav").on("click", () => {
      $("body").toggleClass("menu-open");
      $(".nav-primary").toggleClass("activeMenu");
      $(".nav-secondary").toggleClass("activeMenu");
    });
    // Dropdown Slideup Animation
    function showBsDropdown() {
      $(this).find(".dropdown-menu").first().stop(true, true).slideDown(225);
      $(this).find(".arrow-icon").addClass("show");
    }
    $(".dropdown").on("show.bs.dropdown", showBsDropdown);
    // Dropdown Slidedown Animation
    function hideBsDropdown() {
      $(this).find(".dropdown-menu").stop(true, true).slideUp(225);
      $(this).find(".arrow-icon").removeClass("show");
    }
    $(".dropdown").on("hide.bs.dropdown", hideBsDropdown);
    (function (p, o, s, t, m, a, n) {
      !p[s] &&
        (p[s] = function () {
          (p[t] || (p[t] = [])).push(arguments);
        });
      !o.getElementById(s + t) &&
        o
          .getElementsByTagName("head")[0]
          .appendChild(
            ((n = o.createElement("script")),
            (n.id = s + t),
            (n.async = 1),
            (n.src = m),
            n)
          );
    })(
      window,
      document,
      "_pm",
      "PostmanRunObject",
      "https://run.pstmn.io/button.js"
    );
  }

  /*
  // Algolia - clicking out exits searchbox
  onClickOut = () => {
    const searchInput = document.getElementsByClassName(
      "ais-SearchBox-input"
    )[0].value;
    if (searchInput !== "") {
      this.setState(() => ({
        hasInput: false,
      }));
    }
  }; // end onClickOut
  */

  showTargetElement = () => {
    // Show Sign In Button if user is not logged in (mobile)
    /*
    const cookie = getCookie("getpostmanlogin");
    const signInButton = document.querySelector(".mobile-sign-in");
    if (cookie !== "yes") {
      signInButton.classList.toggle("show");
    }
    */
    // Global Mobile Icon Transition
    const toggler = document
      .getElementById("globalNav")
      .getAttribute("aria-expanded");
    const body = document.querySelector("body");
    const icon1 = document.getElementById("icon-wrap-one");
    // Mobile Menu is active ?
    if (toggler === "true") {
      // Add lock CSS to body to disable scroll
      body.classList.add("lock");
      // Flip up dropdown icon
      icon1.classList.add("open");
    }
    // Hellobar
    const messageBarAlertTop = document.getElementById(
      "message-bar-alert-top"
    ) || { style: { display: "" } };
    if (!messageBarAlertTop.style.display) {
      messageBarAlertTop.style.display = "none";
    } else {
      messageBarAlertTop.style.display = "";
    }
  };

  hideTargetElement = () => {
    // Hide Sign In Button if user is not logged in (mobile)
    /*const signInButton = document.querySelector(".mobile-sign-in");
    const cookie = getCookie("getpostmanlogin");
    if (cookie !== "yes") {
      signInButton.classList.toggle("hide");
    }
    */
    const toggler = document
      .getElementById("globalNav")
      .getAttribute("aria-expanded");
    const body = document.querySelector("body");
    const icon1 = document.getElementById("icon-wrap-one");
    // Mobile Menu is not active ?
    if (toggler === "false") {
      // Remove lock CSS to body to disable scroll
      body.classList.remove("lock");
      // Flip down dropdown icon
      icon1.classList.remove("open");
    }
    const icon2 = document.getElementById("icon-wrap-two");
    const togglerSecondary = document
      .getElementById("secondaryNav")
      .getAttribute("aria-expanded");
    if (togglerSecondary === "false") {
      icon2.classList.remove("open");
    }
  };

  showTargetElementLC = () => {
    // LC Mobile Icon Transition
    const togglerSecondary = document
      .getElementById("secondaryNav")
      .getAttribute("aria-expanded");
    const icon2 = document.getElementById("icon-wrap-two");
    if (togglerSecondary === "true") {
      icon2.classList.add("open");
    }
  };

  hideTargetElementLC = () => {
    const icon2 = document.getElementById("icon-wrap-two");
    const togglerSecondary = document
      .getElementById("secondaryNav")
      .getAttribute("aria-expanded");
    if (togglerSecondary === "false") {
      icon2.classList.remove("open");
    }
  };
  /* eslint-enabe class-methods-use-this */

  render() {
    //const { refresh, hasInput, beta, visibleHelloBar, cookie } = this.state;
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
            <div
              className="postman-run-button"
              data-postman-action="collection/fork"
              data-postman-var-1="10354132-ab067c9b-4eb8-408f-8ade-708004bda02f"
              data-postman-collection-url="entityId=10354132-ab067c9b-4eb8-408f-8ade-708004bda02f&entityType=collection&workspaceId=f5c5ab05-0656-42a5-a11d-0403c02c9897"
            ></div>
          </div>
          {/*}
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContentBottom"
          >
            <ul className="property-context-menu navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link uber-nav"
                  href="/docs/getting-started/introduction/"
                >
                  Docs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link uber-nav"
                  href="/docs/administration/managing-your-team/managing-your-team/"
                >
                  Admin
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link uber-nav mr-3"
                  href="/docs/developer/resources-intro/"
                >
                  Developer
                </a>
              </li>
            </ul>
            {/* Aloglia Widgets *}
            <div className="form-inline header__search">
              <label htmlFor="search-lc" />
              <svg
                className="nav-search__icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#6b6b6b"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.87147 9.16437C10.5768 8.30243 11 7.20063 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C7.20063 11 8.30243 10.5768 9.16437 9.87147L9.89648 10.6036L9.64648 10.8536L13.5758 14.7829C13.8101 15.0172 14.19 15.0172 14.4243 14.7829L14.7829 14.4243C15.0172 14.19 15.0172 13.8101 14.7829 13.5758L10.8536 9.64648L10.6036 9.89648L9.87147 9.16437ZM6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                />
              </svg>
              <ClickOutHandler onClickOut={this.onClickOut}>
                <InstantSearch
                  searchClient={searchClient}
                  indexName="docs"
                  refresh={refresh}
                >
                  <Configure hitsPerPage={5} />

                  {/* forcefeed className because component does not accept natively as prop *}
                  <SearchBox
                    id="search-lc"
                    className="searchbox"
                    class="ais-SearchBox-input"
                    submit={<></>}
                    reset={<></>}
                    translations={{
                      placeholder: "Search Postman Docs",
                    }}
                    onKeyUp={(event) => {
                      this.setState({
                        hasInput: event.currentTarget.value.length > 2,
                      });
                    }}
                  />

                  <div className={!hasInput ? "input-empty" : "input-value"}>
                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                          <CustomHits hitComponent={Hits} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <Pagination
                            translations={{
                              previous: "← Previous",
                              next: "Next →",
                              first: "«",
                              last: "»",
                              ariaPrevious: "Previous page",
                              ariaNext: "Next page",
                              ariaFirst: "First page",
                              ariaLast: "Last page",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </InstantSearch>
              </ClickOutHandler>
            </div>
          </div>
              */}
        </nav>
      </>
    );
  }
}

export default Header;
