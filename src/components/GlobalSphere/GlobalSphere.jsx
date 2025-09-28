import Globe from "globe.gl";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import "./GlobalSphere.css";

export default function GlobalSphere() {
  const globeRef = useRef();

  useEffect(() => {
    const initGlobe = async () => {
      const globeImage = await import("/assets/earth-day.jpg");
      const bumpImage = await import("/assets/earth-topology.png");

      const globe = Globe({ rendererConfig: { alpha: true, antialias: true } })(globeRef.current)
        .globeImageUrl(globeImage.default)
        .bumpImageUrl(bumpImage.default);

      globe.width([globeRef.current.clientWidth]);
      globe.height([globeRef.current.clientHeight]);

      const scene = globe.scene();
      const renderer = globe.renderer();
      scene.background = null;
      renderer.setClearColor(0x000000, 0);
      renderer.setClearAlpha(0);

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
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

      const handleResize = () => {
        if (globeRef.current) {
          globe.width([globeRef.current.clientWidth]);
          globe.height([globeRef.current.clientHeight]);
        }
      };
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    };

    initGlobe();

    return () => {
      if (globeRef.current) globeRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={globeRef} className="w-full h-[500px] globe-container" />;
}
