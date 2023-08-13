import React from 'react'
import { formatMoney } from '@utilities'
import { BASE_URL } from '@frontend-utils/constants.js'
import './OrderItemsList.scss'

export default function OrderItemsList ({ items, classes = '' }) {
  const imgSrc = item.image ? `images/products/${item.image}` : (BASE_URL + item.imageAbsPath) || ''
  return (
    <ul className={`order-items-list ${classes}`}>
      {
        items.map(
          item => (
            <li className='order-items-list__item' key={item._id}>
              <img className='product-image'
                src={imgSrc}
                alt={item.name} />
              
              <h4 className='product-name'>{item.name}</h4>

              <span className='product-amount'>
                <span className='product-qty'>{item.qty}</span>
                x
                <span className='product-price has-yeseva'>{formatMoney(item.price)}</span>
              </span>
            </li>
          )
        )
      }
    </ul>
  )
}
