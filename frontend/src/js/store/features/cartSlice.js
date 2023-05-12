import { createSlice } from '@redux-api'
import { getProduct } from '@frontend-utils/api-requests.js'
import { selectProductById } from './productsSlice.js'

const LOCAL_STORAGE_CART_ITEMS_KEY = 'proshop.cart-items'
const saveItemsToLocalStorage = (data) => window.localStorage.setItem(LOCAL_STORAGE_CART_ITEMS_KEY, JSON.stringify(data))
const getItemsFromLocalStorage = () => {
  const fromStorage = window.localStorage.getItem(LOCAL_STORAGE_CART_ITEMS_KEY)

  return fromStorage ? JSON.parse(fromStorage) : null
}


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] // getItemsFromLocalStorage() ?? []
  },
  reducers: {
    addItemToCartList (state, action) {
      const item = action.payload
      const index = state.items.findIndex(x => x._id === item._id)
      const {
        _id, image, name, brand, category,
        countInStock, qty, price, rating, description = ''
      } = item

      if (index >= 0) {
        state.items.splice(index, 1, item)
      } else {
        state.items.push({
          _id, image, name, brand, category,
          countInStock, qty, price, rating, description
        })
      }
    },
    unloadCart (state) {
      state.items = []
    }
  }
})

// selectors
export const selectCartItems = state => state.cart.items
export const selectCartItemById = (state, id) => state.cart.items.find(item => item._id === id)

// action creators
export const { addItemToCartList, unloadCart } = cartSlice.actions

// thunk creators
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const rootState = getState()

  const itemFromCache = selectCartItemById(rootState, id) || selectProductById(rootState, id)
  
  if (itemFromCache) {
    return dispatch(addItemToCartList({ ...itemFromCache, qty }))
  }

  try {
    const productData = await getProduct(id)
    dispatch(addItemToCartList({ ...productData, qty }))

    saveItemsToLocalStorage(
      selectCartItems(getState())
    )
  } catch (err) {
    console.error(`Error in addToCart thunk for item - ${id}`, err)
    throw new Error(err.message)
  }
}

// slice-reducer
export const cartReducer = cartSlice.reducer
