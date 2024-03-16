import Iframe from "react-iframe";
import { useParams } from "react-router-dom";
import "./Host.css";

// Iframes can't be explored by screen
// readers, so it's best to hide them.

// If a disabled user wants to access
// the project, they can click on the link.
export default function Host() {
  const { project } = useParams();
  if (project) {
    const url = `https://pgrad.github.io/${project}`;
    return (
      <div className="host-container">
        <h3 className="project-link">
          Live at
          <a href={url}>{url}</a>
        </h3>
        <Iframe
          ariaHidden
          className="host"
          url={url}
          width="100%"
          height="100%"
        />
      </div>
    );
  }
  return <p>Bad project link!</p>;
}
