# 🫀 FINAL PROJECT – 3D Visualization of Cardiac Arrhythmias

---

## 🎓 Presented by

- **Luis Alberto Carabalí Rivera** – 2410006-3743  
  📧 carabali.luis@correounivalle.edu.co  
- **Jonathan Arboleda Castro** – 2222225-2724  
  📧 jonathan.castro@correounivalle.edu.co  
- **Andrés Felipe Aristizábal Buriticá** – 2515855-2724  
  📧 andres.felipe.aristizabal@correounivalle.edu.co  

---

## 👨‍🏫 Presented to

**Fabian Stiven Valencia Córdoba**  
Docente – Universidad del Valle

---

## 📘 Course

**Integrative Project I – 2025-I**  
Grupo 80  
Facultad de Ingeniería  
**Universidad del Valle** – Cali, Colombia  
Año: **2025**

---

## 🧪 Technologies Used

- **React** – Main library for building the web interface.
- **Three.js + @react-three/fiber** – To render and interact with 3D models in the browser.
- **@react-three/drei** – Utilities for camera, lighting, and more.
- **GLTFLoader** – For loading `.glb` 3D models.
- **Custom CSS** – For UI animations and styling.

---

## ⚙️ Key Features

- Realistic 3D heart model with front orientation.
- Animated heartbeats and dynamic visual indicators.
- Dual lighting with soft shadows.
- Interactive camera and responsive layout.
- Educational pop-up content triggered by user interaction.
- Fully built in React with reusable components.

---


## 🧠 Estructura del proyecto

/public                  # Archivos públicos, accesibles directamente (modelos 3D, fuentes, íconos)
/src                     # Carpeta principal del código fuente
  ├── assets             # Recursos como imágenes y sonidos (correct.mp3, virus.svg, etc.)
  ├── icons              # Íconos utilizados en la interfaz
  ├── layout             # Componentes globales de layout (como Header, Footer, etc.)
  ├── pages              # Páginas principales del sitio
  │   ├── About          # Página “Acerca de”
  │   ├── Crud           # Página para gestión CRUD (si aplica)
  │   ├── Enfermedades   # Sección con subpáginas relacionadas con enfermedades
  │   │   ├── Home       # Vista principal de enfermedades
  │   │   ├── models3d   # Modelos 3D específicos usados en esta sección
  │   │   ├── not-found  # Vista de error si no se encuentra la enfermedad
  │   │   └── quiz       # Evaluaciones o cuestionarios
  │   │   └── Text       # Textos informativos de enfermedades
  ├── staging            # Carpeta posiblemente para pruebas o contenido en desarrollo
  ├── stores             # Manejo del estado global del proyecto (probablemente Zustand o similar)
  ├── texts              # Textos de apoyo o data textual estructurada
  ├── videos             # Videos utilizados en el sitio
  ├── firebase.js        # Configuración para Firebase (si se usa autenticación o base de datos)
  ├── index.css          # Estilos globales
  ├── main.jsx           # Punto de entrada principal de React
.gitignore               # Archivos que se excluyen del control de versiones
index.html               # HTML base (normalmente usado por Vite)
package.json             # Dependencias y scripts del proyecto
README.md                # Documentación principal del proyecto


🛠️ Cómo ejecutar el proyecto
Clonar el repositorio

bash
Copiar
Editar
git clone https://github.com/usuario/nombre-proyecto.git
cd nombre-proyecto
Instalar dependencias

Asegúrate de tener Node.js instalado (recomendado: versión 18 o superior).

bash
Copiar
Editar
npm install
Ejecutar el proyecto en modo desarrollo

bash
Copiar
Editar
npm run dev
Esto iniciará el servidor local de Vite. Usualmente, puedes acceder a la app desde:

arduino
Copiar
Editar
http://localhost:5173
Build (opcional para producción)

Si deseas compilar el proyecto para producción:

bash
Copiar
Editar
npm run build
Luego puedes servirlo localmente con:

bash
Copiar
Editar
npm run preview


📚 Credits
Proyecto Integrador – Sprint 4.

Equipo de desarrollo: Luis Carabalí, Jonathan Arboleda, Andrés Aristizábal.

Docente: Fabián Valencia.

Basado en tecnologías modernas del ecosistema React.


🛡️ License
Este proyecto se entrega como parte de una actividad académica. No está destinado para uso comercial.