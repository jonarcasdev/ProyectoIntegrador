// Utility to initialize questions in Firebase
import { db, collection, setDoc, doc } from "../firebase.js";

const initialQuestions = [
  {
    id: 1,
    question: "¿Cuál es la presión arterial normal en adultos?",
    options: ["90/60 mmHg", "120/80 mmHg", "140/90 mmHg", "160/100 mmHg"],
    correctAnswer: 1,
    situation: "Un paciente llega a consulta para chequeo rutinario",
    category: "signos_vitales",
    difficulty: "basic"
  },
  {
    id: 2,
    question: "¿Qué significa RCP?",
    options: ["Reanimación Cardio Pulmonar", "Revisión Cardio Preventiva", "Rehabilitación Cardio Progresiva", "Resonancia Cardio Pulmonar"],
    correctAnswer: 0,
    situation: "Encuentras a una persona inconsciente en el suelo",
    category: "emergencias",
    difficulty: "basic"
  },
  {
    id: 3,
    question: "¿Cuál es la frecuencia cardíaca normal en reposo?",
    options: ["40-50 lpm", "60-100 lpm", "100-120 lpm", "120-140 lpm"],
    correctAnswer: 1,
    situation: "Evalúas los signos vitales de un paciente",
    category: "signos_vitales",
    difficulty: "basic"
  },
  {
    id: 4,
    question: "¿Qué hacer ante una hemorragia abundante?",
    options: ["Aplicar calor", "Presión directa", "Solo elevar extremidad", "Torniquete inmediato"],
    correctAnswer: 1,
    situation: "Un paciente presenta sangrado profuso en el brazo",
    category: "emergencias",
    difficulty: "intermediate"
  },
  {
    id: 5,
    question: "¿Temperatura corporal normal?",
    options: ["35°C", "36-37°C", "38°C", "39°C"],
    correctAnswer: 1,
    situation: "Verificas si un niño tiene fiebre",
    category: "signos_vitales",
    difficulty: "basic"
  }
];

export const initializeQuestions = async () => {
  try {
    console.log("Inicializando preguntas en Firebase...");
    
    for (const question of initialQuestions) {
      await setDoc(doc(db, "quiz_questions", question.id.toString()), {
        ...question,
        createdAt: new Date(),
        active: true
      });
      console.log(`Pregunta ${question.id} agregada`);
    }
    
    console.log("✅ Todas las preguntas fueron inicializadas correctamente");
    return true;
  } catch (error) {
    console.error("❌ Error al inicializar preguntas:", error);
    return false;
  }
};

// Función para agregar una nueva pregunta
export const addQuestion = async (questionData) => {
  try {
    const questionRef = doc(collection(db, "quiz_questions"));
    await setDoc(questionRef, {
      ...questionData,
      createdAt: new Date(),
      active: true
    });
    console.log("✅ Nueva pregunta agregada:", questionRef.id);
    return questionRef.id;
  } catch (error) {
    console.error("❌ Error al agregar pregunta:", error);
    return null;
  }
};
