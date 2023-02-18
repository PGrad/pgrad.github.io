import { useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import "./homepage.css";
import * as THREE from "three";

function Avatar() {
    return (
        <div className="avatar">
            <img className="avatarImg" src="Air_and_Space.jpg" alt="my profile pic" />
        </div>
    );
}

export default function Homepage() {
    let renderer = new THREE.WebGLRenderer();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        renderer.setSize( Math.round(window.innerWidth * .3), Math.round(window.innerHeight * .3) );
        renderer.domElement.className = "canvas fade-in";
        const homepage = document.getElementById("homepage-main")!;
        homepage.appendChild( renderer.domElement );

        const geometry = new THREE.SphereGeometry(10, 32, 16);
        let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

        const loader = new THREE.TextureLoader();

        let sphere: THREE.Mesh | null = null;
        loader.load("./mars_texture.png",
            (texture) => {
                material = new THREE.MeshBasicMaterial({
                    map: texture
                });
                sphere = new THREE.Mesh( geometry, material );
                scene.add( sphere );
            });

        camera.position.z = 20;

        let animate = () => {
            requestAnimationFrame( animate );

            if (sphere) {
                sphere.rotation.z = Math.PI / 5;
                sphere.rotation.y += 0.001;
            }

            renderer.render( scene, camera );
        };

        animate();
    }, [])
    return (
        <main id="homepage-main" >
            <section className="homepage">
                <Avatar />
                <section className="intro">
                    <div className="flavor-text">
                        <p>Frontend Web Developer based out of Oakland, CA.</p>
                        <p>Interested in AI, languages, books, and cats.</p>
                    </div>
                    <a className="resume fade-in" href="https://bit.ly/3Z0H3PK">Resumé</a>
                    <div className="socials fade-in">
                        <SocialIcon className="icon" fgColor="white" url="https://github.com/PGrad" />
                        <SocialIcon className="icon" fgColor="white" url="https://www.linkedin.com/in/paulgrad3/" />
                    </div>
                </section>
            </section>
        </main>
    )
}