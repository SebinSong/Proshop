import React, { useEffect } from 'react'
import { useSelector, useDispatch } from '@redux-api'
import { useNavigate } from 'react-router-dom'
import Stepper from '@components/stepper/Stepper'
import { PRODUCT_CHECKOUT_STEPS, formatMoney } from '@utilities'
import {
  selectShippingAddress,
  selectCombinedShippingAddress,
  selectPaymentMethod,
  selectCartItems,
  selectCartPrices
} from '@store/features/cartSlice.js'
import { useCreateOrders } from '@store/features/ordersApiSlice.js'

import './PlaceOrder.scss'

const { ProtectedPage, PageTemplate } = React.Global

export default function PlaceOrder () {
  const shippingAddress = useSelector(selectShippingAddress)
  const shippingAddressCombined = Object.values(shippingAddress || {}).join(', ')
  const paymentMethod = useSelector(selectPaymentMethod)
  const cartItems = useSelector(selectCartItems)
  const {
    itemsPrice: subTotal,
    shippingPrice,
    taxPrice,
    totalPrice
  } = useSelector(selectCartPrices)
  const [createOrders, { isLoading }] = useCreateOrders() 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // methods
  const onPlaceHolderClick = async () => {
    try {
      alert('TODO: Implement!')
    } catch (err) {

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
                    <button className='is-primary' type='button' onClick={onPlaceHolderClick}>
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
