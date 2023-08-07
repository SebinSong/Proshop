import React, { useContext, useEffect } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSelector } from '@redux-api'
import OrderItemsList from './order-items-list/OrderItemsList.js'
import { selectUserInfo } from '@store/features/authSlice'
import { ToastContext } from '@hooks/use-toast'
import { useParams } from 'react-router-dom'
import {
  useGetOrderDetails,
  useGetPayPalClientId,
  usePayOrder
} from '@store/features/ordersApiSlice.js'
import {
  combineShippingAddress,
  copyTextToClipboard,
  formatMoney,
  ifElseComponent,
  humanDate,
  classNames as cn
} from '@utilities'
// import css
import './OrderDetails.scss'
import './OrderShared.scss'

const { ProtectedPage, PageTemplate, LoaderSpinner } = React.Global

export default function OrderDetails () {
  const { id: orderId } = useParams()
  const {
    data: orderDetails,
    isLoading,
    refetch: refetchOrderDetails,
    isFetching,
    isError,
    error
  } = useGetOrderDetails(orderId)
  const userInfo = useSelector(selectUserInfo)
  const { addToastItem, unloadAllToast, isToastActive } = useContext(ToastContext)
  const [payOrder, { isLoading: isPayOrderLoading }] = usePayOrder()
  const [{ isPending }, paypalDispatch] =usePayPalScriptReducer()
  const {
    data: paypalData,
    isLoading: isPaypalClientLoading,
    error: paypalClientError
  } = useGetPayPalClientId()

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

  const loadPaypalScript = async () => {
    await paypalDispatch({
      type: 'resetOptions',
      value: {
        'client-id': paypalData.clientId,
        currency: 'USD'
      }
    })

    await paypalDispatch({
      type: 'setLoadingStatus',
      value: 'pending'
    })
  }

  // paypal button methods
  const onPaypalApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder ({ orderId, details })

        addToastItem({
          type: 'success',
          heading: 'Payment successful!',
          content: 'Your purchase has been successfully processed.',
          delay: 3 * 1000
        })
        refetchOrderDetails()
      } catch (err) {
        addToastItem({
          heading: 'Payment Failed!',
          type: 'warning',
          content: err?.data?.message || 'Something went wrong while processing your payment. Please try it again',
          delay: 5 * 1000
        })
      }
    })
  }
  const onApproveTest = async () => {
    try {
      await payOrder ({
        orderId,
        details: {
          payer: {}
        }
      })

      addToastItem({
        type: 'success',
        heading: 'Payment successful!',
        content: 'Your purchase has been successfully processed.',
        delay: 3 * 1000
      })
      refetchOrderDetails()
    } catch (err) {
      addToastItem({
        heading: 'Test payment Failed!',
        type: 'warning',
        content: err?.message || 'Something went wrong!',
        delay: 5 * 1000
      })
    }
  }
  const onPaypalError = (err) => {
    addToastItem({
      heading: 'Test payment Failed!',
      type: 'warning',
      content: err?.message || 'Something went wrong while processing your payment!',
      delay: 4 * 1000
    })
  }
  const createPaypalOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: orderDetails.totalPrice
        }
      }]
    }).then(orderId => orderId)
  }

  if (isError) {
    console.log('error while fetching order-details: ', error)
  }

  useEffect(() => {
    if (!paypalClientError &&
      !isPaypalClientLoading &&
      paypalData.clientId) {

      if (orderDetails &&
        !orderDetails.isPaid &&
        !window.paypal) {
        loadPaypalScript()
      }
    }
  }, [paypalData, orderDetails])

  // render
  const queryStatusFeedback = (isLoading || isFetching)
    ? (
        <LoaderSpinner>
          <span>Loading<br />Your order details..</span>
        </LoaderSpinner>
      )
    : isError
      ? <p>Error happend while loading the order details.</p>
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
    totalPrice,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt
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
              <span className={
                cn('value', 'item-status', isDelivered ? 'is-completed' : 'is-not-completed')
              }>
                {
                  isDelivered ? `Delivered on ${humanDate(deliveredAt)}` : 'Not delivered yet'
                }
              </span>
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
                  <span className={
                    cn('value', 'item-status', isPaid ? 'is-completed' : 'is-not-completed')
                  }>
                    {
                      isPaid ? `Paid on ${humanDate(paidAt)}` : 'Not paid yet'
                    }
                  </span>
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
                <label>Items total:</label>
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

              { !orderDetails.isPaid && 
                (
                  <li className='price-summary-item is-centered pay-btn'>
                    {
                      ifElseComponent(
                        [
                          isPayOrderLoading,
                          <LoaderSpinner isSmall={true} key='processing-payment'>Processing your payment..</LoaderSpinner>
                        ],
                        [
                          isPending,
                          <LoaderSpinner isSmall={true} key='loading-paypal'>Loading Paypal data..</LoaderSpinner>
                        ],
                        <>
                          {/*
                            <button className='is-primary' type='button'
                              onClick={onApproveTest}>
                              <span>Test pay order</span>
                              <i className='icon-arrow-right is-postfix'></i>
                            </button>
                          */}

                          <div className='paypal-buttons-wrapper'>
                            <PayPalButtons
                              createOrder={createPaypalOrder}
                              onApprove={onPaypalApprove}
                              onError={onPaypalError}
                            ></PayPalButtons>
                          </div>
                        </>
                      )
                    }
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </PageTemplate>
    </ProtectedPage>
  )
}
