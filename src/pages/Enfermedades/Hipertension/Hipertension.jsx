import "./Hipertension.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import Heart2 from "../../models3d/Heart2";
import Heart2afa from "../../models3d/Heart2afa";
import Heart3afa from "../../models3d/Heart3afa";
import Lights2 from "../../../lights/lights2";
import Lights2afa from "../../../lights/lights2afa";
import Title1 from "../../../texts/Title1";
import Staging1 from "../../../staging/Staging1"; // Import the staging component
import Staging2 from "../../../staging/Staging2"; // Import the staging component

const Hipertension = () => {
    // Referencia para la sección a la que se desplazará
    const leerMas = useRef(null);

    // Estado para manejar la visibilidad del mensaje
    const [mensajeVisible, setMensajeVisible] = useState(true);

    // Función para manejar el scroll
    const handleScroll = () => {
        leerMas.current.scrollIntoView({ behavior: "smooth" });
    };

    // Función para manejar el clic en el canvas
    const manejarClick = () => {
        if (mensajeVisible) {
            setMensajeVisible(false);
        }
    };
    
    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            {/* Mensaje superpuesto */}
            {mensajeVisible && (
                <div
                    style={{
                        position: "absolute",
                        top: "270px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        zIndex: 10,
                    }}
                >
                    
                    *Manten click izquiero para rotar la camara <br/>
                    *Rueda del raton para acercar o alejar <br/>
                    Haz clic para interactuar
                </div>
            )}
            <h1> Hipertension </h1>
            
            <Canvas
                camera={{ position: [2, 0, 5] }}
                style={{ height: "420px" }} // Adjust the height here
                onClick={manejarClick}
            >
                <Lights2 />
                <OrbitControls enableZoom={true} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 10]} intensity={1} />

                
                <mesh>
                    <Staging2 />
                    <Heart2 />
                    
                    
                </mesh>
               
            </Canvas>

            {/* Sección a la que se desplazará */}
            <div className="cuadroHiper" ref={leerMas}>
                <div className="cardHiper">
                    <h2>Causas </h2>
                    <p style={{ textAlign: "justify" }}>
                        La hipertensión arterial, o presión arterial alta,
                        puede ser causada por una combinación de factores genéticos,
                        estilo de vida y condiciones subyacentes. Factores de riesgo que
                        contribuyen a la hipertensión incluyen antecedentes familiares, obesidad,
                        falta de actividad física, dieta alta en sal y baja en potasio, consumo de
                        alcohol y tabaco, entre otros. En algunos casos, la hipertensión es secundaria
                        a otras enfermedades o condiciones, como problemas renales o endocrinos.
                    </p>
                </div>
            </div>

            <Canvas
                camera={{ position: [2, 0, 5] }}
                style={{ height: "420px" }} // Adjust the height here
                onClick={manejarClick}
            >
                <Lights2afa />
                <OrbitControls enableZoom={true} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 10]} intensity={1} />
                <mesh>
                    <Title1 title="Arterias en Azul" />
                    <Staging1 />
                    <Heart2afa />
                </mesh>
            </Canvas>

            
            <div className="cuadroAzulHiper">
            <div className="cardHiper">
                    <h2>Sintomas  </h2>
                    <p style={{ textAlign: "justify" }}>
                    La mayoría de las personas con hipertensión arterial no experimentan 
                    síntomas evidentes. En algunos casos, la hipertensión puede causar síntomas 
                    como dolor de cabeza, mareos, dificultad para respirar o sangrado nasal. Sin embargo, 
                    estos síntomas suelen aparecer cuando la presión arterial es muy alta. 
                    </p>
                </div>


            </div>

            <Canvas
                camera={{ position: [2, 0, 5] }}
                style={{ height: "420px" }} // Adjust the height here
                onClick={manejarClick}
            >
                <Lights2 />
                <OrbitControls enableZoom={true} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 10]} intensity={1} />

                
                <mesh>
                    <Staging2 />
                    <Heart3afa />
                    
                    
                </mesh>
               
            </Canvas>

            

           


        </div>
    );
};

export default Hipertension;