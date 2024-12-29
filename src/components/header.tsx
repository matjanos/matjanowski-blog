import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Avatar from "./avatar"

const Header = () => {

    const data = useStaticQuery(graphql`
    query {
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
        <div>and I'm really glad that you are here!</div>
    </div>)
}

export default Header;