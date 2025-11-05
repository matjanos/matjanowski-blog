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
const [firstName, ...restNameParts] = name.split(" ")
const remainingName = restNameParts.join(" ")

    return (<div style={{textAlign: 'center'}}>
        <Avatar />
        <div className='author-greeting'>Hi, my name is</div>
        <div className='author-name-header'>
            <span className="name-highlight">
                {firstName}
                <span
                    className="name-tooltip"
                    tabIndex={0}
                    aria-label="Jakub, pronounced ya-koob, is the formal name behind Kuba"
                >
                    <span aria-hidden="true" className="name-tooltip-icon">✻</span>
                    <span className="name-tooltip-bubble" role="tooltip">
                        <span className="name-tooltip-term">Jakub <em className="name-tooltip-phonetic">/ˈja.kup/</em></span>
                        <span className="name-tooltip-definition">Polish form of <strong>Jacob</strong>. "Kuba" is the everyday short form, but official documents still say Jakub.</span>
                    </span>
                </span>
            </span>
            {remainingName ? ` ${remainingName}` : ""}
        </div>
        <div className='author-tagline'>and I'm really glad that you are here!</div>
    </div>)
}

export default Header;
