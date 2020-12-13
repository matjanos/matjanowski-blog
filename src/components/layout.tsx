import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

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
      <footer>
        © {new Date().getFullYear()} Matjanowski
        <div className="socials">
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/kubamatjanowski"><FaFacebookF /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/matjanowski"><FaLinkedinIn /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/matjanos"><FaTwitter /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/matjanos"><FaGithub /></a>
          <a href="mailto:kuba@matjanowski.pl "><SiGmail /></a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
