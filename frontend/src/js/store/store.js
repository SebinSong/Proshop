import * as toolkit from '@reduxjs/toolkit'
import { productListReducer } from './features/productsSlice.js'

const store = toolkit.configureStore({
  reducer: {
    productList: productListReducer
  }
})

export default store
