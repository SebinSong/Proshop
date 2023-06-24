// Instead of importing any redux-related apis from two different pkgs which are '@reduxjs/toolkit' and 'react-redux',
// I just want to be able to get them from a single point of import which is '@redux-api'.

import * as toolkit from '@reduxjs/toolkit'
export { useDispatch, useSelector, Provider } from 'react-redux'

export const configureStore = toolkit.configureStore
export const createSlice = toolkit.createSlice