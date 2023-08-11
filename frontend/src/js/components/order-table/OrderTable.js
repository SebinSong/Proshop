import React from 'react'
import {
  humanDate,
  formatMoney,
  classNames as cn
} from '@utilities'
import { useNavigate } from 'react-router-dom'
import './OrderTable.scss'

const { LoaderSpinner } = React.Global

export default function OrderList ({
  classes = '',
  list,
  isLoading = false,
  loadingFeedback = 'Loading..',
  noItemsFeedback = 'No items to display.',
  variant = '',
  children = null
}) {
  // state
  const navigate = useNavigate()
  const isAdmin = variant === 'admin'

  // render helper
  const callToActions = order => {
    return (
      <div className='item-cta-container'>
        <button className={cn('is-small', isAdmin || order.isPaid ? 'is-outline' : 'is-primary')}
          type='button'
          onClick={() => navigate(`/order-details/${order._id}`)}>
          {isAdmin || order.isPaid ? 'Details' : 'Make a payment'}
        </button>
      </div>
    )
  }

  const content = isLoading
    ? <LoaderSpinner isSmall={true}>{loadingFeedback}</LoaderSpinner>
    : !list || list.length === 0
      ? <li className='orders-table__item no-items'>{noItemsFeedback}</li>
      : (
          list.map(order => (
            <li className='orders-table__item' key={order._id}>
              <div className='detail-line order-id'>
                <label># Order ID:</label>
                <span className='value'>{order._id}</span>
              </div>

              <div className='detail-line items-name'>
                <label>Items:</label>
                <span className='value has-yeseva has-text-1 has-underline'>
                  { order.orderItems.map(item => item.name).join(', ') }
                </span>
              </div>

              {
                isAdmin &&
                <div className='detail-line user-name'>
                  <label>
                    <i className='icon-circle-user'></i>
                    <span>User: </span>
                  </label>
                  <span className='value has-underline'>
                    { order.user.name }
                  </span>
                </div>
              }

              <div className='detail-line'>
                <label>Total:</label>
                <span className='value has-text-bold'>
                  { formatMoney(order.totalPrice) }
                </span>
              </div>

              <div className='detail-line'>
                <label>Created at:</label>
                <span className='value has-text-bold'>
                  { humanDate(order.createdAt) }
                </span>
              </div>

              <div className='detail-line'>
                <label>Paid at:</label>
                <span className={cn('value', 'item-status', order.isPaid ? 'is-completed' : 'is-not-completed')}>
                  { order.isPaid ? humanDate(order.paidAt) : 'Not paid' }
                </span>
              </div>

              <div className='detail-line'>
                <label>Delivered at:</label>
                <span className={cn('value', 'item-status', order.isDelivered ? 'is-completed' : 'is-not-completed')}>
                  { order.isDelivered ? humanDate(order.deliveredAt) : 'Not delivered yet' }
                </span>
              </div>

              { callToActions(order) }
            </li>
          ))
        )

  // render
  return (
    <ul className={cn('orders-table', classes)}>
      {content}
      {!isLoading && children}
    </ul>
  )
}
