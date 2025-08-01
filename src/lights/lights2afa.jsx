import { useHelper } from "@react-three/drei";
import { useRef } from "react";


const Lights2afa = () => {

    const directionalLightRef = useRef();

    return (

        <>

            <directionalLight 
              ref={directionalLightRef}
              shadow-mapSize={[5000, 5000]} 

              shadow-camera-near={1}
              shadow-camera-far={2000}
              shadow-camera-left={-5}
              shadow-camera-right={5}
              
              shadow-camera-top={-5}
              shadow-camera-bottom={5}

              color={"yellow"} 
              position={[0, 10, 10]} // Adjusted position to be farther
              intensity={2} 
              castShadow={true} 
            />

        </>

    )
}
export default Lights2afa;