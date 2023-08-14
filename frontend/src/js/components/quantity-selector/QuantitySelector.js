import React, { useState, useEffect } from 'react'
import { classNames as cn } from '@utilities'
import './QuantitySelector.scss'

export default function QuantitySelector ({
  min = 0, max = 100, value = null,
  onChange = null, classes = '', isSmall = false,
  disabled = false
}) {
  // state
  const [qty, setQty] = useState(value || min)

  // methods
  const increment = () => {
    if (qty < max) { setQty(qty + 1) }
  }
  const decrement = () => {
    if (qty > min) { setQty(qty - 1) }
  }

  // effects
  useEffect(() => {
    onChange && onChange(qty)
  }, [qty])
  
  return (
    <div className={cn('quantity-selector', classes, isSmall && 'is-small')}>
      <button className='quantity-selector__decrement-btn'
        type='button' onClick={decrement}>-</button>
      <span className='quantity-selector__qty'>{qty}</span>
      <button className='quantity-selector__increment-btn'
        type='button' onClick={increment}>+</button>
    </div>
  )
}
