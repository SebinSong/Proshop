import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { id: productId = '' } = useParams()

  const cartItems = useSelector(selectCartItems)
  const subTotal = useSelector(selectCartTotalAmount)
  const totalQuantities = cartItems.reduce((accu, item) => accu + item.qty, 0)
  const isCartEmpty = totalQuantities === 0

  // methods
  const navToShipping = () => { navigate('/login?redirect=shipping') }

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
        : <div className='page-cart__content'>
            <ul className='cart-items-list'>
              <li className='cart-items-list__headings'>
                <span className='heading__product'>product</span>
                <span className='heading__quantity'>qty</span>
                <span className='heading__amount'>amount</span>
              </li>
              {
                cartItems.map(item => <CartItem key={item._id} {...item} />)
              }
            </ul>

            <div className='page-cart__cart-summary'>
              <div className='cart-summary__row'>
                <label>Total quantity: </label>

                <span className='subtotal__qty'>
                  <span>{totalQuantities}</span>
                  <span>items</span>
                </span>
              </div>

              <div className='cart-summary__row'>
                <label>subtotal:</label>
                <span className='subtotal__amount has-yeseva'>{formatMoney(subTotal)}</span>
              </div>

              <div className='cart-summary__row checkout-btn'>
                <button className='is-primary' type='button' onClick={navToShipping}>
                  <span>Proceed to checkout</span>
                  <i className='icon-arrow-right is-postfix'></i>
                </button>
              </div>
            </div>
          </div>
      }
    </PageTemplate>
  )
}
