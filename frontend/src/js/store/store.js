import { configureStore } from '@redux-api'
import { productListReducer } from './features/productsSlice.js'
import { productDetailsReducer } from './features/productDetailsSlice.js'

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer
  }
})

export default store