import { ORDERS_URL } from '@frontend-utils/constants.js'
import { apiSlice } from './apiSlice.js'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrders: builder.mutation({
      query: payload => ({
        url: ORDERS_URL,
        method: 'POST',
        body: payload
      }),
      getMyOrders: builder.query({
        query: `${ORDERS_URL}/mine`,
        method: 'GET'
      })
    })
  })
})

export const useCreateOrders = ordersApiSlice.useCreateOrdersMutation
export const useGetMyOrder = ordersApiSlice.useGetMyOrdersQuery
