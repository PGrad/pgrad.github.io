import "./Work.css"

interface Image {
    src: string;
    alt: string;
    description: string[];
}

interface ProjectProps {
    title: string;
    dates: string;
    images: Image[];
    description: string;
}

const projects: ProjectProps[] = [
    {
        title: "AutoCAD Trace and Markup",
        dates: "June 2018 - September 2022",
        images: [
            {
                src: "./AutoCAD/Trace_Palette.png",
                alt: "Trace Palette",
                description: [
                    "The Trace palette for AutoCAD desktop built in React.",
                    `Users first create a trace with the Create Trace button at top left.
                    Each trace shows the avatars of collaborators, the trace name,
                    and date of last modification.`,
                    `When hovering over a trace, you can see a tooltip with additional
                    information. Image credit to CADnotes.`
                ]
            },
            {
                src: "./AutoCAD/Markup_Assist.png",
                alt: "Markup Assist Dialog",
                description: [
                    `I was responsible for the Markup Assist dialogs at bottom right.
                    The Trace visor is at top left, created by my former colleague Megan Mahoney.`,
                    `The purpose of the feature is to help a user convert an object in an
                    image (recognized by our AWS Sagemaker-based object detection
                    model which I also worked on) into an AutoCAD object.`,
                    `You are looking at one of the 3 dialogs I made. The dialog
                    follows Autodesk HIG (now Weave) design standards for icons,
                    fonts, theming, and dimensions. Image credit to CADnotes.`
                ]
            }
        ],
        description:
            `The AutoCAD Trace palette was shipped in AutoCAD 2022 
            and Markup Assist in 2023. Both features helped increase
            adoption of AutoCAD Web by Desktop users by 3% or several
            thousand users.`
    }
];

function Project(props: ProjectProps) {
    return (
        <section className="project-block">
            <h1 className="project-heading">{props.title}</h1>
            <p className="project-dates">{props.dates}</p>
            <p className="project-desc">{props.description}</p>
            <ul className="project-imgs">
                {props.images.map((img, idx) => (
                    <li className="img-block" key={idx}>
                        <img className="project-image" src={img.src} alt={img.alt} />
                        <div className="img-description">
                            {img.description.map((desc, idx) => (
                                <p key={idx} className="img-paragraph">{desc}</p>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function Work() {
    return (
        <section className="work">
            {projects.map((project, idx) =>
                <Project
                    key={idx}
                    title={project.title}
                    dates={project.dates}
                    images={project.images}
                    description={project.description}
                />
            )}
        </section>
    );
}