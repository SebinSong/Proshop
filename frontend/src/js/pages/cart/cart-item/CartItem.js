import React from 'react'
import { useDispatch } from 'react-redux'
import { formatMoney } from '@utilities'
import { addItemToCartList, removeCartItem } from '@store/features/cartSlice.js'
import QuantitySelector from '@components/quantity-selector/QuantitySelector.js'
import './CartItem.scss'

export default function CartItem (props) {
  // local states
  const dispatch = useDispatch()
  const {
    image: imgFileName = '', name, brand, category,
    countInStock, qty, price, _id
  } = props
  const imgPath = `images/products/${imgFileName}`

  // methods
  const onQuantityChange = (val) => { dispatch(addItemToCartList({ ...props, qty: val })) }
  const handleRemoveFromCart = () => { dispatch(removeCartItem(_id)) }

  return (
    <li className='cart-item'>
      <div className='cart-item__info-block'>
        <img className='cart-item__img' src={imgPath} />

        <div className='cart-item__product-details'>
          <h4 className='cart-item__product-name'>{name}</h4>

          <div className='cart-item__brand-and-category'>
            <span className='item-brand'>{brand}</span>
            <span className='slash'>/</span>
            <span className='item-category'>{category}</span>
          </div>

          <div className='cart-item__price has-yeseva'>{formatMoney(price)}</div>
        </div>
      </div>

      <div className='cart-item__action-block'>
        <QuantitySelector classes='cart-item__qty' min={1} max={countInStock}
          value={qty} onChange={onQuantityChange} />

        <div className='cart-item__total-price has-yeseva'>{formatMoney(qty * price)}</div>

        <button className='icon cart-item__remove-btn' onClick={handleRemoveFromCart}>
          <i className='icon-trash-can'></i>
        </button>
      </div>
    </li>
  )
}
