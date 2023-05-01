import { configureStore } from '@redux-api'
import { productListReducer } from './features/productsSlice.js'

const store = configureStore({
  reducer: {
    productList: productListReducer
  }
})

export default store
