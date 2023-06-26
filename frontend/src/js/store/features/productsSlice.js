import { PRODUCTS_URL, SINGLE_PRODUCT_URL } from '@frontend-utils/constants.js'
import { injectEndpoints } from './apiSlice.js'

export const productsApiSlice = injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'GET',
        keepUnusedDataFor: 30 // seconds
      })
    }),
    getSingleProduct: builder.query({
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
  useGetSingleProductQuery
 } = productsApiSlice