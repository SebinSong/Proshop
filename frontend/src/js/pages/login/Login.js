import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from '@redux-api'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import {
  validateEmail,
  classNames as cn
} from '@utilities'
import { useLogin } from '@store/features/usersApiSlice.js'
import { ToastContext } from '@hooks/use-toast'
import { setCredentials, selectUserInfo } from '@store/features/authSlice'
import './Login.scss'

const { PageTemplate } = React.Global

export default function Login () {
  // local state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userInfo = useSelector(selectUserInfo)
  const [login, { isLoading }] = useLogin()

  // react-router hooks
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const disableLoginButton = isLoading ||
    !validateEmail(email) ||
    password.length < 3

  // context
  const { addToastItem } = useContext(ToastContext)

  // computed state
  const isAdmin = pathname === '/login/admin'
  const redirectPath = searchParams.get('redirect') || (isAdmin ? '/admin-order-list' : '/')

  // effects
  useEffect(() => {
    if (userInfo) {
      navigate(redirectPath)
    }
  }, [userInfo])

  // methods
  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await login({ email, password }).unwrap()

      if (!res.isAdmin) {
        throw new Error('You are not authorized as an admin.')
      }

      dispatch(setCredentials(res))
      navigate(redirectPath)
    } catch (err) {
      addToastItem({
        heading: 'Login Failed!',
        type: 'warning',
        content: err?.data?.message || err.message || 'Something went wrong while trying to log you in.',
        delay: 5 * 1000
      })
    }
  }

  return (
    <PageTemplate classes='page-login'>
      <form className='page-form-container' onSubmit={submitHandler}>
        <h1 className={cn("page-template__page-heading is-underlined mb-50", isAdmin && 'is-for-admin')}>
          { isAdmin ? 'Sign in for admin' : 'Sign in' }
        </h1>

        <div className='form-field mb-30'>
          <label htmlFor='email-input'>Email Address</label>
          <input className='custom-input'
            id='email-input'
            placeholder='Enter email address'
            type='email'
            value={email}
            onInput={e => setEmail(e.target.value)} />
        </div>

        <div className='form-field mb-40'>
          <label htmlFor='password-input'>Password</label>
          <input className='custom-input'
            id='password-input'
            type='password'
            placeholder='Enter password'
            value={password}
            onInput={e => setPassword(e.target.value)} />
        </div>

        <div className='login-cta-container'>
          <button className='is-primary sign-in-btn'
            type='submit'
            disabled={disableLoginButton}
          >Sign in</button>
          
          { !isAdmin &&
            <p className='to-register'>
              New customer? 
              <span tabIndex='0'
                className='link has-underline'
                onClick={() => navigate(
                  redirectPath.length > 1
                    ? `/register?redirect=${redirectPath}`
                    : '/register'
                )}
              >Register</span>
            </p>
          }
        </div>
      </form>
    </PageTemplate>
  )
}
