import React from "react"
import { PageProps, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Avatar from "../components/avatar"

type DataProps = {
    site: {
        buildTime: string
    }
}

const MeComponent: React.FC<PageProps<DataProps>> = ({
    path,
    location,
}) => (
    <Layout title="About me" location={location}>
        <SEO title="About me" />
        <h1>{path}</h1>
        <div style={{textAlign:'center', paddingBottom:'50px'}}>
            <Avatar/>
        </div>
        <p>
            On web pages like this one, sections like this one are supposed to
            introduce the author as a talented, clever, ambitious and confident
            person. I have just about 20-30 seconds to gain your attention. First
            I should prove that I'm awesome, but in so subtle way that you will be
            convinced that I'm also modest, open for constructive criticism and
            aware that there are a lot of things to learn. Will I do it? Let me
            answer by quoting Shakespeare:
        </p>
        <blockquote>
            <p>
                No.
            </p>
            <footer>
                <cite>Hamlet.</cite> Act V, Scene 1, Line 425
            </footer>
        </blockquote>
        <p>
            Why? That's because I don't believe in everything that I read in
            the Internet, so I want you not to do it either! I always want to
            check out everything by myself, so I want you to do same! Text me,
            interview me, talk with me and ascertain that I'm the one you need!
            To have a pleasent conversation we should have a background about our
            interests and hobbies! Here are some of mine:
            <ul>
                <li><span className="area-head">Software Engineering, IT Management</span> -
                I love to do things from scratch and plan them first!
                I'm really excited with implementing software design
                that I created by myself, basing on user's requirements,
                interviews and user's stories. I deeply believe in agile
                methodologies so I follow them as much as I can!</li>
                <li><span className="area-head">Software architecture</span> -
                I'm focused on developing my knowledge and skills in this area.
                I find microservices approach incredibly clever and innovative
                - that's why I'm exploring this idea in the context of Cloud
                Computing. I'm still not experienced so I'll be pleased to
                exchange thoughts in this area.</li>
                <li><span className="area-head">Software security</span> -
                I feel big respect for this sector of IT! It's very important
                and we still(!) are not taking it for granted! Every time I
                face some access security issue I try to push the frontier of
                my knowledge in this field.</li>
            </ul>
            Am I a geek? Yes I am. But it is said that a successful professional
            is able to find a perfect work-life balance by being passionate not
            only with one's work but also having other interests. Here are some
            of mine:
            <ul>
                <li> astronomy</li>
                <li>theology</li>
                <li>football (english Premiership)</li>
                <li>politics</li>
            </ul>
        </p>
    </Layout>
)

export default MeComponent

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
