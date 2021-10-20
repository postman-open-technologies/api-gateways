import React, { useEffect } from "react";
import ForkOverlay from "./ForkOverlay";
import ImportOverlay from "./ImportOverlay";

import "./RunInPostman.scss";
const RunInPostman = () => {
  useEffect(() => {
    const ripId = "postman-run-button";
    var j = {
      defaults: {
        webAction:
          "Don't have the app yet? <span class='pm-oip-highlighted-text'><a href='#' target='_blank' id='open-in-web-url'>Get the app</a></span>",
      },
      thisPageUrl: encodeURIComponent(window.location.href),
      customReferrer: "",
      thisPageHash: window.location.hash,
      isMac: window.navigator && /mac/i.test(window.navigator.userAgent),
      isWindows:
        window.navigator && /windows/i.test(window.navigator.userAgent),
      isLinux: window.navigator && /linux/i.test(window.navigator.userAgent),
      isIE:
        (window.navigator &&
          -1 !== window.navigator.userAgent.indexOf("Trident")) ||
        -1 !== window.navigator.userAgent.indexOf("MSIE"),
      isChrome:
        window.navigator &&
        /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/.test(
          window.navigator.userAgent
        ),
      isSafari:
        window.navigator &&
        /Version\/([0-9\._]+).*Safari/.test(window.navigator.userAgent),
      isFirefox:
        window.navigator &&
        /Firefox\/([0-9\.]+)(?:\s|$)/.test(window.navigator.userAgent),
      isEdge:
        window.navigator &&
        /Edge\/([0-9\._]+)/.test(window.navigator.userAgent),
      postmanOverlay: "",
      nativeAnchor: "",
      webAnchor: "",
      artemisAnchor: "",
      miscActionContainer: "",
      viewCollectionAnchor: "",
      forkWrapper: "",
      modalHeading: "",
      segregateEnvironments: !1,
      enableArtemis: !0,
      environments: [],
      url_root: {
        native: "postman://app/",
        web: "https://www.postman.com/downloads",
      },
      urlLengthLimits: { windows: { ie: 507, others: 2046 } },
      propertyWhitelist: {
        "url_action.native": {
          type: "string",
          set: function (M) {
            return (j.buttonActionPaths["collection/import"].native = M), !0;
          },
        },
        "url_root.native": {
          type: "string",
          set: function (M) {
            return (j.url_root.native = M), !0;
          },
        },
        "defaults.webAction": {
          type: "string",
          set: function (M) {
            return (j.defaults.webAction = M), !0;
          },
        },
        segregateEnvironments: {
          type: "boolean",
          set: function (M) {
            return (j.segregateEnvironments = M), !0;
          },
        },
        enableArtemis: {
          type: "boolean",
          set: function (M) {
            return (j.enableArtemis = M), !0;
          },
        },
      },
      propertyAlias: {
        "url_action.mac": "url_action.native",
        "url_root.mac": "url_root.native",
      },
      buttonActionPaths: {
        "collection/import": { native: "collections/import/", web: "" },
        "collection/fork": { native: "collections/import/", artemis: "" },
      },
      fetchElementsByClass: function (M) {
        return window.document.getElementsByClass
          ? window.document.getElementsByClass(M)
          : window.document.querySelectorAll("." + M);
      },
      getOverlayHtml: function (M) {
        return "collection/fork" === M ? <ForkOverlay /> : <ImportOverlay />;
      },
      getById: function (M) {
        return window.document.getElementById(M);
      },
      parseEnv: function (M) {
        var o, i;
        return (
          !!(M = decodeURIComponent(M).match(/^env\[(.+)\]=(.*)$/)) &&
          ((o = M[1]),
          (i = JSON.parse(atob(M[2]))),
          !Array.isArray(i) && (i = j.envToArr(i)),
          { name: o, values: i })
        );
      },
      envToArr: function (M) {
        var o,
          i = [];
        for (o in M)
          M.hasOwnProperty(o) && i.push({ key: o, value: M[o], enabled: !0 });
        return i;
      },
      addEnv: function (M, o, i) {
        return (
          !Array.isArray(o) && (o = j.envToArr(o)),
          j.environments.push({ buttonIndex: i, name: M, values: o })
        );
      },
      assignToEnv: function (M, e, n) {
        M.forEach(function (i) {
          var t;
          e.forEach(function (M, o) {
            i.key === M.key && ((t = !0), !n && ((e[o] = i), !0));
          }),
            !t && e.push(i);
        });
      },
      addUniqueEnv: function (M, o, i, t, e) {
        var n = j.environments,
          L = parseInt(t, 10),
          s = e || j.segregateEnvironments;
        if (s) {
          if (void 0 === t)
            return (
              !i &&
                j.throwSafeException(
                  [
                    "Cannot create environment, ",
                    M,
                    ". Run button index is required, when segregateEnvironments property is enabled.",
                  ].join("")
                ),
              !1
            );
          if (isNaN(L))
            return (
              !i &&
                j.throwSafeException(
                  "Cannot update environment, buttonIndex should be valid number"
                ),
              !1
            );
        }
        for (var a = 0; a < n.length; a++) {
          if (s && n[a].buttonIndex === L && n[a].name === M)
            return (
              !i &&
                j.throwSafeException(
                  [
                    "Cannot create duplicate environment, ",
                    M,
                    ",for button ",
                    L,
                    ". Use env.replace instead.",
                  ].join("")
                ),
              !1
            );
          if (!s && n[a].name === M)
            return (
              !i &&
                j.throwSafeException(
                  [
                    "Cannot create duplicate environment, ",
                    M,
                    ", using env.create. Use env.replace instead.",
                  ].join("")
                ),
              !1
            );
        }
        return j.addEnv(M, o, isNaN(L) ? void 0 : L);
      },
      bindHandlers: function (M, o, i) {
        var t = j.fetchElementsByClass(M);
        "function" == typeof i
          ? [].forEach.call(
              t,
              function (M) {
                M.addEventListener(o, function () {
                  i.apply(M, this);
                });
              },
              !1
            )
          : console.log("Failed to bind handler, not a function.");
      },
      objectifyElement: function (M) {
        var o = {};
        if (M && M.attributes)
          return (
            [].forEach.call(M.attributes, function (M) {
              M.name.match(/^data-postman-.*$/) &&
                (o[M.name.replace("data-postman-", "")] = M.value);
            }),
            o
          );
      },
      toggleForkImportSections: function (M) {
        var o = j.getById("pm-oip-fork-modal-import-section"),
          i = j.getById("pm-oip-fork-modal-fork-section");
        i.className =
          "import" === M
            ? ((o.className = ""), "display-none")
            : ((o.className = "display-none"), "");
      },
      injectOverlay: function (M, o) {
        if (!window.document.getElementById(M)) {
          var i = j.getOverlayHtml(o.action);
          document.body.insertAdjacentHTML("beforeend", i),
            j.bindHandlers("pm-oip-modal-dismiss", "click", function () {
              j.toggleOverlayVisibility("hide");
            }),
            "collection/fork" === o.action &&
              (j.bindHandlers("pm-oip-modal-fork", "click", function () {
                j.toggleOverlayVisibility("hide");
              }),
              j.bindHandlers("open-import-copy", "click", function () {
                j.toggleForkImportSections("import"),
                  (window.location.href = j.getHref("native", o));
              }),
              j.bindHandlers("pm-oip-fork-modal-dismiss", "click", function () {
                j.toggleForkImportSections("fork"),
                  j.toggleOverlayVisibility("hide");
              })),
            (j.postmanOverlay = j.getById("pm-oip-overlay")),
            (j.nativeAnchor = j.getById("pm-oip-open-in-native-url")),
            (j.miscActionContainer = j.getById("pm-oip-modal-misc-actions"));
        }
      },
      populateOverlay: function (M) {
        "collection/fork" === M.action
          ? ((j.viewCollectionAnchor = j.getById("open-view-collection")),
            (j.forkAnchor = j.getById("open-fork-page")),
            j.viewCollectionAnchor &&
              (j.viewCollectionAnchor.href = j.getHref("view-collection", M)),
            j.forkAnchor && (j.forkAnchor.href = j.getHref("artemis", M)),
            j.isChrome ||
              j.isSafari ||
              j.isFirefox ||
              j.isEdge ||
              ((j.forkWrapper = j.getById("fork-wrapper")),
              (j.modalHeading = j.getById("fork-heading")),
              (j.forkWrapper.className = "pm-oip-fork-not-supported"),
              (j.modalHeading.innerHTML =
                "Use a different browser to fork collections")))
          : ((j.miscActionContainer.innerHTML = ""),
            j.miscActionContainer.insertAdjacentHTML(
              "afterbegin",
              j.defaults.webAction
            ),
            (j.webAnchor = j.getById("open-in-web-url")),
            (j.artemisAnchor = j.getById("pm-oip-open-in-artemis-url")),
            (j.nativeAnchor.href = j.getHref("native", M)),
            j.webAnchor && (j.webAnchor.href = j.getHref("web", M)),
            (j.artemisAnchor.href = j.getHref("artemis", M)),
            j.isMac && (j.nativeAnchor.className += " is-mac"),
            j.isWindows && (j.nativeAnchor.className += " is-windows"),
            j.isLinux && (j.nativeAnchor.className += " is-linux"),
            !j.isChrome &&
              !j.isSafari &&
              !j.isFirefox &&
              !j.isEdge &&
              (j.artemisAnchor.className +=
                " pm-oip-modal-row-disabled pm-oip-modal-row-with-subtext"),
            !j.enableArtemis &&
              (j.artemisAnchor.className += " pm-oip-modal-row-hidden"),
            !j.isMac &&
              !j.isWindows &&
              !j.isLinux &&
              (j.nativeAnchor.className +=
                " pm-oip-modal-row-disabled pm-oip-modal-row-with-subtext"));
      },
      toggleOverlayVisibility: function (M) {
        var o = j.postmanOverlay.className;
        -1 < j.postmanOverlay.className.indexOf("pm-oip-overlay-visible") ||
        "hide" === M
          ? (j.postmanOverlay.className = o.replace(
              " pm-oip-overlay-visible",
              ""
            ))
          : (j.postmanOverlay.className += " pm-oip-overlay-visible");
      },
      getNativeURL: function (M, o, i, t, e, n) {
        var L = [M, o, "?", i, t, n].join(""),
          s = !0;
        return (
          j.isWindows &&
            (j.isIE
              ? L.length + e.length > j.urlLengthLimits.windows.ie && (s = !1)
              : L.length + e.length > j.urlLengthLimits.windows.others &&
                (s = !1)),
          (L = [L, s ? e : "#?"].join(""))
        );
      },
      getHref: function (M, o) {
        var i = o && parseInt(o["button-index"], 10),
          t = "",
          e = j.getButtonAction(M, o),
          n = j.getReferrer(),
          L = j.getVersionTag(o),
          s = j.getEnvironment(o),
          a = o["var-1"],
          r = o["collection-url"],
          u = j.getParams(i, s),
          w = "collection/fork" === o.action ? "fork" : "import";
        switch (M) {
          case "native":
            t = j.getNativeURL("postman://app/", e, n, L, u, s);
            break;
          case "web":
            t = [j.url_root[M], "?", n].join("");
            break;
          case "artemis":
            t =
              u && 2 < u.length && !s
                ? [
                    "https://elements.getpostman.com/view/",
                    w,
                    "?collection=",
                    a,
                    "&",
                    n,
                    u,
                  ].join("")
                : [
                    "https://elements.getpostman.com/view/",
                    w,
                    "?collection=",
                    a,
                    "&",
                    n,
                    L,
                    s,
                  ].join("");
            break;
          case "view-collection":
            t = ["https://elements.getpostman.com", "/redirect?", r].join("");
        }
        return t;
      },
      getVersionTag: function (M) {
        var o = M["var-2"];
        if (o) return "&versionTag=" + o;
      },
      getEnvironment: function (M) {
        var o = M["var-3"];
        if (o) return "&environment=" + o;
      },
      getParams: function (o, i) {
        var t = [];
        return (
          j.environments.forEach(function (M) {
            try {
              (j.segregateEnvironments && M.buttonIndex !== o) ||
                t.push(
                  M.values
                    ? encodeURIComponent("env[" + M.name + "]") +
                        "=" +
                        btoa(JSON.stringify(M.values))
                    : M.name
                );
            } catch (M) {
              i
                ? console.log(
                    "Houston, we might not be able to import the environment associated into the Postman App for versions earlier than 7.21.0. Please upgrade to the latest app if you face an issue or use Postman on Web.",
                    M
                  )
                : console.log(
                    "Houston, we might not be able to import the environment, since it contains unsupported characters",
                    M
                  );
            }
          }),
          "#?" + t.join("&")
        );
      },
      getReferrer: function () {
        return "referrer=" + (j.customReferrer || j.thisPageUrl);
      },
      getButtonAction: function (o, i) {
        return (0,
        {
          "collection/import": function () {
            var M = i["var-1"];
            return [j.buttonActionPaths["collection/import"][o], M].join("");
          },
          "collection/fork": function () {
            var M = i["var-1"];
            return [j.buttonActionPaths["collection/fork"][o], M].join("");
          },
        }[i.action])();
      },
      throwSafeException: function (M) {
        window.setTimeout(function () {
          throw ["Postman Run Button: ", M].join("");
        });
      },
      findEnv: function (M, o, i) {
        if (j.segregateEnvironments && void 0 === i)
          return (
            j.throwSafeException(
              [
                "Cannot update environment, ",
                o,
                ". Run button index is required, when segregateEnvironments property is enabled.",
              ].join("")
            ),
            !1
          );
        var t = parseInt(i, 10);
        if (j.segregateEnvironments && isNaN(t))
          return (
            j.throwSafeException(
              "Cannot update environment, buttonIndex should be valid number"
            ),
            !1
          );
        for (var e = 0; e < M.length; e++)
          if (
            M[e].name === o &&
            (!j.segregateEnvironments ||
              (j.segregateEnvironments && M[e].buttonIndex === t))
          )
            return M[e];
        return -1;
      },
    };
    Array.prototype.forEach.call(
      document.getElementsByClassName(ripId),
      function (ripButton, index) {
        var i, t;
        ripButton.setAttribute("data-postman-button-index", index),
          (i = j.objectifyElement(ripButton)),
          (t = j.parseEnv(i.param)) &&
            (j.addUniqueEnv(t.name, t.values, !0, index, !0) ||
              window._pm("env.assign", t.name, t.values, !0, index));
      }
    ),
      j.bindHandlers(ripId, "click", function () {
        var M;
        (M = j.objectifyElement(this)),
          j.injectOverlay("pm-oip-overlay", M),
          j.populateOverlay(M),
          j.toggleOverlayVisibility("show");
      }),
      (function () {
        if (window) {
          var i,
            t,
            e,
            n = Array.prototype.slice,
            L = window.PostmanRunObject;
          if (
            ((i = {
              "env.create": function (M, o, i) {
                return j.addUniqueEnv(M, o, !1, i);
              },
              "env.replace": function (M, o, i) {
                var t = j.environments,
                  e = j.findEnv(t, M, i);
                return e && -1 !== e
                  ? (!Array.isArray(o) && (o = j.envToArr(o)),
                    (e.values = o),
                    !0)
                  : (j.throwSafeException(
                      [
                        "env.replace cannot be used to create a new environment, ",
                        M,
                        ". Use env.create instead.",
                      ].join("")
                    ),
                    !1);
              },
              "env.assign": function (M, o, i, t) {
                var e = j.environments,
                  n = j.findEnv(e, M, t);
                return n && -1 !== n
                  ? (!Array.isArray(o) && (o = j.envToArr(o)),
                    j.assignToEnv(o, n.values, i),
                    !0)
                  : (j.throwSafeException(
                      [
                        "Cannot find the ",
                        M,
                        " environment",
                        void 0 !== t ? " for button " + t : "",
                        ". env.assign can only be used on an existing environment.",
                      ].join("")
                    ),
                    !1);
              },
              "_referrer.set": function (M) {
                j.customReferrer = encodeURIComponent(M);
              },
              "_property.get": function (M) {
                return j[M];
              },
              "_property.set": function (M, o) {
                return (
                  (M = j.propertyAlias[M] || M),
                  j.propertyWhitelist.hasOwnProperty(M) &&
                    typeof o === j.propertyWhitelist[M].type &&
                    j.propertyWhitelist[M].set(o)
                );
              },
            }),
            ((t = window._pm =
              function () {
                var M = n.call(arguments),
                  o = i[M.shift()];
                return "function" == typeof o && o.apply(j, M);
              }).version = "3.5.5"),
            L)
          )
            for (e = 0; e < L.length; e++)
              L[e] &&
                L[e].length &&
                !L[e].processed &&
                (t.apply(window, L[e]), (L[e].processed = !0));
        }
      })();
  });

  return (
    <div
      className="postman-run-button"
      data-postman-action="collection/fork"
      data-postman-var-1="10354132-ab067c9b-4eb8-408f-8ade-708004bda02f"
      data-postman-collection-url="entityId=10354132-ab067c9b-4eb8-408f-8ade-708004bda02f&entityType=collection&workspaceId=f5c5ab05-0656-42a5-a11d-0403c02c9897"
    ></div>
  );
};

export default RunInPostman;
