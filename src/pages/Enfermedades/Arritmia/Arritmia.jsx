import "./Arritmia.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import Heart4 from "../../models3d/Heart4";
import Heart2_1 from "../../models3d/Heart2_1";
import Heart4_3 from "../../models3d/Heart4_3";
import Heart4_4 from "../../models3d/Heart4_4";

const Arritmia = () => {
  const leerMas = useRef(null);
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

      {/* Botones */}
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

      {/* Contenedor fijo con cuadros a los lados */}
      <div className="modelo-y-textos">
        {mostrarInstrucciones && (
          <div className="arritmia-mensaje-externo">
            <strong>Instrucciones:</strong><br />
            * Mantén clic izquierdo para rotar<br />
            * Usa la rueda del ratón para acercar o alejar<br />
            * Presiona <strong>M</strong> o haz clic en el botón para cambiar el modelo
          </div>
        )}

        <div className="arritmia-modelo">
          <Canvas shadows camera={{ position: [2, 0, 5] }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 10]} intensity={1.5} castShadow />
            <spotLight position={[2, 5, 5]} angle={0.3} penumbra={1} intensity={1.2} castShadow />
            <OrbitControls enableZoom={true} />
            <Stars />
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
            El corazón presenta un ritmo animado<br />
            simulando el latido normal.
          </div>
        )}
      </div>

      {/* Información educativa */}
      <div className="arritmia-info" ref={leerMas}>
        <section className="intro-section">
          <h2>¿Qué es una arritmia?</h2>
          <p>
            Es una alteración del ritmo normal del corazón. Puede hacer que el corazón
            lata demasiado rápido, demasiado lento o de forma irregular. Algunas son
            inofensivas, pero otras pueden ser peligrosas.
          </p>
        </section>

        <section>
          <h2>Causas</h2>
          <p>
            Enfermedades cardíacas, desequilibrios electrolíticos, lesiones en el corazón,
            estrés, cafeína, alcohol, consumo de drogas o factores genéticos.
          </p>
        </section>

        <section>
          <h2>Síntomas</h2>
          <p>
            Palpitaciones, latidos irregulares o acelerados, sensación de aleteo,
            mareos, fatiga o desmayos. A veces no hay síntomas evidentes.
          </p>
        </section>

        <section>
          <h2>Tipos de arritmias</h2>
          <ul>
            <li><strong>Taquicardia:</strong> latidos más rápidos de lo normal.</li>
            <li><strong>Bradicardia:</strong> latidos más lentos de lo normal.</li>
            <li><strong>Fibrilación auricular:</strong> ritmo caótico en las aurículas.</li>
            <li><strong>Extrasístoles:</strong> latidos adicionales anormales.</li>
          </ul>
        </section>

        <section>
          <h2>Diagnóstico y tratamiento</h2>
          <p>
            Se realiza mediante ECG, Holter o estudios especiales. El tratamiento incluye
            medicamentos, procedimientos eléctricos, ablación o implante de marcapasos.
          </p>
        </section>

        <section>
          <h2>¿Se puede prevenir?</h2>
          <p>
            Sí. Mantener una vida saludable, hacer ejercicio, evitar sustancias estimulantes,
            controlar el estrés y seguir las indicaciones médicas si ya hay antecedentes cardíacos.
          </p>
        </section>

        <section className="datos-curiosos">
          <h2>Sabías que...</h2>
          <ul>
            <li>La fibrilación auricular es la arritmia más común en el mundo.</li>
            <li>El estrés crónico puede aumentar el riesgo de desarrollar arritmias.</li>
            <li>Algunas arritmias no necesitan tratamiento si no causan síntomas.</li>
          </ul>
        </section>
      </div>

      {/* Video informativo */}
      <div style={{ margin: "0 0 40px 0" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video
            src="/videos/luisvid.mp4"
            controls
            style={{
              width: "90%",
              maxWidth: "800px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#000",
            }}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
          Video explicativo: LuisVid
        </div>
      </div>
    </div>
  );
};

export default Arritmia;
