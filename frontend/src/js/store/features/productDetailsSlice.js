import { createSlice } from '@redux-api'
import { getProduct } from '@frontend-utils/api-requests.js'
import { selectProductList } from './productsSlice.js'

// define slice
export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    requestMade: state => {
      state.data = null
      state.loading = true
    },
    requestSucceeded: (state, action) => {
      state.loading = false,
      state.data = action.payload
    },
    requestFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

// action creators
export const {
  requestMade,
  requestSucceeded,
  requestFailed
} = productDetailsSlice.actions

// thunk creators
export const loadProductDetails = id => async (dispatch, getState) => {
  dispatch(requestMade())

  try {
    const { data = [] } = selectProductList(getState())
    const cachedData = data.find(item => item._id === id)

    if (cachedData) {
      dispatch(requestSucceeded(cachedData))
    } else {
      const productDetailsData = await getProduct(id)
      dispatch(requestSucceeded(productDetailsData))
    }
  } catch (err) {
    console.error(err)
    dispatch(requestFailed({ message: 'Failed to load the product details.' }))
  }
}

// selectors
export const selectProductDetails = state => state.productDetails

export const productDetailsReducer = productDetailsSlice.reducer