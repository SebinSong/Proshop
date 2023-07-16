import { PRODUCTS_URL, SINGLE_PRODUCT_URL } from '@frontend-utils/constants.js'
import { apiSlice } from './apiSlice.js'
import { createSelector } from '@redux-api'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'GET',
        keepUnusedDataFor: 30 // seconds
      })
    }),
    getProductDetails: builder.query({
      query: productId => ({
        method: 'GET',
        url: `${SINGLE_PRODUCT_URL}/${productId}`,
        keepUnusedDataFor: 10
      })
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery
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
