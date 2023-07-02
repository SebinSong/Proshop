import { configureStore } from '@redux-api'
import { cartReducer } from './features/cartSlice.js'
import { authReducer } from './features/authSlice.js'
import { apiSlice } from './features/apiSlice.js'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
