import React, { useState } from 'react'
import { useImmer } from 'use-immer'
import './Shipping.scss'

const { PageTemplate } = React.Global

export default function Shipping () {
  const [details, setDetails] = useImmer({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })
  const [formError, setFormError] = useState(null)

  // computed state
  const enableContinueBtn = Object.values(details).every(val => val.length >= 3)

  // methods 
  const updateFactory = key => {
    return e => {
      const val = e.target.value
      setDetails(draft => {
        draft[key] = val
      })
    }
  }

  const submitHandler = e => {
    e.preventDefault()
  }

  return (
    <PageTemplate classes='page-shipping'>
      <form className='page-form-container' onSubmit={submitHandler}>
        <h1 className="page-template__page-heading">Shipping</h1>
        <p className='page-description mb-40'>Please fill out your shipping details.</p>

        <div className='form-field mb-30'>
          <label htmlFor='address-input'>Address</label>
          <input className='custom-input'
            id='address-input'
            placeholder='Enter your shipping address'
            onInput={updateFactory('address')}
            value={details.address}
            type='text' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='city-input'>City</label>
          <input className='custom-input'
            id='city-input'
            placeholder='Enter your city name'
            onInput={updateFactory('city')}
            value={details.city}
            type='text' />
        </div>

        <div className='form-field mb-30'>
          <label htmlFor='postal-input'>Postal code</label>
          <input className='custom-input'
            id='postal-input'
            placeholder='Enter your postal code'
            onInput={updateFactory('postalCode')}
            value={details.postalCode}
            type='text' />
        </div>

        <div className='form-field'>
          <label htmlFor='postal-input'>Country</label>
          <input className='custom-input'
            id='country-input'
            placeholder='Enter your country'
            onInput={updateFactory('country')}
            value={details.country}
            type='text' />
        </div>

        <div className='buttons-container is-column mt-50'>
          <button className='is-primary continue-btn'
            disabled={!enableContinueBtn} 
            type='submit'
          >Continue</button>
        </div>
      </form>
    </PageTemplate>
  )
}
