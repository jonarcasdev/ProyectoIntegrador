import { Stars } from '@react-three/drei';

// Componente de ambiente simple para el segundo canvas
const SimpleEnvironment = () => {
    return (
        <group>
            {/* Cielo estrellado básico */}
            <Stars
                radius={30}
                depth={20}
                count={80}
                factor={1}
                saturation={0.5}
                fade
                speed={0.2}
            />
            
            {/* Luz ambiental azul suave */}
            <ambientLight intensity={0.4} color="#4a90e2" />
            
            {/* Luz direccional con un toque cálido */}
            <directionalLight
                position={[8, 8, 5]}
                intensity={1.2}
                color="#ffffff"
                castShadow
            />
            
            {/* Luz puntual de acento */}
            <pointLight
                position={[-5, -5, -3]}
                intensity={0.6}
                color="#ff8a80"
                distance={25}
            />
        </group>
    );
};

export default SimpleEnvironment;
