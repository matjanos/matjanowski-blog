import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import Avatar from "./avatar"

const Header = () => {

    const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
        childImageSharp {
          fixed(width: 200, height: 200, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

const name = data.site.siteMetadata.author.name;

    return (<div style={{textAlign: 'center'}}>
        <Avatar />
        <div>Hi, my name is</div>
        <div className='author-name-header'>{name}</div>
    </div>)
}

export default Header;