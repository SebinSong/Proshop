import { createApi, fetchBaseQuery } from '@redux-api'
import { BASE_URL } from '@frontend-utils/constants.js'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Products', 'Order', 'Users'],
  endpoints: builder => ({ })
})
export const injectEndpoints = apiSlice.injectEndpoints
