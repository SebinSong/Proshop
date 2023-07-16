import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.scss'

const { PageTemplate } = React.Global

export default function SignUp () {
  const navigate = useNavigate()

  return (
    <PageTemplate classes='page-signup'>
      <form className='signup-container'>
        <h1 className="page-template__page-heading signup-page-heading mb-50">Sign Up</h1>

        <div className='form-field mb-30'>
          <label htmlFor='name-input'>Name</label>
          <input className='custom-input'
            id='name-input'
            placeholder='Enter a user name'
            type='text' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='email-input'>Email Address</label>
          <input className='custom-input'
            id='email-input'
            placeholder='Enter email address'
            type='email' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='password-input'>Password</label>
          <input className='custom-input'
            id='password-input'
            type='password'
            placeholder='Enter password' />
        </div>

        <div className='form-field mb-40'>
          <label htmlFor='confirm-password-input'>Confirm Password</label>
          <input className='custom-input'
            id='confirm-password-input'
            type='password'
            placeholder='Confirm password' />
        </div>

        <div className='signup-cta-container'>
          <button className='is-primary register-btn' type='submit'>Register</button>
          <p className='to-login'>Already have an account? 
            <span className='link has-underline' tabindex='0' onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </form>
    </PageTemplate>
  )
}
