import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

const Lights = () => {

    const directionalLightRef = useRef();
    //useHelper(directionalLightRef, DirectionalLightHelper);

    return (

        <>

            <directionalLight ref={directionalLightRef}
shadow-mapSize-width={5000}
shadow-mapSize-height={5000}

              shadow-camera-near={1}
              shadow-camera-far={2000}
              shadow-camera-left={-5}
              shadow-camera-right={5}
              
              shadow-camera-top={5}
              shadow-camera-bottom={-5}
            color={"yellow"} position={[0, 1, 1]} intensity={10} castShadow={true} />

        </>

    )
}
export default Lights;