import "./Trombosis.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, KeyboardControls, Environment } from "@react-three/drei";

import VideoMesh from "../../videos/Videotrombosis.jsx";
import Heart1 from "../../models3d/Heart1";
import Heart1C from "../../models3d/Heart1C";
import { useRef, useState } from "react";
import Lights from "../../../lights/lights";
import SimpleEnvironment from "../../../lights/SimpleEnvironment";
import { Text3D } from '@react-three/drei'
import Tittle from '../../Text/Tittle.jsx'

// Componentes de iluminación específicos para cada canvas
const SoftLighting = () => (
    <>
        <ambientLight intensity={0.8} color="#ffffff" />
        <directionalLight position={[3, 3, 5]} intensity={1.2} color="#ffffff" castShadow />
        <pointLight position={[-2, 2, 2]} intensity={0.6} color="#e8f4fd" />
        <spotLight position={[0, 5, 0]} intensity={0.4} angle={0.3} penumbra={1} castShadow />
    </>
);

const HardLighting = () => (
    <>
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight position={[5, 5, 10]} intensity={3} color="#ffffff" castShadow />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#ffffff" />
    </>
);

const WarmLighting = () => (
    <>
        <ambientLight intensity={0.6} color="#fff8e1" />
        <directionalLight position={[2, 4, 3]} intensity={1.8} color="#ffcc80" castShadow />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#ff8a65" />
        <spotLight position={[0, 6, 0]} intensity={0.6} angle={0.4} penumbra={0.8} color="#ffab91" castShadow />
    </>
);

const CoolLighting = () => (
    <>
        <ambientLight intensity={0.4} color="#e3f2fd" />
        <directionalLight position={[4, 6, 8]} intensity={2.5} color="#81d4fa" castShadow />
        <pointLight position={[-2, 3, 4]} intensity={1} color="#4fc3f7" />
        <spotLight position={[0, 8, 0]} intensity={0.8} angle={0.2} penumbra={0.3} color="#29b6f6" castShadow />
    </>
);

const Trombosis = () => {
    // Referencia para la sección a la que se desplazará
    const leerMas = useRef(null);

    // Estado para controlar la visibilidad de la interfaz de instrucciones
    const [showInstructions, setShowInstructions] = useState(false);

    // Estados para controlar las transformaciones del corazón
    const [heartScale, setHeartScale] = useState(1);
    const [heartRotation, setHeartRotation] = useState(0);
    const [showHeartInfo, setShowHeartInfo] = useState(false);


    // Estados para el segundo canvas
    const [showInstructions2, setShowInstructions2] = useState(false);
    const [heartScale2, setHeartScale2] = useState(1);
    const [heartRotation2, setHeartRotation2] = useState(0);
    const [showHeartInfo2, setShowHeartInfo2] = useState(false);

    // Estados para el tercer canvas
    const [showInstructions3, setShowInstructions3] = useState(false);
    const [heartScale3, setHeartScale3] = useState(1);
    const [heartRotation3, setHeartRotation3] = useState(0);
    const [showHeartInfo3, setShowHeartInfo3] = useState(false);

    // Estados para el cuarto canvas
    const [showInstructions4, setShowInstructions4] = useState(false);
    const [heartScale4, setHeartScale4] = useState(1);
    const [heartRotation4, setHeartRotation4] = useState(0);
    const [showHeartInfo4, setShowHeartInfo4] = useState(false);

    // Función para manejar el scroll
    const handleScroll = () => {
        leerMas.current.scrollIntoView({ behavior: "smooth" });
    };



    // Configuración de controles de teclado WASD
    const keyboardMap = [
        { name: "forward", keys: ["KeyW"] },
        { name: "backward", keys: ["KeyS"] },
        { name: "left", keys: ["KeyA"] },
        { name: "right", keys: ["KeyD"] },
    ];

    // Función para manejar eventos de teclado
    const handleKeyPress = (event) => {
        switch (event.code) {
            case "KeyW":
                setHeartRotation(prev => prev + 0.2);
                break;
            case "KeyS":
                setHeartRotation(prev => prev - 0.2);
                break;
            case "KeyA":
                setHeartScale(prev => Math.max(0.5, prev - 0.1));
                break;
            case "KeyD":
                setHeartScale(prev => Math.min(2, prev + 0.1));
                break;
            default:
                break;
        }
    };

    // Función para manejar eventos de teclado del segundo canvas
    const handleKeyPress2 = (event) => {
        switch (event.code) {
            case "KeyW":
                setHeartRotation2(prev => prev + 0.2);
                break;
            case "KeyS":
                setHeartRotation2(prev => prev - 0.2);
                break;
            case "KeyA":
                setHeartScale2(prev => Math.max(0.5, prev - 0.1));
                break;
            case "KeyD":
                setHeartScale2(prev => Math.min(2, prev + 0.1));
                break;
            default:
                break;
        }
    };

    // Función para manejar eventos de teclado del tercer canvas
    const handleKeyPress3 = (event) => {
        switch (event.code) {
            case "KeyW":
                setHeartRotation3(prev => prev + 0.2);
                break;
            case "KeyS":
                setHeartRotation3(prev => prev - 0.2);
                break;
            case "KeyA":
                setHeartScale3(prev => Math.max(0.5, prev - 0.1));
                break;
            case "KeyD":
                setHeartScale3(prev => Math.min(2, prev + 0.1));
                break;
            default:
                break;
        }
    };

    // Función para manejar eventos de teclado del cuarto canvas
    const handleKeyPress4 = (event) => {
        switch (event.code) {
            case "KeyW":
                setHeartRotation4(prev => prev + 0.2);
                break;
            case "KeyS":
                setHeartRotation4(prev => prev - 0.2);
                break;
            case "KeyA":
                setHeartScale4(prev => Math.max(0.5, prev - 0.1));
                break;
            case "KeyD":
                setHeartScale4(prev => Math.min(2, prev + 0.1));
                break;
            default:
                break;
        }
    };


    return (
        <div onKeyDown={handleKeyPress} tabIndex={0} style={{ outline: 'none' }}>


            <div className="canvas-container">
                {/* Botones centrados */}
                <div className="centered-controls">
                    <button
                        className="centered-btn"
                        onClick={() => setShowInstructions(!showInstructions)}
                    >
                        {showInstructions ? 'Ocultar Instrucciones' : 'Mostrar Instrucciones'}
                    </button>
                    <button
                        className="centered-btn"
                        onClick={() => setShowHeartInfo(!showHeartInfo)}
                    >
                        {showHeartInfo ? 'Ocultar Info Corazón' : 'Mostrar Info Corazón'}
                    </button>
                </div>

                {/* Interfaz de instrucciones superpuesta */}
                {showInstructions && (
                    <div className="instructions-overlay">
                        <div className="instructions-content">
                            <h3>🎮 Controles 3D:</h3>
                            <ul>
                                <li><strong>Click + Arrastrar:</strong> Girar cámara</li>
                                <li><strong>Rueda del Mouse:</strong> Zoom in/out</li>
                            </ul>
                            <h3>⌨️ Controles de Teclado (WASD):</h3>
                            <ul>
                                <li><strong>W:</strong> Rotar hacia arriba</li>
                                <li><strong>S:</strong> Rotar hacia abajo</li>
                                <li><strong>A:</strong> Reducir escala</li>
                                <li><strong>D:</strong> Aumentar escala</li>
                            </ul>

                        </div>
                    </div>
                )}

                {/* Información del corazón superpuesta */}
                {showHeartInfo && (
                    <div className="heart-info-overlay">
                        <div className="heart-info-content">
                            <h3>🫀 Canvas 1 - Básico</h3>
                            <p>Escala: {heartScale.toFixed(1)}x</p>
                            <p>Rotación: {heartRotation.toFixed(1)}°</p>
                            <p><strong>Iluminación:</strong> Suave mixta</p>
                            <p><strong>Sombras:</strong> Suaves</p>
                            <p><strong>Ambiente:</strong> Neutro claro</p>

                        </div>
                    </div>
                )}

                <KeyboardControls map={keyboardMap}>
                    <Canvas
                        shadows={{ type: "soft" }}
                        camera={{
                            position: [2, 0, 5],
                            fov: 1,
                        }}
                    >
                        <SoftLighting />
                        <OrbitControls />
                        <Text3D
                            position={[-0.015, 0.019, 0]}
                            font="/fonts/ConsolaMono.json"
                            size={0.0055}
                            height={0.003}
                            curveSegments={32}
                        >Corazón
                            <meshStandardMaterial color="black" />
                        </Text3D>


                        <Tittle tittle={"Por"} position={[-0.015, -0.020, 0]} />
                        <Tittle tittle={"Jonathan Arboleda"} position={[0.0099, -0.020, 0]} />

                        <group
                            scale={[heartScale, heartScale, heartScale]}
                            rotation={[heartRotation, heartRotation * 0.5, 0]}
                        >
                            <Heart1 />
                        </group>
                    </Canvas>
                </KeyboardControls>
            </div>

            <button className="scroll-button" onClick={handleScroll}>
                Leer más
            </button>
            {/* Sección a la que se desplazará */}
            <div className="cuadro2" ref={leerMas}>
                <div className="trombosis-container">
                    <section className="trombosis-section">
                        <h2 className="section-title">🧠 ¿Qué es?</h2>
                        <p className="section-content">
                            Es la formación de un coágulo dentro de una arteria del corazón, bloqueando parcial o totalmente el flujo sanguíneo al miocardio (músculo cardíaco). Generalmente ocurre en arterias ya afectadas por aterosclerosis (acumulación de placas de grasa).
                        </p>
                    </section>

                    <section className="trombosis-section">
                        <h2 className="section-title">⚠️ Causas</h2>
                        <p className="section-subtitle">Las causas más comunes incluyen:</p>
                        <ul className="causes-list">
                            <li><strong>Aterosclerosis:</strong> Placas de colesterol se acumulan en las arterias y pueden romperse, lo que activa la coagulación.</li>
                            <li><strong>Hipertensión arterial:</strong> Daña las paredes de las arterias, facilitando la formación de trombos.</li>
                            <li><strong>Colesterol alto y triglicéridos altos</strong></li>
                            <li><strong>Tabaquismo</strong></li>
                            <li><strong>Diabetes mellitus</strong></li>
                            <li><strong>Obesidad y sedentarismo</strong></li>
                            <li><strong>Estrés crónico</strong></li>
                            <li><strong>Factores genéticos</strong></li>
                        </ul>
                    </section>

                    <section className="trombosis-section">
                        <h2 className="section-title">🩺 Síntomas principales de la trombosis coronaria:</h2>

                        <div className="symptoms-container">
                            <div className="symptom-item">
                                <h3>Dolor en el pecho (angina):</h3>
                                <ul>
                                    <li>Dolor intenso, opresivo o punzante en el centro o lado izquierdo del pecho.</li>
                                    <li>Puede irradiarse al brazo izquierdo, mandíbula, cuello, espalda o estómago.</li>
                                    <li>Generalmente dura más de unos minutos o desaparece y vuelve.</li>
                                </ul>
                            </div>

                            <div className="symptom-item">
                                <h3>Dificultad para respirar (disnea):</h3>
                                <ul>
                                    <li>Sensación de no poder respirar bien, incluso en reposo.</li>
                                </ul>
                            </div>

                            <div className="symptom-item">
                                <h3>Sudoración excesiva (diaforesis):</h3>
                                <ul>
                                    <li>Sudor frío repentino y abundante, sin causa aparente.</li>
                                </ul>
                            </div>

                            <div className="symptom-item">
                                <h3>Náuseas o vómitos:</h3>
                                <ul>
                                    <li>Especialmente en mujeres o adultos mayores.</li>
                                </ul>
                            </div>

                            <div className="symptom-item">
                                <h3>Mareos o aturdimiento:</h3>
                                <ul>
                                    <li>Sensación de desmayo o pérdida del equilibrio.</li>
                                </ul>
                            </div>

                            <div className="symptom-item">
                                <h3>Otros síntomas:</h3>
                                <ul>
                                    <li>Palpitaciones o ritmo cardíaco irregular.</li>
                                    <li>Ansiedad o sensación de muerte inminente.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="warning-box">
                            <h3>⚠️ Importante:</h3>
                            <p>
                                <strong>Algunos pacientes, especialmente personas mayores o diabéticas, pueden presentar síntomas atípicos o incluso tener un infarto silencioso (sin dolor claro en el pecho).</strong>
                            </p>
                            <p>
                                <strong>La trombosis coronaria es una emergencia médica. Si se sospecha, se debe buscar atención inmediata.</strong>
                            </p>
                        </div>
                    </section>

                    <section className="trombosis-section">
                        <h2 className="section-title">🩺 Efectos en el cuerpo humano</h2>
                        <div className="effects-container">
                            <div className="effect-item">
                                <h3>Infarto agudo de miocardio (ataque al corazón)</h3>
                                <p>Si el trombo bloquea completamente una arteria, el tejido cardíaco que depende de ese flujo comienza a morir por falta de oxígeno.</p>
                            </div>

                            <div className="effect-item">
                                <h3>Dolor torácico intenso (angina de pecho o dolor de infarto)</h3>
                                <p>Sensación de opresión en el pecho, que puede irradiarse al brazo izquierdo, mandíbula o espalda.</p>
                            </div>

                            <div className="effect-item">
                                <h3>Arritmias</h3>
                                <p>El daño al tejido cardíaco puede alterar el ritmo normal del corazón, causando latidos irregulares o incluso paro cardíaco.</p>
                            </div>

                            <div className="effect-item">
                                <h3>Falla cardíaca</h3>
                                <p>Si una parte del corazón queda dañada de forma permanente, el músculo puede debilitarse y no bombear bien la sangre.</p>
                            </div>

                            <div className="effect-item">
                                <h3>Muerte súbita</h3>
                                <p>En casos severos, la trombosis coronaria puede llevar a una parada cardíaca inmediata.</p>
                            </div>
                        </div>
                    </section>

                    <section className="trombosis-section">
                        <h2 className="section-title">🩺 TRATAMIENTOS CONVENCIONALES</h2>
                        <p className="section-content">
                            Los tratamientos convencionales tienen como objetivo disolver el trombo, restaurar el flujo sanguíneo y prevenir nuevos eventos. Se dividen en:
                        </p>

                        <div className="treatment-container">
                            <div className="treatment-item">
                                <h3>1. Fármacos</h3>
                                <ul>
                                    <li><strong>Antiagregantes plaquetarios:</strong> como aspirina y clopidogrel, evitan que las plaquetas se agrupen y formen nuevos coágulos.</li>
                                    <li><strong>Anticoagulantes:</strong> como la heparina, inhiben la formación de trombos adicionales.</li>
                                    <li><strong>Fibrinolíticos (trombolíticos):</strong> como alteplasa o tenecteplasa, disuelven el trombo existente (uso urgente en IAM).</li>
                                    <li><strong>Betabloqueadores, estatinas y nitratos:</strong> ayudan a controlar la presión, reducir la carga del corazón y mejorar el flujo sanguíneo.</li>
                                </ul>
                            </div>

                            <div className="treatment-item">
                                <h3>2. Intervención coronaria percutánea (angioplastia)</h3>
                                <ul>
                                    <li>Introducción de un catéter con balón que abre la arteria obstruida.</li>
                                    <li>Generalmente se coloca un stent (malla metálica) para mantener la arteria abierta.</li>
                                </ul>
                            </div>

                            <div className="treatment-item">
                                <h3>3. Cirugía de revascularización (bypass coronario)</h3>
                                <ul>
                                    <li>Se crea una vía alternativa con injertos (arterias o venas) para que la sangre evite la arteria bloqueada.</li>
                                    <li>Se indica cuando hay múltiples obstrucciones o si la angioplastia no es viable.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="trombosis-section">
                        <h2 className="section-title">🌿 TRATAMIENTOS ALTERNATIVOS (COMPLEMENTARIOS)</h2>
                        <p className="section-content">
                            Estos tratamientos pueden apoyar la recuperación y la prevención, pero no curan ni detienen una trombosis coronaria por sí solos.
                        </p>

                        <div className="treatment-container">
                            <div className="treatment-item">
                                <h3>1. Cambios en el estilo de vida</h3>
                                <ul>
                                    <li><strong>Dieta cardioprotectora:</strong> baja en grasas saturadas, sal y azúcares; rica en frutas, verduras y omega-3.</li>
                                    <li>Ejercicio regular y supervisado.</li>
                                    <li>Abandono del tabaco y reducción del consumo de alcohol.</li>
                                    <li>Manejo del estrés (meditación, yoga, respiración consciente).</li>
                                </ul>
                            </div>

                            <div className="treatment-item">
                                <h3>2. Suplementos naturales (previa aprobación médica)</h3>
                                <ul>
                                    <li><strong>Omega-3:</strong> reduce la inflamación y mejora la salud arterial.</li>
                                    <li><strong>Ajo:</strong> propiedades antiagregantes leves.</li>
                                    <li><strong>Cúrcuma:</strong> efecto antiinflamatorio.</li>
                                    <li><strong>Coenzima Q10:</strong> apoya la función cardíaca.</li>
                                </ul>
                            </div>

                            <div className="treatment-item">
                                <h3>3. Terapias mente-cuerpo</h3>
                                <ul>
                                    <li>Acupuntura y meditación guiada pueden ayudar en el control del estrés, que es un factor de riesgo cardiovascular.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="warning-box">
                            <h3>⚠️ IMPORTANTE</h3>
                            <p>
                                <strong>La trombosis coronaria es una emergencia médica. El tratamiento debe iniciarse lo antes posible en un hospital.</strong>
                            </p>
                            <p>
                                <strong>Las terapias alternativas pueden complementar, pero nunca sustituir el tratamiento médico estándar.</strong>
                            </p>
                            <p>
                                <strong>Todo tratamiento alternativo debe ser consultado con un cardiólogo para evitar interacciones peligrosas con medicamentos.</strong>
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* SEGUNDO CANVAS - Con ambiente simple */}
            <div className="canvas-container canvas-environment" onKeyDown={handleKeyPress2} tabIndex={0} style={{ outline: 'none' }}>

                {/* Botones centrados para segundo canvas */}
                <div className="centered-controls">
                    <button
                        className="centered-btn"
                        onClick={() => setShowInstructions2(!showInstructions2)}
                    >
                        {showInstructions2 ? 'Ocultar Instrucciones' : 'Mostrar Instrucciones'}
                    </button>
                    <button
                        className="centered-btn"
                        onClick={() => setShowHeartInfo2(!showHeartInfo2)}
                    >
                        {showHeartInfo2 ? 'Ocultar Info Corazón' : 'Mostrar Info Corazón'}
                    </button>
                </div>

                {/* Interfaz de instrucciones superpuesta para el segundo canvas */}
                {showInstructions2 && (
                    <div className="instructions-overlay">
                        <div className="instructions-content">
                            <h3>🎮 Controles 3D:</h3>
                            <ul>
                                <li><strong>Click + Arrastrar:</strong> Girar cámara</li>
                                <li><strong>Rueda del Mouse:</strong> Zoom in/out</li>
                            </ul>
                            <h3>⌨️ Controles de Teclado (WASD):</h3>
                            <ul>
                                <li><strong>W:</strong> Rotar hacia arriba</li>
                                <li><strong>S:</strong> Rotar hacia abajo</li>
                                <li><strong>A:</strong> Reducir escala</li>
                                <li><strong>D:</strong> Aumentar escala</li>
                            </ul>

                        </div>
                    </div>
                )}

                {/* Información del corazón superpuesta para segundo canvas */}
                {showHeartInfo2 && (
                    <div className="heart-info-overlay">
                        <div className="heart-info-content">
                            <h3>🫀 Canvas 2 - Espacio</h3>
                            <p>Escala: {heartScale2.toFixed(1)}x</p>
                            <p>Rotación: {heartRotation2.toFixed(1)}°</p>
                            <p><strong>Iluminación:</strong> Dura direccional</p>
                            <p><strong>Sombras:</strong> Duras</p>
                            <p><strong>Ambiente:</strong> Azul/Morado</p>

                        </div>
                    </div>
                )}

                <KeyboardControls map={keyboardMap}>
                    <Canvas
                        shadows={{ type: "hard" }}
                        camera={{
                            position: [2, 0, 5],
                            fov: 1,
                        }}
                    >
                        <SimpleEnvironment />
                        <HardLighting />
                        <OrbitControls />
                        <Text3D
                            position={[-0.020, 0.019, 0]}
                            font="/fonts/ConsolaMono.json"
                            size={0.0055}
                            height={0.003}
                            curveSegments={32}
                        >Trombosis
                            <meshStandardMaterial color="black" />
                        </Text3D>
                        <group
                            scale={[heartScale2, heartScale2, heartScale2]}
                            rotation={[heartRotation2, heartRotation2 * 0.5, 0]}
                        >
                            <Heart1 />
                        </group>
                    </Canvas>
                </KeyboardControls>
            </div>

            {/* TERCER CANVAS - Con ambiente simple */}
            <div className="canvas-container canvas-environment" onKeyDown={handleKeyPress3} tabIndex={0} style={{ outline: 'none' }}>

                {/* Botones centrados para tercer canvas */}
                <div className="centered-controls">
                    <button
                        className="centered-btn"
                        onClick={() => setShowInstructions3(!showInstructions3)}
                    >
                        {showInstructions3 ? 'Ocultar Instrucciones' : 'Mostrar Instrucciones'}
                    </button>
                    <button
                        className="centered-btn"
                        onClick={() => setShowHeartInfo3(!showHeartInfo3)}
                    >
                        {showHeartInfo3 ? 'Ocultar Info Corazón' : 'Mostrar Info Corazón'}
                    </button>
                </div>

                {/* Interfaz de instrucciones superpuesta para el tercer canvas */}
                {showInstructions3 && (
                    <div className="instructions-overlay">
                        <div className="instructions-content">
                            <h3>🎮 Controles 3D:</h3>
                            <ul>
                                <li><strong>Click + Arrastrar:</strong> Girar cámara</li>
                                <li><strong>Rueda del Mouse:</strong> Zoom in/out</li>
                            </ul>
                            <h3>⌨️ Controles de Teclado (WASD):</h3>
                            <ul>
                                <li><strong>W:</strong> Rotar hacia arriba</li>
                                <li><strong>S:</strong> Rotar hacia abajo</li>
                                <li><strong>A:</strong> Reducir escala</li>
                                <li><strong>D:</strong> Aumentar escala</li>
                            </ul>

                        </div>
                    </div>
                )}

                {/* Información del corazón superpuesta para tercer canvas */}
                {showHeartInfo3 && (
                    <div className="heart-info-overlay">
                        <div className="heart-info-content">
                            <h3>🫀 Canvas 3 - Natura</h3>
                            <p>Escala: {heartScale3.toFixed(1)}x</p>
                            <p>Rotación: {heartRotation3.toFixed(1)}°</p>
                            <p><strong>Iluminación:</strong> Cálida suave</p>
                            <p><strong>Sombras:</strong> Suaves</p>
                            <p><strong>Ambiente:</strong> Verde/Esmeralda</p>

                        </div>
                    </div>
                )}

                <KeyboardControls map={keyboardMap}>
                    <Canvas
                        shadows={{ type: "soft" }}
                        camera={{
                            position: [2, 0, 5],
                            fov: 2,
                        }}
                    >
                        <WarmLighting />
                        <OrbitControls />

                        <group
                            scale={[heartScale3, heartScale3, heartScale3]}
                            rotation={[heartRotation3, heartRotation3 * 0.5, 0]}
                        >
                            <Heart1 />
                        </group>
                    </Canvas>
                </KeyboardControls>
            </div>

            {/* CUARTO CANVAS - Con ambiente simple */}
            <div className="canvas-container canvas-environment" onKeyDown={handleKeyPress4} tabIndex={0} style={{ outline: 'none' }}>

                {/* Botones centrados para cuarto canvas */}
                <div className="centered-controls">
                    <button
                        className="centered-btn"
                        onClick={() => setShowInstructions4(!showInstructions4)}
                    >
                        {showInstructions4 ? 'Ocultar Instrucciones' : 'Mostrar Instrucciones'}
                    </button>
                    <button
                        className="centered-btn"
                        onClick={() => setShowHeartInfo4(!showHeartInfo4)}
                    >
                        {showHeartInfo4 ? 'Ocultar Info Corazón' : 'Mostrar Info Corazón'}
                    </button>
                </div>

                {/* Interfaz de instrucciones superpuesta para el cuarto canvas */}
                {showInstructions4 && (
                    <div className="instructions-overlay">
                        <div className="instructions-content">
                            <h3>🎮 Controles 3D:</h3>
                            <ul>
                                <li><strong>Click + Arrastrar:</strong> Girar cámara</li>
                                <li><strong>Rueda del Mouse:</strong> Zoom in/out</li>
                            </ul>
                            <h3>⌨️ Controles de Teclado (WASD):</h3>
                            <ul>
                                <li><strong>W:</strong> Rotar hacia arriba</li>
                                <li><strong>S:</strong> Rotar hacia abajo</li>
                                <li><strong>A:</strong> Reducir escala</li>
                                <li><strong>D:</strong> Aumentar escala</li>
                            </ul>

                        </div>
                    </div>
                )}

                {/* Información del corazón superpuesta para cuarto canvas */}
                {showHeartInfo4 && (
                    <div className="heart-info-overlay">
                        <div className="heart-info-content">
                            <h3>🫀 Canvas 4 - Fuego</h3>
                            <p>Escala: {heartScale4.toFixed(1)}x</p>
                            <p>Rotación: {heartRotation4.toFixed(1)}°</p>
                            <p><strong>Iluminación:</strong> Fría intensa</p>
                            <p><strong>Sombras:</strong> Duras</p>
                            <p><strong>Ambiente:</strong> Rojo/Naranja</p>

                        </div>
                    </div>
                )}

                <KeyboardControls map={keyboardMap}>
                    <Canvas
                        shadows={{ type: "hard" }}
                        camera={{
                            position: [2, 0, 5],
                            fov: 30,
                        }}
                    >
                        <CoolLighting />
                        <OrbitControls />
                        <VideoMesh />
                        <Environment preset="lobby" background />
                        <group
                            scale={[99, 99, 99]}
                            rotation={[heartRotation4, heartRotation4 * 0.5, 0]}
                        >
                            <Heart1C />
                        </group>
                    </Canvas>
                </KeyboardControls>
            </div>
        </div>
    );
};

export default Trombosis;