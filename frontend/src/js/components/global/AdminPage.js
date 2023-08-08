import React from 'react'
import { useSelector } from '@redux-api'
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '@store/features/authSlice.js'
import PageTemplate from './page-template/PageTemplate.js'
import AdminNavBar from '../admin-navbar/AdminNavBar.js'

export default function AdminPage ({ pageTitle = '', classes = '', children }) {
  const { pathname } = useLocation()
  const userInfo = useSelector(selectUserInfo)
  const isAdmin = Boolean(userInfo) && userInfo.isAdmin

  if (isAdmin) {
    return (
      <PageTemplate classes={classes}>
        {
          Boolean(pageTitle) &&
          <h1 className="page-template__page-heading is-underlined">{pageTitle}</h1>
        }

        <AdminNavBar></AdminNavBar>

        {children}
      </PageTemplate>
    )
  } else {
    const redirectQuery = `?redirect=${pathname}`
    return <Navigate to={`/login/admin${redirectQuery}`} replace={true} />
  }
}
