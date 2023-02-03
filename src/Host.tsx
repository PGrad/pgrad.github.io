import Iframe from 'react-iframe';
import { useParams } from 'react-router-dom';
import "./Host.css";

export default function Host() {
    const { project } = useParams();
    return (
        <Iframe className="host" url={`https://pgrad.github.io/${project!}`} width="100%" height='100%' />
    )
}