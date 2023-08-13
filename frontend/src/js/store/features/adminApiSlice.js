import { apiSlice } from "./apiSlice"
import { ORDERS_URL, PRODUCTS_URL } from '@frontend-utils/constants.js'

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
    }),
    createProduct: builder.mutation({
      query: (data = {}) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: data,
        invalidatesTags: ['Product']
      })
    }),
    updateProduct: builder.mutation({
      query: (productId, data) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'PUT',
        body: data,
        invalidatesTags: ['Product']
      })
    })
  })
})

export const {
  useGetAllOrdersQuery: useGetAllOrders,
  useMarkDeliveredMutation: useMarkDelivered,
  useCreateProductMutation: useCreateProduct,
  useUpdateProductMutation: useUpdateProduct
} = adminApiSlice
