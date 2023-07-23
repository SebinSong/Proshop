import { createSlice, createSelector } from '@redux-api'
import { getProduct } from '@frontend-utils/api-requests.js'
import { addDecimals } from '@utilities'

const LOCAL_STORAGE_CART_ITEMS_KEY = 'proshop.cart-items'
const saveItemsToLocalStorage = (data) => window.localStorage.setItem(LOCAL_STORAGE_CART_ITEMS_KEY, JSON.stringify(data))
const getItemsFromLocalStorage = () => {
  const fromStorage = window.localStorage.getItem(LOCAL_STORAGE_CART_ITEMS_KEY)

  return fromStorage ? JSON.parse(fromStorage) : null
}


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // getItemsFromLocalStorage() ?? []
    shippingAddress: {},
    paymentMethod: 'PayPal'
  },
  reducers: {
    addItemToCartList (state, action) {
      const item = action.payload
      const index = state.items.findIndex(x => x._id === item._id)
      const {
        _id, image, name, brand, category,
        countInStock, qty, price, rating, description = ''
      } = item

      // #1. update to state.items array
      if (index >= 0) {
        // if the item already exists, replace it with the new payload
        state.items.splice(index, 1, item)
      } else {
        state.items.push({
          _id, image, name, brand, category,
          countInStock, qty, price, rating, description
        })
      }
    },
    removeCartItem (state, action) {
      const index = state.items.findIndex(item => item._id === action.payload)

      if (index >= 0) {
        state.items.splice(index, 1)
      }
    },
    unloadCart (state) {
      state.items = []
    },
    saveShippingAddress (state, action) {
      state.shippingAddress = action.payload
    },
    unloadShippingAddress (state) {
      state.shippingAddress = {}
    }
  }
})

// selectors
export const selectCartItems = state => state.cart.items
export const selectCartTotalQuantities = state => {
  const items = state.cart.items || []
  return items.reduce((accu, item) => accu + item.qty, 0)
}
export const selectCartItemById = createSelector(
  [
    state => state.cart.items || [],
    (state, id) => id
  ],
  (cartItems, id) => cartItems.find(x => x._id === id)
)
export const selectCartPrices = state => {
  const items = state.cart.items || []
  // #1. Items price -  items * the price
  const itemsPrice = items.reduce((accu, item) => accu + (Number(item.price) * item.qty), 0)
  // #2. Shipping price - If order is over $100 then it's free, else $10 for shipping
  const shippingPrice = itemsPrice > 100 ? 0 : 10
  // #3. Tax price (15% of the items price)
  const taxPrice = 0.15 * itemsPrice
  // #4. total Price - summation of 1., 2., 3.
  const totalPrice = itemsPrice + shippingPrice + taxPrice

  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice)
  }
}

// action creators
export const {
  addItemToCartList,
  removeCartItem,
  unloadCart,
  saveShippingAddress,
  unloadShippingAddress
} = cartSlice.actions

// thunk creators
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const rootState = getState()

  const itemFromCache = selectCartItemById(rootState, id)
  
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

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(removeCartItem(id))
  saveItemsToLocalStorage(
    selectCartItems(getState())
  )
}

// slice-reducer
export const cartReducer = cartSlice.reducer
