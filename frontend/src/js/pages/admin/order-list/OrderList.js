import React from 'react'
import { useGetAllOrders } from '@store/features/adminApiSlice.js'
import OrderTable from '@components/order-table/OrderTable.js'
import './OrderList.scss'

const {
  AdminPage,
  LoaderSpinner
} = React.Global

export default function OrderList () {
  const {
    data: allOrders = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useGetAllOrders()

  const statusFeedbackEl = (isLoading || isFetching)
    ? (
        <LoaderSpinner className='page-order-list__loader-spinner'>
          <span>Loading<br />order data..</span>
        </LoaderSpinner>
      )
    : isError
      ? <p>{ error }</p>
      : null

  if (statusFeedbackEl) {
    return statusFeedbackEl
  }

  // render
  return (
    <AdminPage classes='page-order-list'
      pageTitle='Order list'
      widthConstraint={true}>
      <OrderTable list={allOrders}
        isLoading={isLoading || isFetching}
        loadingFeedback='Loading order history...'
        noItemsFeedback='No order history to show'
        variant='admin' />
    </AdminPage>
  )
}
