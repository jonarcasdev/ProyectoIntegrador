import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Heart4 = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/Heart4.glb');
  const heartRef = useRef();

  const baseScale = 0.9;

  useEffect(() => {
    // Aumentar brillo del material
    if (materials['Material.001']) {
      materials['Material.001'].metalness = 0.4;
      materials['Material.001'].roughness = 0.3;
    }
  }, [materials]);

  useFrame(() => {
    const t = performance.now() * 0.002;
    const scaleValue = 1 + Math.sin(t) * 0.1;
    if (heartRef.current) {
      heartRef.current.scale.setScalar(baseScale * scaleValue);
      heartRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={heartRef}>
        <mesh
          name="Heart4"
          castShadow
          receiveShadow
          geometry={nodes.Heart4.geometry}
          material={materials['Material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/models-3d/Heart4.glb');
export default Heart4;
