import { USERS_URL } from '@frontend-utils/constants.js'
import { apiSlice } from './apiSlice.js'
import { HOURS_MILLIS } from '@utilities'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: payload => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: payload,
        keepUnusedDataFor: HOURS_MILLIS
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    })
  })
})

// export hooks
export const useLogin = usersApiSlice.useLoginMutation
export const useLogout = usersApiSlice.useLogoutMutation
