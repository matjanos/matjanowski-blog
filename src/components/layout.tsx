import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Header from './header'
import Navigation from "./nav"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
    `)
  let header, mainLink, footer;

  if (isRootPath) {
    header = (
      <Header />
    );
  }
  else {
    mainLink = (<Link to="/">{data.site.siteMetadata.author.name}</Link>)
    footer = <footer>
      © {new Date().getFullYear()} Matjanowski
  </footer>
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div className="navigation">
        {mainLink}
        <Navigation />
        <div style={{ clear: 'both' }}></div>
      </div>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      {footer}
    </div>
  )
}

export default Layout
