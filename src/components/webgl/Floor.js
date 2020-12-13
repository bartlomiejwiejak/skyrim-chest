import React from "react";
import { useGLTF } from 'drei';

const Floor = () => {
  const gltf = useGLTF('/scene/scene.gltf');

  return <mesh>
    <primitive object={gltf.scene} dispose={null} />
  </mesh>
};

export default Floor;