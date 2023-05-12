import React, { useState } from 'react'
import QuantitySelector from '@components/quantity-selector/QuantitySelector.js'
import './CartItem.scss'

export default function CartItem ({
  image: imgFileName = '', name, brand, category,
  countInStock, qty, price
}) {
  // local states
  const imgPath = `images/products/${imgFileName}`

  // methods
  const onQuantityChange = (val) => {}

  return (
    <div className='cart-item'>
      <img className='cart-item__img' src={imgPath} />

      <div className='cart-item__product-details'>
        <h4 className='cart-item__product-name'>{name}</h4>

        <div className='cart-item__brand-and-category'>
          <span className='item-brand'>{brand}</span>
          <span className='slash'>/</span>
          <span className='item-category'>{category}</span>
        </div>

        <div className='cart-item__price has-yeseva'>$ {price}</div>
      </div>

      <div className='cart-item__qty'>
        <QuantitySelector min={1} max={countInStock} value={qty} onChange={onQuantityChange} />
      </div>

      <div className='cart-item__total-price has-yeseva'>$ {qty * price}</div>

      <div className='cart-item__remove-btn'>
        <button className='icon'>
          <i className='icon-gear'></i>
        </button>
      </div>
    </div>
  )
}
