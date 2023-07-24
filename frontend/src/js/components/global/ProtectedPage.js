import React from 'react'
import { useSelector } from '@redux-api'
import { Navigate } from 'react-router-dom'
import { isUserAuthenticated } from '@store/features/authSlice.js'

export default function ProtectedPage ({ children }) {
  const isUserLoggedIn = useSelector(isUserAuthenticated)

  if (isUserLoggedIn) {
    return children
  } else {
    return <Navigate to='/login' replace={true} />
  }
}
