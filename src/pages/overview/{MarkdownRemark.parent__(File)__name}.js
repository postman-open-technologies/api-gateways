import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";

const MarkdownPage = ({ data, location }) => {
  const { markdownRemark } = data;
  return (
    <Layout location={location}>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}></div>
    </Layout>
  );
};
export default MarkdownPage;

export const query = graphql`
  query MarkdownQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`;
