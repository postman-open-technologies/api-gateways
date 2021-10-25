import React from "react";
import { Link } from "gatsby";
import Layout from "../../components/Layout";

const ResearchStatusPage = ({ location }) => {
  return (
    <Layout location={location}>
      <div>
        <h1>Research Status</h1>
        <p>
          API Gateway research can be fairly extensive. Each gateway entry is
          labeled with one of a few different research statuses to indicate its
          good-enough completeness and accuracy. We are open to suggestions and
          welcome Pull Requests to the{" "}
          <a href="https://github.com/kevinswiber/api-gateways">
            kevinswiber/api-gateways repository
          </a>{" "}
          on GitHub.
        </p>
      </div>
      <div>
        <h2 id="planning">Planning</h2>
        <p>The page is primarily acting as a placeholder for future content.</p>
        <h2 id="active-research">Active Research</h2>
        <p>Research is ongoing. Data may be inaccurate or incomplete.</p>
        <h2 id="pending-review">Pending Review</h2>
        <p>Research is complete enough to warrant a review.</p>
        <h2 id="verified">Verified</h2>
        <p>Data has been verified by more than one party.</p>
      </div>
    </Layout>
  );
};
export default ResearchStatusPage;
