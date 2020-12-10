import React from 'react'
import { useGLTF } from "drei";

function Chest() {

  const gltf = useGLTF('/scene.gltf', true);


  return <mesh position={[0, -30, 0]} >
    <primitive object={gltf.scene} dispose={null} />
  </mesh>
}

export default Chest