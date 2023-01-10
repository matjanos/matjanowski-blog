import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Avatar = () => {
    return <div>
        <StaticImage
            class="avatar"
            width={200}
            src="../../content/assets/profile.jpg" alt="Profile" />
    </div>
}

export default Avatar;