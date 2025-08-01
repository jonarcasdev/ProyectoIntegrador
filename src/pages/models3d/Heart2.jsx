import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Heart2 = () => {
    const heartModel = useGLTF('/models-3d/heart2.glb');
    const heartRef = useRef();

    // Rotate the model on each frame
    useFrame(() => {
        if (heartRef.current) {
            heartRef.current.rotation.y += 0.01; // Adjust the speed of rotation here
        }
    });

    return (
        <mesh ref={heartRef}>
            <primitive object={heartModel.scene} />
        </mesh>
    );
};

export default Heart2;

useGLTF.preload('/models/heart2.glb');