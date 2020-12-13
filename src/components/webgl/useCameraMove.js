import { useEffect } from 'react'
import { useThree } from 'react-three-fiber';
import gsap from 'gsap';

function UseCameraMove() {
  const { camera } = useThree()

  useEffect(() => {
    gsap.to(camera.position, 2.5, { x: 4.846472276597361, y: -2.210294971791372, z: -7.816071657508532 })
  }, [camera])
  return null;
}

export default UseCameraMove