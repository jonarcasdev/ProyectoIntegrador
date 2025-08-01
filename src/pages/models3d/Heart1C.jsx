import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Heart1C = (props) => {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/models-3d/Heart.glb");
    const { actions } = useAnimations(animations, group);

    // Inicia la animación al montar el componente
    useEffect(() => {
        if (actions) {
            // Reproduce todas las animaciones disponibles
            Object.values(actions).forEach((action) => action.play());
        }
    }, [actions]);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <mesh
                    name="Heart"
                    receiveShadow={true}
                    castShadow={true}
                    geometry={nodes.Heart.geometry}
                    material={materials.HeartMaterial}
                    rotation={[1.728, 0, 0]}
                    scale={500}
                />
            </group>
        </group>
    );
};

export default Heart1C;

useGLTF.preload("/models-3d/Heart.glb");