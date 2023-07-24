import React, { useState, useContext } from 'react'
import { useDispatch } from '@redux-api'
import { useImmer } from 'use-immer'
import { validateEmail, classNames as cn } from '@utilities'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSignup } from '@store/features/usersApiSlice.js'
import { setCredentials } from '@store/features/authSlice'
import { ToastContext } from '@hooks/use-toast'
import { useValidation } from '@hooks/use-validation'
import './SignUp.scss'

const { PageTemplate } = React.Global

export default function SignUp () {
  // local-state
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [details, setDetails] = useImmer({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {
    formError,
    validateAll,
    clearFormError
  } = useValidation(
    details, 
    [
      {
        key: 'email',
        check: val => validateEmail(val),
        errMsg: 'Please enter a valid email format.'
      },
      {
        key: 'password',
        check: val => val.length >= 6,
        errMsg: 'Password has to be at least 6 characters long.'
      },
      {
        key: 'confirmPassword',
        check: (val, state) => val === state.password,
        errMsg: 'Confirm password field has to be the same as the password you entered.'
      }
    ]
  )

  // computed state
  const enableSubmitBtn = Object.values(details).every(val => val.length >= 3)
  const redirectPath = searchParams.get('redirect') || '/'
  const [signup, { isLoading }] = useSignup()
  // context
  const { addToastItem } = useContext(ToastContext)

  // methods 
  const updateFactory = key => {
    return (e) => {
      const val = e.target.value
      setDetails(draft => {
        draft[key] = val
      })

      if (formError && formError.errKey === key) {
        clearFormError()
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (validateAll()) {
      try {
        const res = await signup({
          name: details.name,
          email: details.email,
          password: details.password
        }).unwrap()

        dispatch(setCredentials(res)) // login user upon registration success.
        navigate(redirectPath)
      } catch (err) {
        addToastItem({
          heading: 'Sign-up Failed!',
          type: 'warning',
          content: err?.data?.message || err.error || 'Something went wrong. please try again',
          delay: 6 * 1000
        })
      }
    }
  }

  return (
    <PageTemplate classes='page-signup'>
      <form className='page-form-container' onSubmit={submitHandler}>
        <h1 className="page-template__page-heading signup-page-heading mb-50">Sign Up</h1>

        <div className='form-field mb-30'>
          <label htmlFor='name-input'>Name</label>
          <input className='custom-input'
            id='name-input'
            placeholder='Enter a user name'
            onInput={updateFactory('name')}
            value={details.name}
            type='text' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='email-input'>Email Address</label>
          <input className={cn('custom-input', { 'invalid': formError && formError.errKey === 'email' })}
            id='email-input'
            placeholder='Enter email address'
            onInput={updateFactory('email')}
            value={details.email}
            type='email' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='password-input'>Password</label>
          <input className={cn('custom-input', { 'invalid': formError && formError.errKey === 'password' })}
            id='password-input'
            type='password'
            onInput={updateFactory('password')}
            value={details.password}
            placeholder='Enter password' />
        </div>

        <div className='form-field mb-40'>
          <label htmlFor='confirm-password-input'>Confirm Password</label>
          <input className={cn('custom-input', { 'invalid': formError && formError.errKey === 'confirmPassword' })}
            id='confirmPassword-input'
            type='password'
            onInput={updateFactory('confirmPassword')}
            value={details.confirmPassword}
            placeholder='Confirm password' />
        </div>

        { 
          formError &&
          <p className='form-error-msg signup-form-err'>
            {formError.errMsg}
          </p>
        }

        <div className='signup-cta-container'>
          <button className='is-primary register-btn'
            disabled={!enableSubmitBtn} 
            type='submit'
          >Register</button>

          <p className='to-login'>Already have an account? 
            <span className='link has-underline' tabIndex='0' onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </form>
    </PageTemplate>
  )
}
