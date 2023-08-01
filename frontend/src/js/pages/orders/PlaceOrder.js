import React, { useEffect } from 'react'
import { useSelector } from '@redux-api'
import { useNavigate } from 'react-router-dom'
import Stepper from '@components/stepper/Stepper'
import { PRODUCT_CHECKOUT_STEPS, formatMoney } from '@utilities'
import {
  selectShippingAddress,
  selectCombinedShippingAddress,
  selectPaymentMethod,
  selectCartItems
} from '@store/features/cartSlice.js'

import './PlaceOrder.scss'

const { ProtectedPage, PageTemplate } = React.Global

export default function PlaceOrder () {
  const shippingAddress = useSelector(selectShippingAddress)
  const shippingAddressCombined = Object.values(shippingAddress || {}).join(', ')
  const paymentMethod = useSelector(selectPaymentMethod)
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()

  // effects
  useEffect(() => {
    // if (Object.keys(shippingAddress || {}).length < 4) {
    //   navigate('/shipping')
    // }

    // if (!paymentMethod) {
    //   navigate('/payment')
    // }
  }, [])

  return (
    <ProtectedPage>
      <PageTemplate classes='page-place-order'>
        <div className='page-width-constraints'>
          <Stepper classes='page-stepper' list={PRODUCT_CHECKOUT_STEPS} current={4} />
        </div>

        <div className='page-place-order__container'>
          <h1 className="page-template__page-heading">Place your order</h1>

          <div className='place-order__content'>
            <div className='order-details-container'>
              <h3 className='is-title-5 sub-heading is-order-details'>Order details</h3>

              <ul>
                <li className='order-details-field'>
                  <span className='label'>Shipping address</span>
                  <span className='details-value'>{shippingAddressCombined}</span>
                </li>

                <li className='order-details-field'>
                  <span className='label'>Payment method</span>
                  <span className='details-value'>{paymentMethod}</span>
                </li>

                <li className='order-details-field'>
                  <span className='label'>Order items</span>
                  <ul className='order-items-list'>
                    {
                      cartItems.map(
                        item => (
                          <li className='order-items-list__item' key={item._id}>
                            <img className='product-image'
                              src={`images/products/${item.image}`}
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
                </li>
              </ul>
            </div>

            <div className='payment-summary-container'>
              <h3 className='is-title-5 sub-heading is-payment'>Payment summary</h3>
            </div>
          </div>
        </div>
      </PageTemplate>
    </ProtectedPage>
  )
}
