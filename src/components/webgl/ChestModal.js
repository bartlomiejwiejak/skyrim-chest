import React, { useState, useEffect } from 'react'
import gsap from 'gsap';

function ChestModal({ isOpen }) {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen && !isMounted) {
      setIsMounted(true);
      setTimeout(() => {
        gsap.fromTo('.chest-modal', 1, { autoAlpha: 0 }, { autoAlpha: 1 })
        gsap.fromTo('.content', .5, { x: '-20%' }, { x: 0 })
        gsap.fromTo('.status', .5, { y: '20%' }, { y: 0 })
      }, 0)
    }
    else if (!isOpen && isMounted) {
      gsap.fromTo('.chest-modal', 1, {
        autoAlpha: 1, onComplete: () => {
        }
      }, { autoAlpha: 0 })
      gsap.fromTo('.content', .5, { x: 0 }, { x: '-20%' })
      gsap.fromTo('.status', .5, { y: 0 }, { y: '20%' })
      setTimeout(() => {
        setIsMounted(false);
      }, 1000)
    }
  }, [isOpen, isMounted])

  return isMounted && (
    <div className='chest-modal'>
      <div className="overlay"></div>
      <div className="content">
        <div className="left">
          <div className="background"></div>
          <h1>Chest</h1>
          <div>ARMOR</div>
        </div>
        <div className="right">
          <div className="background"></div>
        </div>
      </div>
      <div className="status">
        <div className='info'>
          <div className="icon">Esc</div>
          <div className="text">Close</div>
        </div>
        <div className="info">
        </div>
      </div>
    </div>
  )
}

export default ChestModal