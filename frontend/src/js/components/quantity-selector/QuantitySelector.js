import React, { useState } from 'react'
import './QuantitySelector.scss'

export default function QuantitySelector ({
  min = 0, max = 100, value = null,
  onChange = () => {}
}) {
  // state
  const [qty, setQty] = useState(value || min)

  // methods
  const increment = () => {}
  
  return (
    <div className='quantity-selector'>
      <button className='quantity-selector__decrement-btn' type='button'>-</button>
      <span className='quantity-selector__qty'>{qty}</span>
      <button className='quantity-selector__increment-btn' type='button'>+</button>
    </div>
  )
}
