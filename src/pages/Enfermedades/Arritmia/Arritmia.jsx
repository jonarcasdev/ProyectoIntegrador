import "./Arritmia.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import Heart4 from "../../models3d/Heart4";

const Arritmia = () => {
    const leerMas = useRef(null);
    const [mensajeVisible, setMensajeVisible] = useState(true);

    const handleScroll = () => {
        leerMas.current.scrollIntoView({ behavior: "smooth" });
    };

    const manejarClick = () => {
        if (mensajeVisible) {
            setMensajeVisible(false);
        }
    };

    return (
        <div className="arritmia-container">
            {mensajeVisible && (
                <div className="arritmia-info">
                    *Mantén clic izquierdo para rotar la cámara <br />
                    *Rueda del ratón para acercar o alejar <br />
                    Haz clic para interactuar
                </div>
            )}

            <h1 className="arritmia-title">Arritmia</h1>
            <Canvas
                camera={{ position: [2, 0, 5] }}
                style={{ height: "420px" }}
                onClick={manejarClick}
            >
                <OrbitControls enableZoom={true} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 10]} intensity={1} />
                <mesh>
                    <Heart4 />
                </mesh>
            </Canvas>

            <div className="arritmia-cuadro" ref={leerMas}>
                <div className="arritmia-card">
                    <h2>Causas</h2>
                    <p style={{ textAlign: "justify" }}>
                        Las arritmias pueden ser causadas por diversas condiciones,
                        como enfermedad cardíaca, desequilibrios electrolíticos, cambios en el músculo cardíaco,
                        lesiones por un infarto, estrés o consumo excesivo de sustancias como cafeína,
                        nicotina, alcohol o drogas. Algunas arritmias pueden ser hereditarias o presentarse sin causa aparente.
                    </p>
                </div>
            </div>
            <div className="arritmia-cuadro-azul">
                <div className="arritmia-card">
                    <h2>Síntomas</h2>
                    <p style={{ textAlign: "justify" }}>
                        Los síntomas de una arritmia pueden incluir palpitaciones,
                        latidos acelerados o irregulares, sensación de aleteo en el pecho,
                        mareo, debilidad, fatiga, desmayos o dolor en el pecho. Algunas arritmias pueden ser asintomáticas
                        y detectarse solo durante exámenes médicos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Arritmia;
