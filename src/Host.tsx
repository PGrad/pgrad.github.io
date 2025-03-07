import Iframe from "react-iframe";
import "./Host.css";
import { Project } from "./types";

// Iframes can't be explored by screen
// readers, so it's best to hide them.

type HostParams = {
  project: Project;
};

// If a disabled user wants to access
// the project, they can click on the link.
export default function Host({ project }: HostParams) {
  if (project) {
    const url = project.external ? project.link : `https://pgrad.github.io/${project.link}`;
    return (
      <div className="host-container" style={project.name === 'Hidden Gems' ? {} : { height: '100vh' }}>
        <h3 className="project-link">
          Live at&nbsp;
          <a href={url}>{url}</a>
        </h3>
        {/* Spotify doesn't play nice with iframes, so don't bother. */}
        {project.name === 'Hidden Gems' ?
          <img src="thundercat.png" style={{ width: 'fit-content', maxWidth: '100%' }} alt="Hidden Gems" /> :
          <Iframe
            ariaHidden
            className="host"
            url={url}
            width="100%"
            height="100%"
          />
        }
      </div>
    );
  }
  return <p>Bad project link!</p>;
}
