import Iframe from 'react-iframe';
import { useParams } from 'react-router-dom';

export default function Host() {
    const { project } = useParams();
    console.log(project)
    return (
        <Iframe url={`https://pgrad.github.io/${project!}/`} width="100%" height='100%' />
    )
}