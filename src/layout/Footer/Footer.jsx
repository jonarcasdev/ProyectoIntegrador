import { Link } from "react-router";
import "./Footer.css";

import tiktokIcon from '../../assets/icons/icons8-tik-tok.svg';
import instagramIcon from '../../assets/icons/icons8-instagram.svg';
import facebookIcon from '../../assets/icons/icons8-facebook.svg';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <h1 className="footer-title">Mapa del sitio</h1>
                <div className="footer-grid">
                    <div className="footer-column">
                        <h3>Inicio</h3>
                        <ul>
                            <li>Introducción</li>
                            <li>Enfermedades</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Enfermedades</h3>
                        <ul>
                            <li>
                                <Link
                                    to="/enfermedades/trombosis"
                                    onClick={(e) => {
                                        e.preventDefault(); // Previene la navegación inmediata
                                        window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba
                                        setTimeout(() => {
                                            window.location.href = "/enfermedades/trombosis"; // Navega después del desplazamiento
                                        }, 500); // Pequeño retraso para que se complete el scroll
                                    }}
                                >
                                    Trombosis
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/enfermedades/arritmia"
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        window.scrollTo({ top: 0, behavior: "smooth" }); 
                                        setTimeout(() => {
                                            window.location.href = "/enfermedades/arritmia";
                                        }, 500);
                                    }}
                                >
                                    Arritmia
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/enfermedades/hipertension"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                        setTimeout(() => {
                                            window.location.href = "/enfermedades/hipertension";
                                        }, 500);
                                    }}
                                >
                                    Hipertension
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Quiz</h3>
                        <ul>
                            <li>Ranking</li>
                            <li>Quiz</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Sobre nosotros</h3>
                        <ul>
                            <li>Equipo de trabajo</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <li>©️ Derechos reservados</li>
                    <div className="footer-icons">
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                            <img src={tiktokIcon} alt="TikTok" className="social-icon" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                            <img src={instagramIcon} alt="Instagram" className="social-icon" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                            <img src={facebookIcon} alt="Facebook" className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;