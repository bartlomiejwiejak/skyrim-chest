import React from 'react'
import { useProgress } from 'drei';
import gsap from 'gsap';

function Loader({ setIsLoaded }) {
  const { progress } = useProgress()
  let content = progress.toFixed(0);

  if (progress === 100) {
    content = <div onClick={() => {
      gsap.to('.loader', .7, { opacity: 0, onComplete: setIsLoaded.bind(this, true) })
    }}>Start</div>
  }

  return (
    <div className='loader'>
      <div style={progress === 100 ? { cursor: 'pointer' } : {}} className="progress">{content}</div>
    </div>
  )
}

export default Loader