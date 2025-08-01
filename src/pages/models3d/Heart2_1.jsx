import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Heart2_1 = (props) => {
  const { scene } = useGLTF('/models-3d/Heart2_1.glb');
  const heartRef = useRef();
  const baseScale = 0.9;

  useEffect(() => {
    // Mejorar materiales (brillo y detalle)
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.metalness = 0.4;
        child.material.roughness = 0.3;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (heartRef.current) {
      const t = performance.now() * 0.002;
      const scale = 1 + Math.sin(t) * 0.08;
      heartRef.current.scale.setScalar(baseScale * scale);
      heartRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} ref={heartRef} />
    </group>
  );
};

useGLTF.preload('/models-3d/Heart2_1.glb');
export default Heart2_1;
