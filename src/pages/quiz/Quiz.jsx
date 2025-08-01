import React, { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, KeyboardControls, Html, useKeyboardControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, doc, setDoc, getDoc, updateDoc, increment, collection, getDocs } from "../../firebase.js";
import useQuizStore from "../../stores/use-quiz-store";
import * as THREE from "three";
import "./Quiz.css";

// Medical quiz questions
const questions = [
  {
    id: 1,
    question: "¿Cuál es la presión arterial normal en adultos?",
    options: ["90/60 mmHg", "120/80 mmHg", "140/90 mmHg", "160/100 mmHg"],
    correctAnswer: 1,
    situation: "Un paciente llega a consulta para chequeo rutinario"
  },
  {
    id: 2,
    question: "¿Qué significa RCP?",
    options: ["Reanimación Cardio Pulmonar", "Revisión Cardio Preventiva", "Rehabilitación Cardio Progresiva", "Resonancia Cardio Pulmonar"],
    correctAnswer: 0,
    situation: "Encuentras a una persona inconsciente en el suelo"
  },
  {
    id: 3,
    question: "¿Cuál es la frecuencia cardíaca normal en reposo?",
    options: ["40-50 lpm", "60-100 lpm", "100-120 lpm", "120-140 lpm"],
    correctAnswer: 1,
    situation: "Evalúas los signos vitales de un paciente"
  },
  {
    id: 4,
    question: "¿Qué hacer ante una hemorragia abundante?",
    options: ["Aplicar calor", "Presión directa", "Solo elevar extremidad", "Torniquete inmediato"],
    correctAnswer: 1,
    situation: "Un paciente presenta sangrado profuso en el brazo"
  },
  {
    id: 5,
    question: "¿Temperatura corporal normal?",
    options: ["35°C", "36-37°C", "38°C", "39°C"],
    correctAnswer: 1,
    situation: "Verificas si un niño tiene fiebre"
  }
];

// Camera follow component
const CameraFollow = ({ target }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    if (target?.current) {
      const position = target.current.translation();
      // Smooth camera follow
      const targetPosition = new THREE.Vector3(
        position.x,
        position.y + 8,
        position.z + 12
      );
      
      camera.position.lerp(targetPosition, 0.05);
      camera.lookAt(position.x, position.y, position.z);
    }
  });
  
  return null;
};

// Player component with physics and controlled movement
const Player = ({ onCollision, playerRef, gameActive = true, user }) => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  
  useFrame((state, delta) => {
    if (!playerRef.current || !gameActive || !user) return; // No movimiento sin autenticación
    
    const { forward, backward, left, right, jump } = getKeys();
    const rb = playerRef.current;
    
    // Get current position and velocity
    const position = rb.translation();
    const velocity = rb.linvel();
    
    // Define boundaries to keep player in game area
    const boundaries = {
      x: { min: -15, max: 15 },
      z: { min: -15, max: 15 }
    };
    
    const impulse = { x: 0, y: 0, z: 0 };
    const speed = 0.1; // Velocidad reducida para movimiento más lento
    const jumpForce = 3; // Fuerza de salto ligeramente reducida
    
    // Apply movement only if within boundaries
    if (forward && position.z > boundaries.z.min) {
      impulse.z -= speed;
    }
    if (backward && position.z < boundaries.z.max) {
      impulse.z += speed;
    }
    if (left && position.x > boundaries.x.min) {
      impulse.x -= speed;
    }
    if (right && position.x < boundaries.x.max) {
      impulse.x += speed;
    }
    
    // Jump only if on ground (tecla C)
    if (jump && Math.abs(velocity.y) < 0.5 && position.y < 3) {
      impulse.y = jumpForce;
    }
    
    // Apply movement impulse
    if (impulse.x !== 0 || impulse.y !== 0 || impulse.z !== 0) {
      rb.applyImpulse(impulse, true);
    }
    
    // Reset position if player falls off
    if (position.y < -5) {
      rb.setTranslation({ x: 0, y: 3, z: 8 }, true);
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={playerRef}
      type={user ? "dynamic" : "fixed"} // Tipo fijo si no está autenticado
      colliders="ball"
      position={[0, 3, 8]}
      enabledRotations={[false, false, false]}
      onCollisionEnter={user ? onCollision : undefined} // Sin colisiones si no está autenticado
      mass={1}
      restitution={0.1}
      friction={0.8}
      linearDamping={2}
      angularDamping={1}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.4]} />
        <meshStandardMaterial 
          color={user ? "#00BCD4" : "#666666"} // Color diferente si no está autenticado
          metalness={0.2}
          roughness={0.7}
          opacity={user ? 1.0 : 0.5} // Semi-transparente si no está autenticado
          transparent={!user}
        />
      </mesh>
      
      {/* Indicador visual de que el jugador no puede moverse */}
      {!user && (
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.2}
          color="#FFB74D"
          anchorX="center"
          anchorY="center"
          fontWeight="bold"
        >
          🔒 INICIA SESIÓN
        </Text>
      )}
    </RigidBody>
  );
};

// Question Platform component with modern minimalist design
const QuestionPlatform = ({ position, questionId, isAnswered, questionText }) => {
  const platformColor = isAnswered ? "#4CAF50" : "#00BCD4";
  const glowColor = isAnswered ? "#81C784" : "#4DD0E1";
  
  return (
    <group position={position}>
      {/* Main platform */}
      <RigidBody type="fixed" colliders="cuboid" userData={{ questionId }}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2, 2, 0.3, 8]} />
          <meshStandardMaterial 
            color={platformColor}
            metalness={0.3}
            roughness={0.4}
            emissive={glowColor}
            emissiveIntensity={0.1}
          />
        </mesh>
      </RigidBody>
      
      {/* Question text display */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="center"
        maxWidth={4}
        textAlign="center"
        font="/fonts/RobotoFlex.ttf"
      >
        {isAnswered ? "✓ COMPLETADO" : questionText}
      </Text>
      
      {/* Question number label */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.18}
        color={platformColor}
        anchorX="center"
        anchorY="center"
        font="/fonts/RobotoFlex.ttf"
        fontWeight="bold"
      >
        PREGUNTA {questionId}
      </Text>
      
      {/* Subtle glow effect */}
      <pointLight
        position={[0, 1, 0]}
        intensity={0.3}
        distance={6}
        color={platformColor}
      />
    </group>
  );
};

// Leaderboard Column for 3D medallero
const LeaderboardColumn = ({ position, height, nombre, score, rank }) => {
  const colors = ["#FFD700", "#C0C0C0", "#CD7F32", "#4CAF50"];
  const color = colors[rank] || colors[3];
  
  return (
    <RigidBody type="fixed" colliders="cuboid" position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.3, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Posición del jugador */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="center"
        fontWeight="bold"
      >
        #{rank + 1}
      </Text>
      
      {/* Nombre del usuario */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.22}
        color="white"
        anchorX="center"
        anchorY="center"
        fontWeight="500"
      >
        {nombre}
      </Text>
      
      {/* Puntuación */}
      <Text
        position={[0, 0.05, 0]}
        fontSize={0.18}
        color="yellow"
        anchorX="center"
        anchorY="center"
      >
        {score} pts
      </Text>
      
      {/* Emoji para top 3 */}
      {rank < 3 && (
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.5}
          color="gold"
          anchorX="center"
          anchorY="center"
        >
          {rank === 0 ? "🥇" : rank === 1 ? "🥈" : "🥉"}
        </Text>
      )}
    </RigidBody>
  );
};

// Question Popup Component
const QuestionPopup = ({ question, onAnswer, onClose, score }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const correct = selectedOption === question.correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);
      
      setTimeout(() => {
        onAnswer(selectedOption, correct);
        setShowFeedback(false);
        setSelectedOption(null);
      }, 2000);
    }
  };

  return (
    <div className="question-popup-overlay">
      <div className="question-popup">
        <div className="situation-context">
          <h3>🏥 Situación Clínica</h3>
          <p>{question.situation}</p>
        </div>
        
        <h2>{question.question}</h2>
        
        {!showFeedback ? (
          <>
            <div className="options">
              {question.options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                  />
                  {option}
                </label>
              ))}
            </div>
            
            <div className="popup-actions">
              <button onClick={onClose} className="btn-cancel">Cancelar</button>
              <button 
                onClick={handleSubmit} 
                disabled={selectedOption === null}
                className="btn-submit"
              >
                Responder
              </button>
            </div>
          </>
        ) : (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>{isCorrect ? "¡Correcto! 🎉" : "Incorrecto ❌"}</h3>
            <p>
              {isCorrect 
                ? `¡Excelente! Has ganado 10 puntos. Puntuación actual: ${score + 10}`
                : `La respuesta correcta era: ${question.options[question.correctAnswer]}`
              }
            </p>
            {!isCorrect && <p>¡Caerás por la respuesta incorrecta! 💥</p>}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Quiz Component
const Quiz = () => {
  const { quiz, incrementQuizProgress } = useQuizStore();
  const [user] = useAuthState(auth);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [playerPosition, setPlayerPosition] = useState([0, 5, 0]);
  const [userProgress, setUserProgress] = useState({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const playerRef = useRef();

  // Usar preguntas estáticas - no necesitamos cargar desde Firebase
  const currentQuestions = questions;

  // Función para guardar puntuación en Firebase (colección resultados)
  const saveScore = async (userId, userName, score, totalQuestions) => {
    try {
      console.log("🔄 Intentando guardar puntuación...");
      console.log("📋 Datos a guardar:", { userId, userName, score, totalQuestions });
      console.log("👤 Usuario actual:", user ? user.uid : "Sin usuario");
      
      const userDocId = userId || `user_${Date.now()}`; // ID único si no hay usuario autenticado
      console.log("🆔 ID del documento:", userDocId);
      
      const dataToSave = {
        usuario: userName || "Jugador Anónimo", // Nombre de la cuenta de Google
        puntuacion: score,                       // Puntuación obtenida
        progreso: totalQuestions                 // Total de preguntas respondidas
      };
      
      console.log("💾 Datos finales:", dataToSave);
      
      await setDoc(doc(db, "resultados", userDocId), dataToSave);
      console.log("✅ Puntuación guardada correctamente en Firebase");
      
      // Recargar leaderboard después de guardar
      await loadLeaderboard();
      
    } catch (error) {
      console.error("❌ Error al guardar puntuación:", error);
      console.error("🔍 Código de error:", error.code);
      console.error("📝 Mensaje de error:", error.message);
    }
  };
  // Función para cargar el progreso del usuario desde Firebase
  const loadUserProgress = async () => {
    if (!user) {
      setIsLoadingProgress(false);
      return;
    }
    
    try {
      console.log("📋 Cargando progreso del usuario:", user.uid);
      const userRef = doc(db, "quiz_usuarios", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log("✅ Progreso cargado:", data);
        
        // Cargar respuestas anteriores
        const answers = data.answers || {};
        const answeredIds = new Set(Object.keys(answers).map(id => parseInt(id)));
        
        setAnsweredQuestions(answeredIds);
        setScore(data.score || 0);
        setUserProgress(data);
        
        console.log(`📊 Preguntas ya respondidas: ${answeredIds.size}/${questions.length}`);
        console.log("🎯 Puntuación actual:", data.score || 0);
      } else {
        console.log("👤 Nuevo usuario, creando progreso inicial");
        // Crear documento inicial para nuevo usuario
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "Usuario",
          email: user.email,
          score: 0,
          lastActivity: new Date(),
          answers: {},
          startedAt: new Date()
        });
      }
    } catch (error) {
      console.error("❌ Error cargando progreso:", error);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  // Función para guardar progreso inmediatamente después de cada respuesta
  const saveUserProgress = async (questionId, selectedOption, isCorrect) => {
    if (!user) return;
    
    try {
      console.log(`💾 Guardando respuesta ${questionId}: ${isCorrect ? 'Correcta' : 'Incorrecta'}`);
      
      const userRef = doc(db, "quiz_usuarios", user.uid);
      const pointsToAdd = isCorrect ? 10 : 0;
      
      // Actualizar tanto el progreso individual como el score total
      await updateDoc(userRef, {
        score: increment(pointsToAdd),
        lastActivity: new Date(),
        [`answers.${questionId}`]: {
          selectedOption,
          isCorrect,
          timestamp: new Date(),
          points: pointsToAdd
        }
      });
      
      console.log(`✅ Progreso guardado - Puntos agregados: ${pointsToAdd}`);
      
      // También guardar en la tabla de resultados para el leaderboard
      const currentScore = score + pointsToAdd;
      const totalAnswered = answeredQuestions.size + 1;
      await saveScore(user.uid, user.displayName, currentScore, totalAnswered);
      
    } catch (error) {
      console.error("❌ Error guardando progreso:", error);
    }
  };

  // Función para resetear el progreso del usuario
  const resetUserProgress = async () => {
    if (!user) return;
    
    const confirmed = window.confirm(
      "⚠️ ¿Estás seguro de que deseas resetear todo tu progreso?\n\n" +
      "Esto eliminará todas tus respuestas y pondrá tu puntuación en 0.\n" +
      "Esta acción no se puede deshacer."
    );
    
    if (!confirmed) return;
    
    try {
      console.log("� Reseteando progreso del usuario...");
      
      const userRef = doc(db, "quiz_usuarios", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "Usuario",
        email: user.email,
        score: 0,
        lastActivity: new Date(),
        answers: {},
        resetAt: new Date()
      });
      
      // Resetear estados locales
      setAnsweredQuestions(new Set());
      setScore(0);
      setUserProgress({});
      
      // También eliminar de la tabla de resultados
      const resultRef = doc(db, "resultados", user.uid);
      await setDoc(resultRef, {
        usuario: user.displayName || "Usuario",
        puntuacion: 0,
        progreso: 0
      });
      
      await loadLeaderboard();
      
      console.log("✅ Progreso reseteado correctamente");
      alert("✅ Tu progreso ha sido reseteado. ¡Puedes empezar de nuevo!");
      
    } catch (error) {
      console.error("❌ Error reseteando progreso:", error);
      alert("❌ Error al resetear el progreso. Inténtalo de nuevo.");
    }
  };

  const loadLeaderboard = async () => {
    try {
      console.log("📊 Cargando leaderboard desde Firebase...");
      const snapshot = await getDocs(collection(db, "resultados"));
      console.log("📈 Documentos encontrados:", snapshot.size);
      
      const scores = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log("📄 Documento leído:", doc.id, data);
        return {
          id: doc.id,
          usuario: data.usuario || "Usuario",
          puntuacion: data.puntuacion || 0,
          progreso: data.progreso || 0,
          // Campos calculados automáticamente
          porcentaje: data.progreso ? Math.round((data.puntuacion / (data.progreso * 10)) * 100) : 0,
          fecha: new Date().toLocaleDateString() // Fecha actual como placeholder
        };
      })
      .sort((a, b) => b.puntuacion - a.puntuacion) // Ordenar por puntuación descendente
      .slice(0, 10); // Top 10
      
      setLeaderboardData(scores);
      console.log("📊 Leaderboard cargado:", scores.length, "jugadores");
    } catch (error) {
      console.error("❌ Error loading leaderboard:", error);
      console.error("🔍 Código de error:", error.code);
      console.error("📝 Mensaje de error:", error.message);
    }
  };

  // Handle player collision with platforms
  const handleCollision = ({ other }) => {
    if (!user) return; // No permitir interacciones sin autenticación
    
    const questionId = other.rigidBodyObject?.userData?.questionId;
    const triggerType = other.rigidBodyObject?.userData?.triggerType;
    
    // Handle question platforms - solo mostrar si NO se ha respondido antes
    if (questionId && !answeredQuestions.has(questionId)) {
      const question = currentQuestions.find(q => q.id === questionId);
      if (question) {
        console.log(`❓ Accediendo a pregunta ${questionId} (no respondida antes)`);
        setCurrentQuestion(question);
        setShowPopup(true);
      }
    } else if (questionId && answeredQuestions.has(questionId)) {
      console.log(`✅ Pregunta ${questionId} ya fue respondida anteriormente`);
      // Mostrar mensaje temporal de que ya se respondió
      setTimeout(() => {
        console.log("Esta pregunta ya fue respondida");
      }, 100);
    }
    
    // Handle leaderboard trigger
    if (triggerType === 'leaderboard') {
      setShowLeaderboard(prev => !prev);
    }
  };

  // Handle answer submission
  const handleAnswerSubmit = async (selectedOption, isCorrect) => {
    if (!currentQuestion) return;

    const newAnsweredQuestions = new Set([...answeredQuestions, currentQuestion.id]);
    setAnsweredQuestions(newAnsweredQuestions);
    
    let newScore = score;
    if (isCorrect) {
      newScore = score + 10;
      setScore(newScore);
    } else {
      // Physics consequence - make player fall
      if (playerRef.current) {
        playerRef.current.setLinvel({ x: 0, y: -15, z: 0 });
        playerRef.current.setAngvel({ x: 5, y: 5, z: 5 });
      }
    }

    // Guardar progreso después de cada respuesta
    await saveUserProgress(currentQuestion.id, selectedOption, isCorrect);
    
    // Verificar si completó todas las preguntas
    if (newAnsweredQuestions.size === currentQuestions.length) {
      console.log("🎯 Quiz completado! Guardando puntuación...");
      // Usar el nombre del usuario de Google
      const userName = user?.displayName || user?.email?.split('@')[0] || "Jugador Anónimo";
      console.log("👤 Nombre del usuario:", userName);
      console.log("🏆 Puntuación final:", newScore);
      
      await saveScore(user?.uid, userName, newScore, currentQuestions.length);
      console.log("🎉 Proceso de guardado completado");
    }

    incrementQuizProgress();
    
    setShowPopup(false);
    setCurrentQuestion(null);
  };

  // Keyboard controls map
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["KeyC"] },
  ];

  // Player movement
  const handlePlayerMovement = () => {
    if (!playerRef.current) return;
    
    // This would be handled by KeyboardControls in the Canvas
  };

  useEffect(() => {
    loadLeaderboard();
    loadUserProgress(); // Cargar progreso del usuario al iniciar
  }, [user]); // Ejecutar cuando cambie el usuario

  return (
    <div className="quiz-3d">
      {/* Mostrar indicador de carga mientras se cargan los datos */}
      {isLoadingProgress && (
        <div className="loading-overlay">
          <div className="loading-content">
            <h2>🔄 Cargando tu progreso...</h2>
            <p>Recuperando tus respuestas anteriores</p>
          </div>
        </div>
      )}

      {/* Mensaje de login requerido */}
      {!user && (
        <div className="login-required-overlay">
          <div className="login-required-content">
            <h2>🔐 Autenticación Requerida</h2>
            <p>Debes iniciar sesión para jugar el quiz y guardar tu progreso.</p>
            <div className="login-features">
              <p>✅ Guarda tu progreso automáticamente</p>
              <p>✅ Compite en el medallero</p>
              <p>✅ Continúa donde quedaste</p>
            </div>
            <p className="login-instruction">Haz clic en "Iniciar Sesión" en la esquina superior derecha</p>
          </div>
        </div>
      )}

      {/* Controles en el costado izquierdo */}
      <div className="quiz-controls-left">
        <p>Controles: WASD o flechas para mover, C para saltar</p>
        {user ? (
          <div className="user-info">
            <p>👤 {user.displayName || user.email}</p>
            <p>📊 Progreso guardado automáticamente</p>
            <button 
              onClick={resetUserProgress}
              className="reset-progress-btn"
              disabled={isLoadingProgress}
            >
              🔄 Resetear Progreso
            </button>
          </div>
        ) : (
          <div className="login-reminder">
            <p>⚠️ Inicia sesión para guardar tu progreso</p>
          </div>
        )}
      </div>

      {/* Estadísticas en la parte inferior */}
      <div className="quiz-stats-bottom">
        <span>Puntuación: {score}</span>
        <span>Progreso: {answeredQuestions.size}/{currentQuestions.length}</span>
        <span>Completado: {Math.round((answeredQuestions.size / currentQuestions.length) * 100)}%</span>
        {answeredQuestions.size === currentQuestions.length && (
          <span style={{background: '#4CAF50', color: 'white'}}>¡COMPLETADO! 🎉</span>
        )}
      </div>

      {/* 3D World */}
      <div className="quiz-canvas">
        <Canvas shadows camera={{ position: [0, 8, 20], fov: 70 }}>
          <Suspense fallback={null}>
            {/* Modern lighting setup */}
            <ambientLight intensity={0.3} color="#f5f5f5" />
            <directionalLight 
              castShadow 
              position={[15, 20, 10]} 
              intensity={0.8}
              color="#ffffff"
              shadow-mapSize-width={4096}
              shadow-mapSize-height={4096}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            {/* Accent lighting */}
            <pointLight position={[0, 8, 0]} intensity={0.4} color="#00BCD4" distance={25} />
            <hemisphereLight intensity={0.2} groundColor="#263238" />
            
            {/* Camera that follows the player */}
            <CameraFollow target={playerRef} />

            <KeyboardControls map={keyboardMap}>
              <Physics gravity={[0, -9.81, 0]} debug={false}>
                {/* Player */}
                <Player onCollision={handleCollision} playerRef={playerRef} gameActive={!showPopup} user={user} />

                {/* Question Platforms */}
                {currentQuestions.map((question, index) => (
                  <QuestionPlatform
                    key={question.id}
                    position={[index * 5 - 10, 1, 0]}
                    questionId={question.id}
                    isAnswered={answeredQuestions.has(question.id)}
                    questionText={`Situación ${question.id}`}
                  />
                ))}

                {/* Medallero Trigger Platform */}
                <RigidBody type="fixed" colliders="cuboid" position={[15, 0.5, 0]} userData={{ triggerType: 'leaderboard' }}>
                  <mesh castShadow receiveShadow>
                    <boxGeometry args={[2, 0.5, 2]} />
                    <meshStandardMaterial 
                      color="#FFD700"
                      metalness={0.5}
                      roughness={0.3}
                      emissive="#FFD700"
                      emissiveIntensity={0.2}
                    />
                  </mesh>
                  <Text
                    position={[0, 1, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="center"
                    fontWeight="bold"
                  >
                    MEDALLERO
                  </Text>
                </RigidBody>

                {/* 3D Leaderboard - Solo visible cuando showLeaderboard es true */}
                {showLeaderboard && (
                  <>
                    {/* Leaderboard Base - Más pequeña para top 3 */}
                    <RigidBody type="fixed" colliders="cuboid" position={[0, -1, -15]}>
                      <mesh receiveShadow>
                        <boxGeometry args={[12, 0.5, 6]} />
                        <meshStandardMaterial color="#1a1a1a" />
                      </mesh>
                    </RigidBody>
                    
                    {/* Title */}
                    <Text
                      position={[0, 4, -15]}
                      fontSize={1.2}
                      color="gold"
                      anchorX="center"
                      anchorY="center"
                      fontWeight="bold"
                    >
                      🏆 MEDALLERO 3D 🏆
                    </Text>

                    {/* Leaderboard Columns - Solo Top 3 */}
                    {leaderboardData.slice(0, 3).map((userData, index) => (
                      <LeaderboardColumn
                        key={userData.id || index}
                        position={[index * 4 - 4, -0.5, -15]}
                        height={0.3}
                        nombre={userData.usuario || "Usuario"}
                        score={userData.puntuacion || 0}
                        rank={index}
                      />
                    ))}
                  </>
                )}

                {/* Modern minimalist floor */}
                <RigidBody type="fixed" colliders="cuboid" position={[0, -1, 0]}>
                  <mesh receiveShadow>
                    <cylinderGeometry args={[20, 20, 0.2, 32]} />
                    <meshStandardMaterial 
                      color="#263238"
                      metalness={0.1}
                      roughness={0.8}
                    />
                  </mesh>
                </RigidBody>

                {/* Invisible boundary walls (physics only) */}
                <RigidBody type="fixed" colliders="cuboid" position={[18, 5, 0]}>
                  <mesh visible={false}>
                    <boxGeometry args={[1, 10, 40]} />
                  </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="cuboid" position={[-18, 5, 0]}>
                  <mesh visible={false}>
                    <boxGeometry args={[1, 10, 40]} />
                  </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="cuboid" position={[0, 5, 18]}>
                  <mesh visible={false}>
                    <boxGeometry args={[40, 10, 1]} />
                  </mesh>
                </RigidBody>
                <RigidBody type="fixed" colliders="cuboid" position={[0, 5, -18]}>
                  <mesh visible={false}>
                    <boxGeometry args={[40, 10, 1]} />
                  </mesh>
                </RigidBody>
              </Physics>
            </KeyboardControls>
          </Suspense>
        </Canvas>
      </div>

      {/* Question Popup */}
      {showPopup && currentQuestion && (
        <QuestionPopup
          question={currentQuestion}
          onAnswer={handleAnswerSubmit}
          onClose={() => setShowPopup(false)}
          score={score}
        />
      )}
    </div>
  );
};

export default Quiz;