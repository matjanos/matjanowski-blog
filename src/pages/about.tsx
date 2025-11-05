import React from "react"
import { PageProps, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
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
        <h1>{path}</h1>
        <div style={{textAlign:'center', paddingBottom:'50px'}}>
            <Avatar/>
        </div>
        <p>
            On pages like this, I'm expected to introduce myself as a talented,
            clever, ambitious, and confident professional. Apparently I only have
            about half a minute to earn your attention. The script says I should
            prove I'm awesome while still convincing you I'm modest, open to
            feedback, and painfully aware that there is always more to learn.
            Will I pull it off? Let's ask Shakespeare:
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
            Why the dramatic refusal? Because I don't believe everything I read
            on the internet, and I'd prefer if you didn't either. I like to check
            things myself, so reach out: text me, interview me, talk with me, and
            see for yourself whether I'm the person you need. To make that
            conversation easier, here are a few areas that keep me energised:
        </p>
        <ul>
            <li><span className="area-head">Software Engineering & Technical Leadership</span> - I shape healthy engineering environments, trimming redundant work, boosting efficiency, and aligning teams with business goals. Need rapid growth and fast deployments? I can tune the process for speed. Need hyper-resilient, zero-drama production? I can build for that too. Better visibility, sharper CI pipelines, and purposeful feedback loops are the levers I like to pull.</li>
            <li><span className="area-head">Software Architecture</span> - I'm steadily deepening my experience here. Microservices fascinate me, especially how they pair with cloud computing. I'm always up for comparing notes and exploring different approaches.</li>
            <li><span className="area-head">Applied AI</span> - I strongly believe we're in the middle of a true AI revolution—not the gimmick of bolting a chat widget onto every page, but a thoughtful use of tools that amplify human judgment. Assisted coding, agentic workflows, and eval-driven experimentation are the kinds of applications that get me excited.</li>
            <li><span className="area-head">Software Security</span> - This space keeps me humble. Each time I brush against an access or data protection challenge, I take the opportunity to push my understanding forward.</li>
        </ul>
        <p>
            Am I a geek? Absolutely. But the best professionals I know pair that
            intensity with a healthy sense of curiosity beyond work. Here are a
            few of the topics that keep me inspired outside the code editor:
        </p>
        <ul>
            <li>mountaineering</li>
            <li>sports</li>
            <li>philosophy</li>
            <li>politics</li>
        </ul>
        <p>
            If any of that resonates, let's chat. I'm always up for a thoughtful
            conversation and a new challenge.
        </p>
    </Layout>
)

export const Head = () => <Seo title="About me" />
export default MeComponent

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
