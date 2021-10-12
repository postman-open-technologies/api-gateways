import * as React from "react";
import { Link, navigate } from "gatsby";

const IndexPage = () => {
  navigate("/gateways/");
  return (
    <p>
      Redirecting to <Link to="/gateways/">Gateways</Link>...
    </p>
  );
};

export default IndexPage;
