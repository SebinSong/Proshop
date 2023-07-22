import { createSlice } from '@redux-api'
import {
  DAYS_MILLIS,
  checkAndParseFromLocalStorage,
  saveToLocalStorage
} from '@utilities'

const LOCAL_STORAGE_USERINFO_KEY = 'proshop.userInfo'
const initUserInfo = () => {
  const dataFromStorage = checkAndParseFromLocalStorage(LOCAL_STORAGE_USERINFO_KEY)

  if (dataFromStorage && dataFromStorage.expiresAfter > Date.now()) {
    dataFromStorage.expiresAfter = Date.now() + DAYS_MILLIS // reset the expiration time.
    return dataFromStorage
  } else { return null }
}
const initialState = {
  userInfo: initUserInfo()
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials (state, action) {
      const data = {
        ...action.payload,
        expiresAfter: Date.now() + DAYS_MILLIS
      }
      state.userInfo = data
      saveToLocalStorage(LOCAL_STORAGE_USERINFO_KEY, data)
    }
  }
})

// action creators
export const { setCredentials } = authSlice.actions

// selectors
export const selectUserInfo = state => state.auth.userInfo || null
export const isUserAuthenticated = state => Boolean(state.auth.userInfo)

// slice-reducer
export const authReducer = authSlice.reducer
