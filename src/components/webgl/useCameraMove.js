import { useEffect } from 'react'
import { useThree } from 'react-three-fiber';
import gsap from 'gsap';

function UseCameraMove() {
  const { camera } = useThree()

  useEffect(() => {
    const cameraEndValues = {
      x: 4.846472276597361,
      y: -2.210294971791372,
      z: -7.816071657508532
    }
    function handleMovingCameraViaMouse(e) {
      const positionX = (e.clientX - window.innerWidth / 2) * 0.001;
      const positionY = (e.clientY - window.innerHeight / 2) * 0.001;

      gsap.to(camera.position, 2.5, {
        z: cameraEndValues.z + positionX,
        y: cameraEndValues.y + positionY
      })
    }
    gsap.to(camera.position, 2.5, {
      ...cameraEndValues, ease: 'power3.out', onComplete: () => {
        window.addEventListener('mousemove', handleMovingCameraViaMouse)
      }
    })

    return () => {
      window.removeEventListener('mousemove', handleMovingCameraViaMouse)
    }
  }, [camera])
  return null;
}

export default UseCameraMove