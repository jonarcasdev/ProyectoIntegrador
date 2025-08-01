import { Html } from "@react-three/drei";

const Title1 = ({ title }) => {
    return (
        <Html
            occlude
            center
            position={[0, 2, 0]}
            distanceFactor={5}
            wrapperClass="title1"
            rotation={[0, 0, 0]} // Asegura que esté horizontal
        >
            <h1>{title}</h1>
        </Html>
    );
};

export default Title1;
