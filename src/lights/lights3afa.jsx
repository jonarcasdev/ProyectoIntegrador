import { useRef } from "react";

const Lights2afa = () => {
    const directionalLightRef = useRef();

    return (
        <>
            <directionalLight 
                ref={directionalLightRef}
                shadow-mapSize={[2048, 2048]}
                shadow-camera-near={1}
                shadow-camera-far={100}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                color={"#FFD580"} // warm, soft afternoon color
                position={[10, 5, -10]} // lower angle, softer shadows
                intensity={1.2} // softer intensity
                castShadow={true}
            />
        </>
    );
}
export default Lights2afa;
