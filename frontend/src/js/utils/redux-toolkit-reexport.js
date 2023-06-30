// Instead of importing any redux-related apis from two different pkgs which are '@reduxjs/toolkit' and 'react-redux',
// I just want to be able to get them from a single point of import which is '@redux-api'.

import * as toolkit from '@reduxjs/toolkit'
import * as queryToolkit from '@reduxjs/toolkit/query/react'
export { useDispatch, useSelector, Provider } from 'react-redux'

export const { configureStore, createSlice, createSelector } = toolkit
export const { createApi, fetchBaseQuery } = queryToolkit
