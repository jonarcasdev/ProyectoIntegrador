// src/pages/Enfermedades/LuisVid.jsx

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useVideoTexture } from "@react-three/drei";

const VideoPlane = () => {
  const texture = useVideoTexture("/videos/luisvid.mp4", {
    muted: true,
    loop: true,
    autoplay: true,
    crossOrigin: "anonymous",
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[4, 2.25]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

const LuisVid = () => {
  return (
    <section style={{ marginTop: "4rem" }}>
      <h3 style={{ textAlign: "center", color: "#1d3557" }}>Animación 3D del Video</h3>
      <div style={{ width: "100%", maxWidth: "720px", height: "400px", margin: "2rem auto", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 16px rgba(0,0,0,0.3)" }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          <Stars radius={80} depth={50} count={5000} factor={4} fade />
          <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
          <VideoPlane />
        </Canvas>
      </div>
    </section>
  );
};

export default LuisVid;
