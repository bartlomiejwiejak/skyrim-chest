import React from 'react'

function ItemInfo({ src, name, weight, value, description, armor, damage }) {
  return (
    <div className='item-info'>
      <div className="wrapper">
        <img src={src} alt="" />
        <div className="about">
          <div className="background"></div>
          <div className="name">{name}</div>
          {armor && <div className="armor"><div>Armor</div> <span>{armor}</span></div>}
          {damage && <div className="damage"><div>Damage</div> <span>{damage}</span></div>}
          <div className="weight"><div>Weight</div> <span>{weight}</span></div>
          <div className="value"><div>Value</div> <span>{value}</span></div>
          <div className="description">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default ItemInfo