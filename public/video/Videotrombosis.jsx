import { Html } from '@react-three/drei';

const VideoMesh = () => {
    return (
        <mesh position={[0, -0.5, 0]}>
            <meshStandardMaterial color="black" />

            <Html
                transform
                distanceFactor={2}
                position={[2.5, 0, 0.01]} // Ligeramente adelante del plano
            >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/lsd7zq9xBCU?si=w30EiG-ve5ZKGRu7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </Html>
        </mesh>
    );
};

export default VideoMesh;