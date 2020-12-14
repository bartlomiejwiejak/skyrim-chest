import React, { useState, useEffect } from 'react'
import gsap from 'gsap';

import ItemInfo from './ItemInfo';
import ironHelmet from '../../assets/images/Iron_Helmet.png';
import steelSword from '../../assets/images/steel-sword.png';
import lootSound from '../../assets/sounds/lootSound.mp3';

const loot = new Audio(lootSound);

function ChestModal({ isOpen }) {

  const [isMounted, setIsMounted] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [weight, setWeight] = useState(122);
  const [items, setItems] = useState([
    {
      id: 0,
      name: 'Iron helmet',
      src: ironHelmet,
      weight: 6,
      value: 60,
      armor: 17,
      description: 'The Iron Helmet is worn by the Dragonborn in all pre-release trailers and artwork for the game, making it somewhat of a signature piece of armor for the main character.'
    },
    {
      id: 1,
      name: 'Steel sword',
      src: steelSword,
      weight: 8,
      value: 120,
      damage: 31,
      description: 'Passing by a Hold Guard with a steel sword equipped may trigger the line, "Favor a Steel Sword do ya? Good choice for slashing or stabbing."'
    },
  ])

  const handleItemTake = (id) => {
    loot.play();
    let lastItemIndex = 0;

    const newState = items.filter((item, index) => {
      if (item.id === id) {
        lastItemIndex = index;
      }
      return item.id !== id
    });
    setWeight(prev => prev + items.find(item => item.id === id).weight)
    setItems(newState);

    if (newState.length === 0) {
      setCurrentItem(null);
    }
    else if (lastItemIndex > 0) {
      setCurrentItem(items[lastItemIndex - 1].id);
    } else {
      setCurrentItem(items[lastItemIndex + 1].id)
    }
  }

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
          <div className="items">
            {items.map(item => <div key={item.id} style={item.id === currentItem ? { color: 'white' } : {}} onClick={handleItemTake.bind(this, item.id)} onMouseEnter={() => { setCurrentItem(item.id) }}>{item.name}</div>)}
          </div>
        </div>
      </div>
      {currentItem !== null ? <ItemInfo {...items.find(item => item.id === currentItem)} /> : null}
      <div className="status">
        <div className='info'>
          <div className="icon">Esc</div>
          <div className="text">Close</div>
        </div>
        <div className='info'>
          <div className="icon">L</div>
          <div className="text">Take</div>
        </div>
        <div className="character">
          <div>
            <div>
              Carry Weight
          </div>
            <div>
              {weight}/320
            </div>
          </div>
          <div>
            <div>
              Gold
          </div>
            <div>
              1230
          </div>
          </div>
          <div className="health">
            <div className="edge left"></div>
            <div className="edge edge--white left"></div>
            <div className="edge edge--white right"></div>
            <div className="edge right"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChestModal