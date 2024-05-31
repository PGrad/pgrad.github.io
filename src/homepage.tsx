import { useEffect, useState } from "react";
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

type VoidFunc = () => void;
export default function Homepage() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const useDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const isMobile = useMediaQuery("(max-width: 800px)");

  useEffect((): VoidFunc => {
    let timeout: number | null = null;
    // airbnb apparently does this.
    let listening = false;
    // Debounce the resize event so it's
    // not flickering like crazy.
    const onresize = () => {
      if (timeout) window.clearTimeout(timeout);

      const scaleFactor = isMobile ? 1 : 0.8;

      timeout = window.setTimeout(() => {
        setDimensions({
          width: window.innerWidth * scaleFactor,
          height: window.innerHeight * scaleFactor,
        });

        if (timeout) {
          window.clearTimeout(timeout);
          timeout = null;
        }
      }, 100);
    };

    const unmount: VoidFunc = () => {
      if (listening) {
        window.removeEventListener("resize", onresize);
      }
    };

    // If first time called.
    if (dimensions.width === 0) {
      onresize();
      return unmount;
    }

    const homepage = document.getElementById("homepage-main");
    if (!homepage) return unmount;
    const canvas = document.getElementById("canvas");
    if (canvas) {
      homepage.removeChild(canvas);
    }

    const scene = new THREE.Scene();
    scene.background = null;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const geometry = new THREE.SphereGeometry(10, 32, 16);
    const loader = new THREE.TextureLoader();

    renderer.setSize(
      Math.round(dimensions.width),
      Math.round(dimensions.height)
    );
    renderer.domElement.id = "canvas";
    homepage.appendChild(renderer.domElement);

    let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    let sphere: THREE.Mesh | null = null;
    loader.load(
      useDarkTheme
        ? // Credit to NASA
          "./mars_texture.png"
        : "./moon_texture.jpg",
      (texture) => {
        material = new THREE.MeshBasicMaterial({
          map: texture,
        });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      }
    );

    camera.position.z = 20;

    const animate = () => {
      requestAnimationFrame(animate);

      if (sphere) {
        sphere.rotation.z = Math.PI / 5;
        sphere.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener("resize", onresize);
    listening = true;

    return unmount;
  }, [dimensions, useDarkTheme]);
  return (
    <main id="homepage-main">
      <section className="homepage">
        <div className="avatar-card">
          <Avatar />
          <div className="socials fade-in">
            <SocialIcon
              className="icon"
              fgColor="white"
              url="https://github.com/PGrad"
            />
            <SocialIcon
              className="icon"
              fgColor="white"
              url="https://www.linkedin.com/in/paulgrad3/"
            />
          </div>
        </div>
        <section className="intro">
          <div className="flavor-text">
            <p>Frontend Web Developer based out of Oakland, CA.</p>
            <p>Interested in UI design, languages, space, and cats.</p>
          </div>
          <a className="resume fade-in" href="https://bit.ly/3Z0H3PK">
            Resumé
          </a>
        </section>
      </section>
    </main>
  );
}
