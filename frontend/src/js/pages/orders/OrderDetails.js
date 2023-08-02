import React, { useContext } from 'react'
import OrderItemsList from './order-items-list/OrderItemsList.js'
import { useParams } from 'react-router-dom'
import { useGetOrderDetails } from '@store/features/ordersApiSlice.js'
import { combineShippingAddress, copyTextToClipboard, formatMoney } from '@utilities'
import { ToastContext } from '@hooks/use-toast'
// import css
import './OrderDetails.scss'
import './OrderShared.scss'

const { ProtectedPage, PageTemplate, LoaderSpinner } = React.Global

export default function OrderDetails () {
  const { id: orderId } = useParams()
  const {
    data: orderDetails,
    isLoading,
    refetch,
    isFetching,
    isError,
    error
  } = useGetOrderDetails(orderId)
  const { addToastItem, unloadAllToast, isToastActive } = useContext(ToastContext)

  // methods
  const copyOrderId = () => {
    copyTextToClipboard(orderId).then(() => {
      if (isToastActive()) {
        unloadAllToast()
      }

      addToastItem({
        type: 'success',
        heading: 'Copied!',
        content: 'Your Order ID has been copied to the clipboard',
        delay: 3 * 1000
      })
    })
  }

  // render
  const queryStatusFeedback = (isLoading || isFetching)
    ? (
        <LoaderSpinner>
          <span>Loading<br />Your order details..</span>
        </LoaderSpinner>
      )
    : isError
      ? <p>{error?.message}</p>
      : null

  if (queryStatusFeedback) {
    return queryStatusFeedback
  }

  const {
    shippingAddress,
    user,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = orderDetails

  return (
    <ProtectedPage>
      <PageTemplate classes='page-order-details'>
        <div className='page-width-constraints'>
          <div className='mb-40'>
            <h1 className="page-template__page-heading is-underlined">Order details</h1>
            <p className='order-id'>
              <label># Order ID :</label>
              <span onClick={copyOrderId}>{orderId}</span>
            </p>
          </div>

          <ul className='order-details-list'>
            <li className='order-details-field is-small'>
              <span className='label'>Shipping address</span>
              <span className='details-value'>{combineShippingAddress(shippingAddress)}</span>
            </li>

            <li className='order-details-field is-small'>
              <span className='label'>Customer details</span>
              <div className='details-value'>
                <div className='sub-details'>
                  <label>name:</label>
                  <span className='value'>{user.name}</span>
                </div>

                <div className='sub-details'>
                  <label>email:</label>
                  <span className='value'>{user.email}</span>
                </div>
              </div>
            </li>

            <li className='order-details-field is-small'>
              <span className='label'>Delivery status</span>
              <span className='details-value item-status is-not-completed'>Not delivered yet</span>
            </li>

            <li className='order-details-field is-small'>
              <span className='label'>Payments</span>

              <div className='details-value'>
                <div className='sub-details'>
                  <label>method:</label>
                  <span className='value'>{paymentMethod}</span>
                </div>

                <div className='sub-details'>
                  <label>status:</label>
                  <span className='value item-status is-completed'>Paid</span>
                </div>
              </div>
            </li>

            <li className='order-details-field'>
              <span className='label'>Order items</span>
              <OrderItemsList items={orderItems} />
            </li>
          </ul>

          <div className='price-summary-container mt-40'>
            <h3 className='is-title-5 is-underlined mb-30'>Price details</h3>

            <ul className='price-summary-table'>
              <li className='price-summary-item'>
                <label>Items :</label>
                <span className='price-summary-item__value'>{formatMoney(itemsPrice)}</span>
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
            </ul>
          </div>
        </div>
      </PageTemplate>
    </ProtectedPage>
  )
}
