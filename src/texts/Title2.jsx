import { Html } from "@react-three/drei";

const Title2 = ({ title }) => {
    return (
        <Html
            occlude
            center
            position={[-2.5, -0.09, 0]}
            distanceFactor={5}
            wrapperClass="title1"
            rotation={[0, 0, 0]}
            transform={false}
        >
            <div
                style={{
                    width: "150px",
                    height: "70px",
                    background: "rgba(224,224,224,0.7)", // Added transparency
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    padding: "18px",
                }}
            >
                <h1 style={{ margin: 0, fontSize: "1.2rem", textAlign: "center" }}>{title}</h1>
            </div>
        </Html>
    );
};

export default Title2;
