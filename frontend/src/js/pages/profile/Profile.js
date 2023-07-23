import React, { useContext } from 'react'
import { useDispatch } from '@redux-api'
import { useLogout } from '@store/features/usersApiSlice.js'
import { clearCredentials } from '@store/features/authSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContext } from '@hooks/use-toast'
import './Profile.scss'

const { PageTemplate } = React.Global

export default function Profile () {
  const [logout, { isLoading: isSigningOut }] = useLogout()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // context
  const { addToastItem } = useContext(ToastContext)

  // methods
  const onLogoutClick = async () => {
    try {
      const res = await logout().unwrap()
      dispatch(clearCredentials())
      navigate('/login')
    } catch (err) {
      addToastItem({
        type: 'warning',
        heading: 'Failed to log you out!',
        content: err?.data?.message || 'The server appears to be experiencing an issue, please try again later.',
        delay: 6 * 1000
      })
    }
  }

  return (
    <PageTemplate classes='page-profile'>
      <form className='profile-container' onSubmit={e => { e.preventDefault() }}>
        <div className='profile-header mb-30'>
          <h1 className="page-template__page-heading is-underlined">My profile</h1>

          <button className='is-outline profile__logout-btn'
            disabled={isSigningOut}
            onClick={onLogoutClick}
          >Log out</button>
        </div>
      </form>
    </PageTemplate>
  )
}
