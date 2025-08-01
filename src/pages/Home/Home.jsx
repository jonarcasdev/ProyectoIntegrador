import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Sparkles } from "@react-three/drei";
import { useNavigate } from "react-router";
import { useCallback, useRef } from "react";
import "./Home.css";
import VirusImage from "../../assets/Virus.svg";

function HeartModel() {
  const { scene } = useGLTF("/models-3d/Heartprincipal.glb");
  const heartRef = useRef();

  useFrame(() => {
    const t = performance.now() * 0.002;
    const scale = 1.5 + Math.sin(t) * 0.1;
    heartRef.current.scale.set(scale, scale, scale);
    heartRef.current.rotation.y += 0.003;
  });

  return (
    <primitive
      ref={heartRef}
      object={scene}
      position={[0, -1, 0]}
      castShadow
      receiveShadow
    />
  );
}

const Home = () => {
  const navigate = useNavigate();
  const enfermedadesRef1 = useRef(null);

  const handleClick = useCallback(() => {
    navigate("/enfermedades", {
      state: { userData: { displayName: "Jonathan Arboleda" } },
    });
  }, [navigate]);

  const scrollToEnfermedades1 = () => {
    enfermedadesRef1.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home">
      <h1 className="title">El Corazón</h1>

      <div className="bienvenida">
        <h2>Bienvenido a nuestra plataforma educativa sobre el corazón</h2>
        <p>
          Aquí podrás explorar un modelo 3D del corazón humano y conocer las enfermedades
          más comunes que lo afectan. Aprende, explora y cuida tu salud.
        </p>
      </div>

      {/* 🎯 MODELO 3D */}
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1.2} />
          <directionalLight
            intensity={1.5}
            position={[5, 5, 5]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <spotLight
            position={[0, 5, 5]}
            angle={0.4}
            penumbra={0.7}
            intensity={1.5}
            castShadow
          />
          <Sparkles count={50} scale={4} speed={1} />
          <OrbitControls />
          <HeartModel />
        </Canvas>
      </div>

      <div className="inicio">
        <h2>¿Sabes cuáles son las enfermedades del corazón?</h2>
        <button className="scroll-button" onClick={scrollToEnfermedades1}>
          Leer más
        </button>

        <div className="cuadro2" ref={enfermedadesRef1}>
          <div className="enfermedades-container">
            <h1 className="enfermedades-title">Enfermedades</h1>
            <div className="enfermedades-grid">
              <div className="card">
                <h2>Trombosis</h2>
                <p>
                  Formación de un coágulo de sangre dentro de un vaso sanguíneo.
                </p>
                <button
                  className="card-button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/enfermedades/trombosis");
                  }}
                >
                  Saber más
                </button>
              </div>
              <div className="card">
                <h2>Tumor cardiaco en mixoma auricular</h2>
                <p>
                  El mixoma auricular es el tumor cardíaco primario más común en adultos,
                  y suele localizarse en la aurícula izquierda.
                </p>
                <button
                  className="card-button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/enfermedades/tumor_cardiaco");
                  }}
                >
                  Saber más
                </button>
              </div>
              <div className="card">
                <h2>Arritmia</h2>
                <p>
                  Es una alteración del ritmo cardíaco que puede provocar latidos irregulares,
                  demasiado rápidos o demasiado lentos. Puede causar síntomas como palpitaciones,
                  mareos, fatiga o incluso desmayos.
                </p>
                <button
                  className="card-button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/enfermedades/arritmia");
                  }}
                >
                  Saber más
                </button>
              </div>
              <div className="card">
                <h2>Hipertensión</h2>
                <p>
                  Es una condición médica donde la fuerza de la sangre contra
                  las paredes de las arterias es constantemente demasiado alta.
                </p>
                <button
                  className="card-button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/enfermedades/hipertension");
                  }}
                >
                  Saber más
                </button>
              </div>
            </div>
          </div>
          <img className="virus" src={VirusImage} alt="Virus" />
        </div>
      </div>
    </div>
  );
};

export default Home;
