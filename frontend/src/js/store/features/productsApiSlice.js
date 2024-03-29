import { PRODUCTS_URL, SINGLE_PRODUCT_URL } from '@frontend-utils/constants.js'
import { apiSlice } from './apiSlice.js'
import { createSelector } from '@redux-api'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'GET',
        keepUnusedDataFor: 5 // seconds
      }),
      providesTags: ['Products']
    }),
    getProductDetails: builder.query({
      query: productId => ({
        method: 'GET',
        url: `${SINGLE_PRODUCT_URL}/${productId}`
      }),
      keepUnusedDataFor: 10
    }),
    createProductReview: builder.mutation({
      query: ({
        productId, data
      }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Products']
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductReviewMutation: useCreateProductReview
 } = productsApiSlice

 // define selectors
export const selectAllProducts = state => {
  const cache = apiSlice.endpoints.getProducts.select()(state)

  return cache?.data || []
}
export const selectProductById = createSelector(
  selectAllProducts,
  (state, userId) => userId,
  (allProducts, userId) => {
    return allProducts.length ? allProducts.find(x => x._id === userId) : null
  }
)
