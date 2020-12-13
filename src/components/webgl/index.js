import React, { Suspense, useState } from 'react'
import { Canvas } from 'react-three-fiber';

import Chest from './Chest';
import Lights from './Lights';
import Floor from './Floor';
import UseCameraMove from './useCameraMove';
import Loader from './Loader';

function Scene() {

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Loader setIsLoaded={setIsLoaded} />}
      <Canvas style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, right: 0 }}
        camera={{ fov: 70, position: [6.909380897545731, -3.6499999999999986, -6.866536077189617] }
        }
        onCreated={({ camera }) => {
          camera.lookAt(2, -3, -9.8);
        }}
      >
        <Lights />
        {isLoaded && <UseCameraMove />}
        <Suspense fallback={null}>
          <Chest />
          <Floor />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Scene