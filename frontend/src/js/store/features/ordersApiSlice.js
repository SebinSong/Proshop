import { ORDERS_URL } from '@frontend-utils/constants.js'
import { apiSlice } from './apiSlice.js'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrders: builder.mutation({
      query: payload => {
        return  ({
          url: ORDERS_URL,
          method: 'POST',
          body: payload
        })
      }
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'GET'
      })
    }),
    getMyOrders: builder.query({
      url: `${ORDERS_URL}/mine`,
      method: 'GET'
    })
  })
})

export const useCreateOrders = ordersApiSlice.useCreateOrdersMutation
export const useGetMyOrder = ordersApiSlice.useGetMyOrdersQuery
export const useGetOrderDetails = ordersApiSlice.useGetOrderDetailsQuery
