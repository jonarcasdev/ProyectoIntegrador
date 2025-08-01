import { Outlet, useLocation } from "react-router";
import "./Enfermedades.css";

const Enfermedades = () => {

    const location = useLocation();
    const userData = location.state?.userData;

    // Function to get the title based on the current path
    const getTitle = () => {
        const path = location.pathname;
        if (path.includes('/trombosis')) {
            return 'Trombosis';
        } else if (path.includes('/arritmia')) {
            return 'Arritmia';
        } else if (path.includes('/hipertension')) {
            return 'Hipertension';
        } else {
            return 'Enfermedades';
        }
    };

    return (
    <div className="Enfermedades">
        <h1>{getTitle()}</h1>
        <p>{userData?.displayName}</p>
        <Outlet /> 
    </div>
    )
}
export default Enfermedades;