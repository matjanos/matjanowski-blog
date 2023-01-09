import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Avatar = () => {
    return <div>
        <StaticImage
            imgStyle={{ borderRadius: '50%', border: '10px solid #fbfbfb' }}
            src="../../content/assets/profile.jpg" alt="Profile" />
    </div>
}

export default Avatar;