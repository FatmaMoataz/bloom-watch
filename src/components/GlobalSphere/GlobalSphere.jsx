import Globe from "globe.gl";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import "./GlobalSphere.css";

export default function GlobalSphere() {
  const globeRef = useRef();

  useEffect(() => {
    const globe = Globe({ rendererConfig: { alpha: true, antialias: true } })(
      globeRef.current
    )
      .globeImageUrl("/assets/earth-day.jpg")
      .bumpImageUrl("/assets/earth-topology.png");

    globe.width([globeRef.current.clientWidth]);
    globe.height([globeRef.current.clientHeight]);

    // Get Three.js objects
    const scene = globe.scene();
    const renderer = globe.renderer();

    scene.background = null;
    renderer.setClearColor(0x000000, 0);
    renderer.setClearAlpha(0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    globe
      .pointsData([{ lat: 30.0444, lng: 31.2357, size: 1, color: "red" }])
      .pointLat("lat")
      .pointLng("lng")
      .pointColor("color")
      .pointAltitude(0.02)
      .pointRadius("size");

    setTimeout(() => {
      globe.width([globeRef.current.clientWidth]);
      globe.height([globeRef.current.clientHeight]);
    }, 100);

    const handleResize = () => {
      if (globeRef.current) {
        globe.width([globeRef.current.clientWidth]);
        globe.height([globeRef.current.clientHeight]);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (globeRef.current) {
        globeRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <div
        ref={globeRef}
        className="w-full h-full globe-container relative z-10"
      />
    </div>
  );
}
