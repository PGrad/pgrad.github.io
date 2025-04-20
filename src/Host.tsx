import "./Host.css";
import { Project } from "./types";

// Iframes can't be explored by screen
// readers, so it's best to hide them.

type HostParams = {
  project: Project;
};

type ProjectImg = {
  name: string;
  src: string;
  alt: string;
};

const projectImgs: ProjectImg[] = [
  {
    name: "Hidden Gems",
    src: "thundercat.png",
    alt: "Hidden Gems",
  },
  {
    name: "AI Teacher",
    src: "AI_Teacher.png",
    alt: "AI Teacher",
  },
  {
    name: "Wolfie's Escape",
    src: "wolfie.png",
    alt: "Wolfie's Escape",
  },
  {
    name: "3D Raymarching",
    src: "CS114.png",
    alt: "3D Raymarching",
  },
];

// If a disabled user wants to access
// the project, they can click on the link.
export default function Host({ project }: HostParams) {
  const url = project.external ? project.link : `https://pgrad.github.io/${project.link}`;
  const img = projectImgs.find((img) => img.name === project.name);

  if (project && img) {
    return (
      <div
        className="host-container"
        style={{ width: 'fit-content', borderRadius: '10px', overflow: 'hidden' }}
      >
        <h3 className="project-link">
          Live at&nbsp;
          <a href={url}>{url}</a>
        </h3>
        <img src={img.src} style={{ width: 'min(512px, 100vw)' }} alt={img.alt} />
      </div>
    );
  }
  return <p>Bad project link!</p>;
}
