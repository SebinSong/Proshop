import { configureStore } from '@redux-api'
import { productListReducer } from './features/productsSlice.js'
import { productDetailsReducer } from './features/productDetailsSlice.js'
import { cartReducer } from './features/cartSlice.js'

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
  }
})

export default store
