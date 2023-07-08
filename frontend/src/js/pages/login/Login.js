import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.scss'

const { PageTemplate } = React.Global

export default function Login () {
  const navigate = useNavigate()

  return (
    <PageTemplate classes='page-login'>
      <form className='login-container' >
        <h1 className="page-template__page-heading login-page-heading mb-50">Sign In</h1>

        <div className='form-field mb-30'>
          <label for='email-input'>Email Address</label>
          <input className='custom-input'
            id='email-input'
            placeholder='Enter email address'
            type='email' />
        </div>

        <div className='form-field mb-40'>
          <label for='password-input'>Password</label>
          <input className='custom-input'
            id='password-input'
            type='password'
            placeholder='Enter password' />
        </div>

        <div className='login-cta-container'>
          <button className='is-primary sign-in-btn' type='submit'>Sign in</button>
          <p className='to-register'>
            New customer? 
            <span className='link has-underline' onClick={() => navigate('/register')}>Register</span>
          </p>
        </div>
      </form>
    </PageTemplate>
  )
}
