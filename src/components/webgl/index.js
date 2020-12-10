import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';

import Chest from './Chest';
import Lights from './Lights';
import Floor from './Floor';

function Scene() {
  return (
    <Canvas style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, right: 0 }}
      camera={{ fov: 40, position: [0, 0, 250] }}
    >
      <Lights />
      <Suspense fallback={null}>
        <Chest />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
      />
      <Floor />
    </Canvas>
  )
}

export default Scene