import { ORDERS_URL, PAYPAL_URL } from '@frontend-utils/constants.js'
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
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method: 'GET'
      })
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details }
      })
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        method: 'GET',
        keepUnusedDataFor: 5 // seconds
      }),
    })
  })
})

export const useCreateOrders = ordersApiSlice.useCreateOrdersMutation
export const useGetMyOrders = ordersApiSlice.useGetMyOrdersQuery
export const useGetOrderDetails = ordersApiSlice.useGetOrderDetailsQuery
export const usePayOrder = ordersApiSlice.usePayOrderMutation
export const useGetPayPalClientId = ordersApiSlice.useGetPaypalClientIdQuery
