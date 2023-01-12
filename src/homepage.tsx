import { Helmet } from "react-helmet";
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
        <div className="homepage">
            <Avatar />
            <div className="intro">
                <p>Frontend Web Developer based out of Oakland.</p>
                <p>Interested in AI, languages, books, and cats.</p>
                <p>Open the drawer on the right to see my projects!</p>
            </div>
        </div>
    )
}