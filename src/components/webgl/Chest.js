import React, { useEffect, useRef, useCallback } from 'react'
import { useGLTF } from "drei";
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import close from '../../assets/sounds/close-chest.mp3';
import open from '../../assets/sounds/open-chest.mp3';

const closeSound = new Audio(close);
const openSound = new Audio(open);

function Chest({ context }) {

  const gltf = useGLTF('/chest/scene.gltf', true);
  const mixer = useRef(new THREE.AnimationMixer(gltf.scene));
  const action = useRef(null);
  const isAnimating = useRef(false);

  const handleChest = useCallback((open) => {
    if (isAnimating.current) return;
    if ((open && context.state.isOpen)) return;
    if (!open && !context.state.isOpen) return;
    isAnimating.current = true;
    if (open) {
      openSound.play();
    } else {
      closeSound.play();
    }
    action.current.paused = false;
    action.current.play();
    let timeRatio = 0.7;
    if (!open) {
      timeRatio = 0.3;
    }
    context.dispatch({ type: 'HANDLE_CHEST', payload: open });
    setTimeout(() => {
      action.current.paused = true
      isAnimating.current = false;
    }, (action.current._clip.duration * timeRatio) * 1000)
  }, [context])

  useEffect(() => {
    const overlay = document.querySelector('.overlay');
    const handleEscaping = (e) => {
      if (isAnimating.current) return;
      if (context.state.isOpen && e.keyCode === 27) {
        handleChest(false);
      } else if (context.state.isOpen && overlay) {
        handleChest(false)
      }
    }
    document.addEventListener('keydown', handleEscaping)
    if (overlay) {
      overlay.addEventListener('click', handleEscaping);
    }

    return () => {
      document.removeEventListener('keydown', handleEscaping)
      if (overlay) {
        overlay.removeEventListener('click', handleEscaping)
      }
    }
  }, [context.state, handleChest])

  useEffect(() => {
    action.current = mixer.current.clipAction(gltf.animations[0]);
  }, [gltf])



  useFrame((state, delta) => {
    mixer.current.update(delta)
  })

  return <>
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