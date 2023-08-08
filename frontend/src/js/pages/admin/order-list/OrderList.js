import React from 'react'
import { useGetAllOrders } from '@store/features/adminApiSlice.js'
import './OrderList.scss'

const { AdminPage } = React.Global

export default function OrderList () {
  const {
    data: allOrders,
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useGetAllOrders()

  return (
    <AdminPage classes='page-order-list' pageTitle='Order list'>
      <p>A random sentence.</p>
    </AdminPage>
  )
}
