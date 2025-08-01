import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Heart4afa = () => {
    const heartModel = useGLTF('/models-3d/heart4afa.glb');
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

export default Heart4afa;

useGLTF.preload('/models/heart4afa.glb');