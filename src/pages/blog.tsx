import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList from "../components/posts-list"

type DataProps = {
    site: {
        buildTime: string
    }
}

const Blog: React.FC<PageProps<DataProps>> = ({
    path,
    data,
    location
}) => (
    <Layout title="Blog" location={location}>
        <SEO title="Blog" />
        <h1>{path}</h1>
        <PostsList data={data} />
    </Layout>
)

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    },    
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`

