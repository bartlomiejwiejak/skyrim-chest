import React, { useState, useEffect, useRef } from 'react'
import { useGLTF, Html } from "drei";
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import ChestModal from './ChestModal';
import close from '../../assets/sounds/close-chest.mp3';
import open from '../../assets/sounds/open-chest.mp3';

const closeSound = new Audio(close);
const openSound = new Audio(open);

function Chest() {

  const gltf = useGLTF('/chest/scene.gltf', true);
  const mixer = useRef(new THREE.AnimationMixer(gltf.scene));
  const [isOpen, setIsOpen] = useState(false);
  const action = useRef(null);
  const isOpenRef = useRef(false);

  useEffect(() => {
    const handleEscaping = (e) => {
      if (isOpen && e.keyCode === 27) {
        handleChest(false);
      }
    }
    document.addEventListener('keydown', handleEscaping)

    return () => {
      document.removeEventListener('keydown', handleEscaping)
    }
  }, [setIsOpen, isOpen])

  useEffect(() => {
    action.current = mixer.current.clipAction(gltf.animations[0]);
  }, [gltf])

  const handleChest = (open) => {
    if ((open && isOpenRef.current)) return;
    if (!open && !isOpenRef.current) return;
    if (open) {
      openSound.play();
      isOpenRef.current = true;
    } else {
      closeSound.play();
      isOpenRef.current = false;
    }
    action.current.paused = false;
    action.current.play();
    let timeRatio = 0.7;
    if (!open) {
      timeRatio = 0.3;
    }
    setTimeout(() => {
      action.current.paused = true
      setIsOpen(open);
    }, (action.current._clip.duration * timeRatio) * 1000)
  }

  useFrame((state, delta) => {
    mixer.current.update(delta)
  })

  return <>
    {isOpen && <Html fullscreen >
      <ChestModal />
    </Html>}
    <mesh scale={[0.01, 0.01, 0.01]} position={[2, -3, -9.8]} rotation={[.1, 1.1, .1]} onClick={handleChest.bind(this, true)} onPointerOver={() => {
      document.body.style.cursor = 'pointer';
    }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <primitive object={gltf.scene} dispose={null} />
    </mesh>
  </>
}

export default Chest