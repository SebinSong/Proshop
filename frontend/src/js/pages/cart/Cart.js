import React, { useState, useEffect } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectCartItems } from '@store/features/cartSlice.js'
import { parseQueryString } from '@utilities'
import CartItem from './cart-item/CartItem.js'
import './Cart.scss'

const { PageTemplate } = React.Global

export default function Cart () {
  // states
  const dispatch = useDispatch()
  const location = useLocation()
  const { id: productId = '' } = useParams()

  const cartItems = (useSelector(selectCartItems) || [])
  console.log('cartItems: ', cartItems)
  const isCartEmpty = cartItems.length === 0

  // effects
  useEffect(() => {
    if (!productId) return

    const queries = parseQueryString(location.search)
    const quantity = queries.qty ? parseInt(queries.qty) : null

    if (quantity !== null) {
      dispatch(addToCart(productId, quantity))
    }
  }, [productId])

  return (
    <PageTemplate classes='page-cart'>
      <h1 className="page-template__page-heading">
        <i className='icon-cart prefix-icon'></i>
        <span>My cart</span>
      </h1>

      {
        isCartEmpty
        ? <div className='cart-is-empty'>
            <i className='icon-bathtub'></i>
            <p className='cart-is-empty__text'>The cart is empty. Go check out the <Link to='/'>latest products</Link>.</p>
          </div>
        : <ul className='cart-items-list'>
            {
              cartItems.map(item => <CartItem key={item._id} {...item} />)
            }
          </ul>
      }
    </PageTemplate>
  )
}
