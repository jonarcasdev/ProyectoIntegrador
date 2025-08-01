import "./Arritmia.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import Heart4 from "../../models3d/Heart4";
import Heart2_1 from "../../models3d/Heart2_1";
import Heart4_3 from "../../models3d/Heart4_3";
import Heart4_4 from "../../models3d/Heart4_4";

const VideoPlane = () => {
  const videoRef = useRef(document.createElement("video"));
  const meshRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.src = "/videos/luisvid.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.play();
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[3, 1.8]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[videoRef.current]} />
      </meshBasicMaterial>
    </mesh>
  );
};

const Arritmia = () => {
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [modeloIndex, setModeloIndex] = useState(0);
  const modelos = [<Heart4 />, <Heart2_1 />, <Heart4_3 />, <Heart4_4 />];

  const cambiarModelo = () => {
    setModeloIndex((prev) => (prev + 1) % modelos.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "m") cambiarModelo();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="arritmia-container">
      <h1 className="arritmia-title">Arritmia</h1>

      <div className="arritmia-buttons">
        <button
          className={mostrarInstrucciones ? "activo" : ""}
          onClick={() => setMostrarInstrucciones((prev) => !prev)}
        >
          {mostrarInstrucciones ? "Ocultar instrucciones" : "Mostrar instrucciones"}
        </button>
        <button onClick={cambiarModelo}>Cambiar modelo</button>
        <button
          className={showInfo ? "activo" : ""}
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {showInfo ? "Ocultar info ❤️" : "Mostrar info ❤️"}
        </button>
      </div>

      <div className="modelo-y-textos" style={{ position: "relative" }}>
        {mostrarInstrucciones && (
          <div className="arritmia-mensaje-externo">
            <strong>Instrucciones:</strong><br />
            * Clic izquierdo para rotar<br />
            * Scroll para zoom<br />
            * Presiona <strong>M</strong> o usa el botón para cambiar el modelo
          </div>
        )}

        <div className="arritmia-modelo">
          <Canvas
            shadows
            camera={{ position: [2, 0, 5] }}
            style={{ background: "#000000" }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 10]} intensity={1.5} castShadow />
            <spotLight position={[2, 5, 5]} angle={0.3} penumbra={1} intensity={1.2} castShadow />
            <OrbitControls enableZoom={true} enableRotate={true} autoRotate={false} />
            <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
            <Sparkles count={60} scale={5} speed={1} />
            <mesh position={[0, 0, 0]} scale={[2.5, 2.5, 2.5]}>
              {modelos[modeloIndex]}
            </mesh>
          </Canvas>

          <div className="texto-flotante-3d">
            <div className="texto-principal">Latido Fuerte ❤️</div>
            <div className="texto-secundario">Modelo Experimental</div>
          </div>
        </div>

        {showInfo && (
          <div className="arritmia-info-box-externo">
            <strong>Latido activo ❤️</strong><br />
            El corazón late con ritmo<br />
            animado en tiempo real.
          </div>
        )}
      </div>

      {/* TEXTO EDUCATIVO COMPLETO */}
      <div className="arritmia-info">
        <section className="intro-section">
          <h2>¿Qué es una arritmia?</h2>
          <p>
            Es una alteración en el ritmo del corazón. Puede hacer que el corazón lata muy rápido, muy lento o de manera irregular. Algunas arritmias son inofensivas, pero otras pueden ser graves o incluso mortales.
          </p>
        </section>

        <section>
          <h2>Causas</h2>
          <p>
            Las arritmias pueden ser causadas por enfermedades cardíacas, desequilibrios en el cuerpo, estrés, consumo de sustancias, genética, entre otros factores. En algunos casos no se identifica una causa clara.
          </p>
        </section>

        <section>
          <h2>Síntomas</h2>
          <p>
            Algunas personas sienten palpitaciones, mareos, desmayos, fatiga o dolor en el pecho. Otras no presentan síntomas y la arritmia se detecta durante un examen médico rutinario.
          </p>
        </section>

        <section>
          <h2>Tipos de arritmia</h2>
          <ul>
            <li><strong>Taquicardia:</strong> latidos más rápidos de lo normal.</li>
            <li><strong>Bradicardia:</strong> latidos más lentos de lo normal.</li>
            <li><strong>Fibrilación:</strong> latido desorganizado o irregular.</li>
            <li><strong>Extrasístoles:</strong> latidos adicionales que interrumpen el ritmo normal.</li>
          </ul>
        </section>

        <section>
          <h2>Diagnóstico</h2>
          <p>
            Se diagnostica mediante electrocardiograma (ECG), monitoreo Holter, pruebas de esfuerzo, entre otros métodos.
          </p>
        </section>

        <section>
          <h2>Tratamiento</h2>
          <p>
            Puede incluir medicamentos, cardioversión, marcapasos, ablación cardíaca o cirugía, dependiendo del tipo y gravedad.
          </p>
        </section>

        <section>
          <h2>Prevención</h2>
          <p>
            Llevar una vida saludable, evitar el consumo de sustancias nocivas, controlar enfermedades como la hipertensión y acudir a chequeos médicos.
          </p>
        </section>
      </div>

      {/* CANVAS INDEPENDIENTE PARA VIDEO 3D */}
      <div className="arritmia-video3d">
        <h2>Visualización 3D del Video</h2>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} />
          <OrbitControls autoRotate={false} />
          <Suspense fallback={null}>
            <VideoPlane />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Arritmia;
