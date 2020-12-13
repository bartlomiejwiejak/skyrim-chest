import React, { useState, useEffect } from 'react'
import { useGLTF, HTML } from "drei";

import ChestModal from './ChestModal';

function Chest() {

  const gltf = useGLTF('/chest/scene.gltf', true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscaping = (e) => {
      if (isOpen && e.keyCode === 27) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscaping)

    return () => {
      document.removeEventListener('keydown', handleEscaping)
    }
  }, [setIsOpen, isOpen])

  return <>
    {isOpen && <HTML fullscreen>
      <ChestModal />
    </HTML>}
    <mesh scale={[0.01, 0.01, 0.01]} position={[2, -3, -9.8]} rotation={[.1, 1.1, .1]} onClick={() => setIsOpen(false)} >
      <primitive object={gltf.scene} dispose={null} />
    </mesh>
  </>
}

export default Chest