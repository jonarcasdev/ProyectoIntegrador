import React from 'react'
import './Tittle.css'
import { Html,Text } from '@react-three/drei'
const Tittle = ({tittle,position}) => {
  return (

        <Text
        position={position}
        color ={"black"}
        anchorX={"center"}
        anchorY={"center"}
        fontSize={0.0055}
        font="/fonts/Tiling.ttf"
        >
            {tittle}
        </Text>
  )
}

export default Tittle