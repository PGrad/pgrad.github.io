import { Helmet } from "react-helmet";
import { SocialIcon } from "react-social-icons";
import "./homepage.css";

function Avatar() {
    return (
        <div className="avatar">
            <Helmet>
                <link rel="preload" as="image" href="Air_and_Space.jpg" />
            </Helmet>
            <img className="avatarImg" src="Air_and_Space.jpg" alt="my profile pic" />
        </div>
    );
}

export default function Homepage() {
    return (
        <section className="homepage">
            <Avatar />
            <section className="intro">
                <div className="flavor-text">
                    <p>Frontend Web Developer based out of Oakland, CA.</p>
                    <p>Interested in AI, languages, books, and cats.</p>
                </div>
                <div className="socials">
                    <SocialIcon className="icon" fgColor="white" url="https://github.com/PGrad" />
                    <SocialIcon className="icon" fgColor="white" url="https://www.linkedin.com/in/paulgrad3/" />
                </div>
            </section>
        </section>
    )
}