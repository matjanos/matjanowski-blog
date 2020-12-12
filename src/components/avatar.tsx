import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Avatar = () => {

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

    const avatar = data?.avatar?.childImageSharp?.fixed

    return <div>
        <Image
            imgStyle={{ borderRadius: '50%', border: '10px solid #fbfbfb' }}
            fixed={avatar} alt="Profile" />
    </div>
}

export default Avatar;