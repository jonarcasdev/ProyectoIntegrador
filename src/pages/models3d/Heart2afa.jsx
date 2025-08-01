import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Heart2afa = () => {
    const heartModel = useGLTF('/models-3d/heart2afa.glb');
    const heartRef = useRef();

    // Rotate the model on each frame
    useFrame(() => {
        if (heartRef.current) {
            heartRef.current.rotation.y -= 0.01; // Rotates in the opposite direction
        }
    });

    return (
        <mesh ref={heartRef}>
            <primitive object={heartModel.scene} />
        </mesh>
    );
};

export default Heart2afa;

useGLTF.preload('/models/heart2afa.glb');