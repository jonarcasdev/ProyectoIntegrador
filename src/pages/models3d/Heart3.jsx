import {useGLTF} from '@react-three/drei';
import { useEffect } from 'react';

const Heart3 = () => {
    const heartModel = useGLTF('/models-3d/heart3.glb');

  
    
    return(
        <mesh>
            <primitive object = {heartModel.scene}/>
        </mesh>
    );

};

export default Heart3;

useGLTF.preload('/models/heart3.glb');