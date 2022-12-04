import React from 'react'

const ItemComponent = ({title, description, price, image, rating}) => {
  return (
    <div className='card'>
      <img src = {image} className="card__image"></img> 
      <div className='card__body'>
        <h2 className='card__title'>{title}</h2>
        <p className='card__description'>{description}</p>
        <h3 className='card__price'>${price}</h3>
        <button className='card__btn'>Add to Cart</button>
      </div>
    </div>
  )
}

export default ItemComponent
