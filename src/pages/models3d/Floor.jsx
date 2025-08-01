import { useTexture } from "@react-three/drei";
import { useMemo } from "react";

const Floor = () => {
    const PATH = useMemo(() => "/Textures/floor/bamboo-wood-semigloss-", []);

    const floorTexture = useTexture({
        map: `${PATH}albedo.png`,
        normalMap: `${PATH}normal.png`,
        roughnessMap: `${PATH}roughness.png`,
        aoMap: `${PATH}ao.png`,
        metalnessMap: `${PATH}metal.png`,
    });

    return (
        <mesh rotation-x={-Math.PI / 2} position-y={-0.02}  receiveShadow={true}>
            <boxGeometry args={[0.09, 0.09,0.01]} />
            <meshStandardMaterial roughness={0.8}metalness={1}{...floorTexture} />
        </mesh>
    );
};

export default Floor;