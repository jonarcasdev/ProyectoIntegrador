import "./Hipertension.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, KeyboardControls } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";

import Heart2 from "../../models3d/Heart2";
import Heart2afa from "../../models3d/Heart2afa";
import Heart3afa from "../../models3d/Heart3afa";
import Heart4afa from "../../models3d/Heart4afa";
import AfaVid from "../../videos/afavid";

import Lights2afa from "../../../lights/lights2afa";
import Lights3afa from "../../../lights/lights3afa";
import Title1 from "../../../texts/Title1";
import Title2 from "../../../texts/Title2";
import Staging1 from "../../../staging/Staging1";
import Staging2 from "../../../staging/Staging2";

const VideoPlane = () => {
  const videoRef = useRef(document.createElement("video"));

  useEffect(() => {
    const video = videoRef.current;
    video.src = "/videos/AfaVid.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.play();
  }, []);

  return (
    <mesh>
      <planeGeometry args={[4, 2.5]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[videoRef.current]} />
      </meshBasicMaterial>
    </mesh>
  );
};

const Hipertension = () => {
  const leerMas = useRef(null);
  const [mensajeVisible, setMensajeVisible] = useState(true);
  const [controlesVisibles, setControlesVisibles] = useState(true);
  const [heartRotation, setHeartRotation] = useState([0, 0, 0]);
  const [heartScale, setHeartScale] = useState(1);

  const handleScroll = () => leerMas.current.scrollIntoView({ behavior: "smooth" });

  const manejarClick = () => {
    if (mensajeVisible) setMensajeVisible(false);
  };

  const keyboardMap = [
    { name: "forward", keys: ["KeyW"] },
    { name: "backward", keys: ["KeyS"] },
    { name: "left", keys: ["KeyA"] },
    { name: "right", keys: ["KeyD"] },
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.code) {
        case "KeyW":
          setHeartRotation((prev) => [prev[0] + 0.1, prev[1], prev[2]]);
          break;
        case "KeyS":
          setHeartRotation((prev) => [prev[0] - 0.1, prev[1], prev[2]]);
          break;
        case "KeyA":
          setHeartRotation((prev) => [prev[0], prev[1] + 0.1, prev[2]]);
          break;
        case "KeyD":
          setHeartRotation((prev) => [prev[0], prev[1] - 0.1, prev[2]]);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const renderKeyControls = () => (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "14px",
        zIndex: 20,
      }}
    >
      Usa W/S para rotar verticalmente<br />
      Usa A/D para rotar horizontalmente
    </div>
  );

  const renderModelo = (HeartComponent, index, children) => (
    <div key={index} style={{ position: "relative" }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ position: [2, 0, 5] }} style={{ height: "420px" }} onClick={manejarClick}>
          {index === 0 ? <Lights2afa /> : index === 1 ? <Lights3afa /> : <Lights2afa />}
          <OrbitControls enableZoom={true} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 10]} intensity={1} />
          <mesh rotation={heartRotation} scale={heartScale}>
            {children}
            <HeartComponent />
          </mesh>
        </Canvas>
      </KeyboardControls>
      <button
        onClick={() => setControlesVisibles(!controlesVisibles)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 30,
          padding: "6px 10px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {controlesVisibles ? "Ocultar controles" : "Mostrar controles"}
      </button>
      {controlesVisibles && renderKeyControls()}
    </div>
  );

  return (
    <div style={{ position: "relative", width: "100%" }}>
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
          *Mantén click izquierdo para rotar la cámara <br />
          *Rueda del ratón para acercar o alejar <br />
          Haz clic para interactuar y ocultar este mensaje
        </div>
      )}

      <h1> Hipertensión </h1>

      {renderModelo(Heart2, "main")}

      <div className="cuadroHiper" ref={leerMas}>
        <div className="cardHiper">
          <h2>Causas</h2>
          <p style={{ textAlign: "justify" }}>
            La hipertensión arterial, o presión arterial alta, puede ser causada por una combinación
            de factores genéticos, estilo de vida y condiciones subyacentes...
          </p>
        </div>
      </div>

      {renderModelo(Heart2afa, 0, <>
        <Title1 title="Arterias en Azul" />
        <Staging1 />
      </>)}

      <div className="cuadroAzulHiper">
        <div className="cardHiper">
          <h2>Síntomas</h2>
          <p style={{ textAlign: "justify" }}>
            La mayoría de las personas con hipertensión arterial no experimentan síntomas evidentes...
          </p>
        </div>
      </div>

      {renderModelo(Heart3afa, 1, <Staging2 />)}

      <div className="cuadroHiper">
        <div className="cardHiper">
          <h2>Tratamiento</h2>
          <p style={{ textAlign: "justify" }}>
            El tratamiento de la hipertensión se centra en reducir la presión arterial...
          </p>
        </div>
      </div>

      {renderModelo(Heart4afa, 2, <>
        <Staging2 />
        <Title2 title="Vista interna de una arteria" />
      </>)}

      <div className="cuadroAzulHiper">
        <div className="cardHiper">
          <h2>Angioplastía Coronaria</h2>
          <p style={{ textAlign: "justify" }}>
            La angioplastía coronaria es un procedimiento para abrir arterias del corazón que están tapadas...
          </p>
        </div>
      </div>

      {/* Sección de video 3D */}
      <div style={{ margin: "0 0 40px 0" }}>
        <Canvas camera={{ position: [0, 0, 5] }} style={{ height: "400px", width: "100%" }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 10]} intensity={1} />
          <AfaVid />
          <Staging1 />
          <Title2 title="Video Explicativo" />
          <OrbitControls enableZoom={true} />
        </Canvas>

        <div className="Hipertension-video3d" style={{ marginTop: "20px" }}>
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
    </div>
  );
};

export default Hipertension;
