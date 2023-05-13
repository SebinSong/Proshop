import React, { useEffect } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectCartItems, selectCartTotalAmount } from '@store/features/cartSlice.js'
import { parseQueryString, formatMoney } from '@utilities'
import CartItem from './cart-item/CartItem.js'
import './Cart.scss'

const { PageTemplate } = React.Global

export default function Cart () {
  // states
  const dispatch = useDispatch()
  const location = useLocation()
  const { id: productId = '' } = useParams()

  const cartItems = useSelector(selectCartItems)
  const subTotal = useSelector(selectCartTotalAmount)
  const totalQuantities = cartItems.reduce((accu, item) => accu + item.qty, 0)
  const isCartEmpty = totalQuantities === 0

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
            <li className='cart-items-list__headings'>
              <span className='heading__product'>product</span>
              <span className='heading__quantity'>qty</span>
              <span className='heading__amount'>amount</span>
            </li>
            {
              cartItems.map(item => <CartItem key={item._id} {...item} />)
            }
            <li className='cart-items-list__subtotal'>
              <span className='cart-subtotal-qty'>Subtotal ( {totalQuantities} items ): </span>
              <span className='cart-subtotal-amount has-yeseva'>{formatMoney(subTotal)}</span>
            </li>
          </ul>
      }
    </PageTemplate>
  )
}
