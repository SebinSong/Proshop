import { apiSlice } from "./apiSlice"
import { ORDERS_URL } from '@frontend-utils/constants.js'

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: 'GET',
        keepUnusedDataFor: 5 // seconds
      })
    }),
    markDelivered: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT'
      })
    })
  })
})

export const {
  useGetAllOrdersQuery: useGetAllOrders,
  useMarkDeliveredMutation: useMarkDelivered
} = adminApiSlice
