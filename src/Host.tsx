import Iframe from 'react-iframe';
import { useParams } from 'react-router-dom';
import "./Host.css";

export default function Host() {
    const { project } = useParams();
    if (project) {
        const url = `https://pgrad.github.io/${project}`;
        return (
            <div className='host-container'>
                <h3 className='project-link'>Live at <a href={url}>{url}</a></h3>
                <Iframe className="host" url={url} width="100%" height='100%' />
            </div>
        );
    } else
        return (<p>Bad project link!</p>)
}