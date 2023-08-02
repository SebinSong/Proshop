import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from '@redux-api'
import { useNavigate } from 'react-router-dom'
import Stepper from '@components/stepper/Stepper'
import OrderItemsList from './order-items-list/OrderItemsList.js'
import { ToastContext } from '@hooks/use-toast'
import { PRODUCT_CHECKOUT_STEPS, formatMoney, combineShippingAddress } from '@utilities'
import {
  selectShippingAddress,
  selectPaymentMethod,
  selectCartItems,
  selectCartPrices,
  unloadCart
} from '@store/features/cartSlice.js'
import { useCreateOrders } from '@store/features/ordersApiSlice.js'

import './PlaceOrder.scss'

const { ProtectedPage, PageTemplate } = React.Global

export default function PlaceOrder () {
  const shippingAddress = useSelector(selectShippingAddress)
  const paymentMethod = useSelector(selectPaymentMethod)
  const cartItems = useSelector(selectCartItems)
  const {
    itemsPrice: subTotal,
    shippingPrice,
    taxPrice,
    totalPrice
  } = useSelector(selectCartPrices)
  const [createOrders, { isLoading, error }] = useCreateOrders() 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // context
  const { addToastItem, unloadAllToast, isToastActive } = useContext(ToastContext)

  // methods
  const placeOrderHandler = async () => {
    try {
      if (isToastActive()) {
        unloadAllToast()
      }

      const res = await createOrders({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subTotal,
        shippingPrice,
        taxPrice,
        totalPrice
      }).unwrap()

      dispatch(unloadCart())
      navigate(`/order-details/${res._id}`)
      addToastItem({
        heading: 'Order submitted!',
        type: 'success',
        delay: 5 * 1000
      })
    } catch (err) {
      addToastItem({
        heading: 'Failed to process your order!',
        type: 'warning',
        content: err?.data?.message || err.error || 'Something went wrong. please try again',
        delay: 5 * 1000
      })
    }
  }

  // effects
  useEffect(() => {
    if (Object.keys(shippingAddress || {}).length < 4) {
      navigate('/shipping')
    }

    if (!paymentMethod) {
      navigate('/payment')
    }
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
                  <span className='details-value'>{combineShippingAddress(shippingAddress)}</span>
                </li>

                <li className='order-details-field'>
                  <span className='label'>Payment method</span>
                  <span className='details-value'>{paymentMethod}</span>
                </li>

                <li className='order-details-field'>
                  <span className='label'>Order items</span>
                  <OrderItemsList items={cartItems} />
                </li>
              </ul>
            </div>

            <div className='payment-summary-container'>
              <h3 className='is-title-5 sub-heading is-payment'>Price summary</h3>

              <ul className='price-summary-table'>
                  <li className='price-summary-item'>
                    <label>Items :</label>
                    <span className='price-summary-item__value'>{formatMoney(subTotal)}</span>
                  </li>

                  <li className='price-summary-item'>
                    <label>Shipping fee :</label>
                    <span className='price-summary-item__value'>{formatMoney(shippingPrice)}</span>
                  </li>

                  <li className='price-summary-item'>
                    <label>Tax :</label>
                    <span className='price-summary-item__value'>{formatMoney(taxPrice)}</span>
                  </li>

                  <li className='price-summary-item for-total-price'>
                    <label className='has-text-blue-sea'>Total :</label>
                    <span className='price-summary-item__value'>{formatMoney(totalPrice)}</span>
                  </li>

                  <li className='price-summary-item for-button'>
                    <button className='is-primary'
                      type='button'
                      onClick={placeOrderHandler}
                      disabled={isLoading}
                    >
                      <span>Place Order</span>
                      <i className='icon-arrow-right is-postfix'></i>
                    </button>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </PageTemplate>
    </ProtectedPage>
  )
}
