import React from "react";
import { useGLTF } from 'drei';

const Floor = () => {
  const gltf = useGLTF('/skyrim-chest/scene/scene.gltf');

  return <mesh>
    <primitive object={gltf.scene} dispose={null} />
  </mesh>
};

export default Floor;