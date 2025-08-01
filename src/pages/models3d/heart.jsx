import {useFrame} from "@react-three/fiber";
import { useEffect, useRef } from "react";

const Heart = () => {
    const houseRef=useRef();
    useFrame((state,delta)=>{
        houseRef.current.rotation.y +=1*delta;
    })
    useEffect(() => {
        console.log(houseRef.current);
    }, [houseRef]);

    return (
        <group ref={houseRef}>
            <mesh position={[0, 1, 0]} rotation={[0, Math.PI * 0.25, 0]} scale={1.5}>
                <coneGeometry args={[1, 1, 4]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="purple" />
            </mesh>
        </group>
    );
};

export default Heart;