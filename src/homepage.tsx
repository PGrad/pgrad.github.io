import { useEffect, useState } from "react";
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
    let [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
    	let timeout: number | null = null;

	// Debounce the resize event so it's
	// not flickering like crazy.
	const onresize = () => {
		if (timeout)
		window.clearTimeout(timeout!);

		timeout = window.setTimeout(() => {
		setDimensions({
			width: window.innerWidth,
			height: window.innerHeight
		});
		window.clearTimeout(timeout!);
		timeout = null;
		}, 50);
	};

        // If first time called.
	if (dimensions.width === 0) {
            onresize();
            return;
        }

        const homepage = document.getElementById("homepage-main")!;
        const canvas = document.getElementById("canvas");
        if (canvas) {
            homepage.removeChild(canvas);
        }

        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        const geometry = new THREE.SphereGeometry(10, 32, 16);
        const loader = new THREE.TextureLoader();

        renderer.setSize( 
            Math.round(dimensions.width),
            Math.round(dimensions.height)
        );
        renderer.domElement.id = "canvas";
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

        window.addEventListener("resize", onresize);

        return () => window.removeEventListener("resize", onresize);
    }, [dimensions]);
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
