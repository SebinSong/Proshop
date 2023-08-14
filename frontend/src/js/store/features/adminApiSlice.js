import { apiSlice } from "./apiSlice"
import { ORDERS_URL, PRODUCTS_URL, USERS_URL } from '@frontend-utils/constants.js'

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: 'GET'
      }),
      keepUnusedDataFor: 5 // seconds
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
        body: data
      }),
      invalidatesTags: ['Products']
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Products']
    }),
    updateProduct: builder.mutation({
      query: ({ id: productId, data }) => {
        return {
          url: `${PRODUCTS_URL}/${productId}`,
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: ['Products']
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: '/fileupload',
        method: 'POST',
        body: data
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: 'GET'
      }),
      keepUnusedDataFor: 5, // seconds
      providesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      query: userId => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    }),
    getUserDetails: builder.query({
      query: userId => ({
        url: `${USERS_URL}/${userId}`,
        method: 'GET'
      }),
      keepUnusedDataFor: 5 // seconds
    }),
    updateUserDetails: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Users']
    })
  })
})

export const {
  useGetAllOrdersQuery: useGetAllOrders,
  useGetUsersQuery: usegetUsers,
  useMarkDeliveredMutation: useMarkDelivered,
  useCreateProductMutation: useCreateProduct,
  useUpdateProductMutation: useUpdateProduct,
  useUploadProductImageMutation: useUploadProductImage,
  useDeleteProductMutation: useDeleteProduct,
  useDeleteUserMutation: useDeleteUser,
  useGetUserDetailsQuery: useGetUserDetails,
  useUpdateUserDetailsMutation: useUpdateUserDtails
} = adminApiSlice
