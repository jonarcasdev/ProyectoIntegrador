// Textohtml.jsx
import { Html } from '@react-three/drei'
import './Textohtml.css'

const Textohtml = ({ buttontext, position, distanceFactor, visible }) => {
    if (!visible) return null;

    return (
        <Html
            distanceFactor={distanceFactor}
            position={position}
            wrapperClass="Textohtml"
        >
            <div className="card">
                <p className="h1canvas">{buttontext}</p>
            </div>
        </Html>
    )
}

export default Textohtml
