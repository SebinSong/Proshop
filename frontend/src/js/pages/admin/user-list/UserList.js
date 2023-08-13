import React, { useContext } from 'react'
import { ToastContext } from '@hooks/use-toast'
import { usegetUsers } from '@store/features/adminApiSlice.js'

import './UserList.scss'

const {
  AdminPage,
  LoaderSpinner
} = React.Global

export default function UserList () {
  const {
    data: users,
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = usegetUsers()

  // context
  const { addToastItem } = useContext(ToastContext)

  const loadingFeedback = isLoading
    ? <LoaderSpinner classes='loading-feedback'>
        <span>Loading<br />users data..</span>
      </LoaderSpinner>
    : isError
      ? <p>{ JSON.stringify(error) }</p>
      : null

  if (loadingFeedback) {
    return loadingFeedback
  }

  return (
    <AdminPage classes='admin-page-user-list'
      pageTitle='User list'>
      <p>Userdata!!</p>
    </AdminPage>
  )
}