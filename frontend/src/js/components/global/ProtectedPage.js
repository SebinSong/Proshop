import React from 'react'
import { useSelector } from '@redux-api'
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { isUserAuthenticated } from '@store/features/authSlice.js'

export default function ProtectedPage ({ children }) {
  const { pathname } = useLocation()
  const isUserLoggedIn = useSelector(isUserAuthenticated)

  if (isUserLoggedIn) {
    return children
  } else {
    const redirectQuery = `?redirect=${pathname}`
    return <Navigate to={`/login${redirectQuery}`} replace={true} />
  }
}
