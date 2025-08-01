import React, { useEffect, useState } from "react";
import "./Header.css";
import {
    auth,
    provider,
    signInWithPopup,
    db,
    setDoc,
    doc
} from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Header = () => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Iniciar sesión
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Guardar en Firestore
            await setDoc(doc(db, "usuarios", user.uid), {
                nombre: user.displayName,
                email: user.email,
                foto: user.photoURL,
                uid: user.uid,
                fechaInicioSesion: new Date()
            });

            setUser(user);
        } catch (error) {
            console.error("Error en login con Google:", error);
            alert("Error al iniciar sesión con Google");
        }
    };

    // Cerrar sesión
    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setMenuOpen(false);
    };

    // Escuchar cambios de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Efecto de scroll y detección de página quiz
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header");
            const isQuizPage = window.location.pathname.includes('/quiz');
            
            if (isQuizPage || window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        // Ejecutar al cargar la página para verificar si estamos en quiz
        handleScroll();
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Efecto para detectar cambios de ruta y aplicar estado recogido en quiz
    useEffect(() => {
        const header = document.querySelector("header");
        const isQuizPage = window.location.pathname.includes('/quiz');
        
        if (isQuizPage) {
            header.classList.add("scrolled");
        } else if (window.scrollY <= 50) {
            header.classList.remove("scrolled");
        }
    }, [window.location.pathname]);

    return (
        <header>
            <div className="logo">
                <h3>medvoxel</h3>
            </div>
            <div className="nav-container">
                <nav>
                    <a href="/">Inicio</a>
                    <div className="dropdown">
                        <a href="/enfermedades" className="dropdown-toggle">Enfermedades</a>
                        <div className="dropdown-menu">
                            <a href="/enfermedades/trombosis">Trombosis</a>
                            <a href="/enfermedades/arritmia">Arritmia</a>
                            <a href="/enfermedades/hipertension">Hipertensión</a>
                        </div>
                    </div>
                    <a href="/quiz">Quiz</a>
                    <a href="/sobre-nosotros">Sobre nosotros</a>
                </nav>
                <div className="auth-buttons">
                    {!user ? (
                        <button className="login-btn" onClick={handleGoogleLogin}>Iniciar sesión</button>
                    ) : (
                        <div className="user-avatar-container">
                            <img
                                src={user.photoURL || "/default-user.png"}
                                alt="avatar"
                                className="user-avatar"
                                onClick={() => setMenuOpen(!menuOpen)}
                            />
                            {menuOpen && (
                                <div className="user-menu">
                                    <button onClick={handleLogout}>Cerrar sesión</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
