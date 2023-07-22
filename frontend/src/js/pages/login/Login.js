import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from '@redux-api'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/'

  // context
  const { addToastItem } = useContext(ToastContext)

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
      dispatch(setCredentials(res))
      navigate(redirectPath)
    } catch (err) {
      console.error('::: error while logging in: ', err)

      addToastItem({
        heading: 'Login Failed!',
        type: 'warning',
        content: err?.data?.message || 'Something went wrong while trying to log you in.'
      })
    }
  }

  return (
    <PageTemplate classes='page-login'>
      <form className='login-container' onSubmit={submitHandler}>
        <h1 className="page-template__page-heading login-page-heading mb-50">Sign In</h1>

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
            disabled={isLoading}>Sign in</button>
          
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
        </div>
      </form>
    </PageTemplate>
  )
}
