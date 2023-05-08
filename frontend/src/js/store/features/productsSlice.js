import { createSlice } from '@redux-api'
import { getProducts } from '@frontend-utils/api-requests.js'

// define slice
export const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    requestMade: state => {
      state.data = []
      state.loading = true
    },
    requestSucceeded: (state, action) => {
      state.loading = false
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
} = productListSlice.actions

// thunk creators
export const listProducts = () => async (dispatch) => {
  try {
    // signals that a request has been made first
    dispatch(requestMade())

    const data = await getProducts()
    dispatch(requestSucceeded(data))
  } catch (error) {
    dispatch(requestFailed(error))
  }
}

// selectors
export const selectProductList = state => state.productList
export const findProductById = state => state.productList.data

// slice-reducer
export const productListReducer = productListSlice.reducer
