import { useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import "./homepage.css";
import * as THREE from "three";
import { useMediaQuery } from "@mui/material";

function Avatar() {
    return (
        <div className="avatar">
            <img className="avatarImg" src="Air_and_Space.jpg" alt="my profile pic" />
        </div>
    );
}

export default function Homepage() {
    const isDesktop: boolean = useMediaQuery("(min-width: 800px)");
    useEffect(() => {
        if (document.getElementsByClassName("canvas").length > 0)
            return; // So strict mode doesn't add the canvas twice.

        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        const geometry = new THREE.SphereGeometry(isDesktop ? 10 : 7, 32, 16);
        const loader = new THREE.TextureLoader();

        const fr = isDesktop ? .3 : 1;
        renderer.setSize( 
            Math.round(window.innerWidth * fr),
            Math.round(window.innerHeight * fr)
        );
        renderer.domElement.className = "canvas fade-in";
        const homepage = document.getElementById("homepage-main")!;
        homepage.appendChild( renderer.domElement );

        let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

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

        const animate = () => {
            requestAnimationFrame( animate );

            if (sphere) {
                sphere.rotation.z = Math.PI / 5;
                sphere.rotation.y += 0.001;
            }

            renderer.render( scene, camera );
        };

        animate();
    }, [isDesktop]);
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