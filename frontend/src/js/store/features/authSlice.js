import { createSlice } from '@redux-api'
import { checkAndParseFromLocalStorage, saveToLocalStorage } from '@utilities'

const LOCAL_STORAGE_USERINFO_KEY = 'proshop.userInfo'
const initialState = {
  userInfo: checkAndParseFromLocalStorage(LOCAL_STORAGE_USERINFO_KEY)
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials (state, action) {
      state.userInfo = action.payload
      saveToLocalStorage(LOCAL_STORAGE_USERINFO_KEY, action.payload)
    }
  }
})

// action creators
export const { setCredentials } = authSlice.actions

// slice-reducer
export const authReducer = authSlice.reducer
