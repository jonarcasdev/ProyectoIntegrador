import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Heart4 = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/Heart4.glb');
  const heartRef = useRef();

  // Escala base del modelo
  const baseScale = [3, 3, 3];  // Mantén el tamaño original del modelo

  // Función para animar el palpito
  useFrame(() => {
    // Cambio de escala para simular un latido
    const time = performance.now() * 0.002;  // Controla la velocidad de la animación
    const scaleValue = 1 + Math.sin(time) * 0.1;  // Aumenta o disminuye la escala para simular el latido
    
    // Aplica la escala original más la animación del palpito
    heartRef.current.scale.set(
      baseScale[0] * scaleValue, 
      baseScale[1] * scaleValue, 
      baseScale[2] * scaleValue
    );
  });

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Heart4"
          castShadow
          receiveShadow
          geometry={nodes.Heart4.geometry}
          material={materials['Material.001']}
          rotation={[Math.PI / 2, 0, 0]}
          ref={heartRef}  // Referencia al modelo para aplicar la animación
        />
      </group>
    </group>
  );
};

export default Heart4;

useGLTF.preload('/models-3d/Heart4.glb');
