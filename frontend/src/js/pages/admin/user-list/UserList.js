import React, { useContext } from 'react'
import { ToastContext } from '@hooks/use-toast'
import { usegetUsers } from '@store/features/adminApiSlice.js'
import { useNavigate } from 'react-router-dom'
import {
  classNames as cn
} from '@utilities'

import './UserList.scss'
import '../AdminShared.scss'

const {
  AdminPage,
  LoaderSpinner
} = React.Global

export default function UserList () {
  const navigate = useNavigate()
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

  // methods
  const removeUserHandler = () => {
    alert('!Implement delete-user.')
  }

  // render
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
      <div className='table-container summary-list'>
        <div className='table-wrapper'>
          <table className='table user-list-table'>
            <thead>
              <tr>
                <th className='th-id'>ID</th>
                <th className='th-name'>Name</th>
                <th className='th-email'>Email</th>
                <th className='th-admin'>Admin</th>
                <th className='th-actions'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                users.map(user => (
                  <tr key={user._id}>
                    <td className='td-id'>{user._id}</td>
                    <td className='td-name'>{user.name}</td>
                    <td className='td-email'>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className={cn('td-admin', user.isAdmin && 'has-color-green has-text-bold')}>
                      { user.isAdmin ? 'Y' : 'N' }
                    </td>
                    <td className='td-actions'>
                      <button className='icon-small action-btn edit-btn'
                        title='Edit user'
                        onClick={() => navigate(`/admin-update-user/${user._id}`)}
                        type='button'>
                        <i className='icon-document'></i>
                      </button>

                      <button className='icon-small action-btn remove-btn'
                        title='Remove user'
                        onClick={() => removeUserHandler(user._id)}
                        type='button'>
                        <i className='icon-trash-can'></i>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </AdminPage>
  )
}
