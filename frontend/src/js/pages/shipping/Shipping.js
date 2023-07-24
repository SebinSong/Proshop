import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmer } from 'use-immer'
import { useSelector, useDispatch } from '@redux-api'
import { classNames as cn } from '@utilities'
import {
  selectShippingAddress,
  saveShippingAddress
} from '@store/features/cartSlice.js'
import { ToastContext } from '@hooks/use-toast'
import { useValidation } from '@hooks/use-validation'
import './Shipping.scss'

const { ProtectedPage, PageTemplate } = React.Global

export default function Shipping () {
  const dataInStore = useSelector(selectShippingAddress)
  const [details, setDetails] = useImmer({
    address: dataInStore.address || '',
    city: dataInStore.city || '',
    postalCode: dataInStore.postalCode || '',
    country: dataInStore.country || '',
  })
  const { addToastItem } = useContext(ToastContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    formError,
    validateAll,
    clearFormError
  } = useValidation(
    details,
    [
      {
        key: 'postalCode',
        check: val => /^[0-9]+$/.test(val),
        errMsg: 'Postal code can only contain numbers.'
      }
    ]
  )

  // computed state
  const enableContinueBtn = Object.values(details).every(val => val.length >= 3)

  // methods 
  const updateFactory = key => {
    return e => {
      const val = e.target.value
      setDetails(draft => {
        draft[key] = val
      })

      if (formError && formError.errKey === key) {
        clearFormError()
      }
    }
  }

  const submitHandler = e => {
    e.preventDefault()

    if (validateAll()) {
      try {
        dispatch(saveShippingAddress(details))
        addToastItem({
          heading: 'Saved!',
          content: 'Your shipping details have been saved.',
          type: 'success',
          delay: 5 * 1000
        })

        navigate('/payment')
      } catch (err) {
        console.error('failed to save the shipping details: ', err)
        addToastItem({
          heading: 'Failed to save shipping address.',
          type: 'warning',
          content: 'please try again.',
          delay: 6 * 1000
        })
      }
    }
  }

  return (
    <ProtectedPage>
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
            <label htmlFor='postalCode-input'>Postal code</label>
            <input className={cn('custom-input', { 'invalid': formError && formError.errKey === 'postalCode' })}
              id='postalCode-input'
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

          {
            formError &&
            <p className='form-error-msg mt-20'>
              {formError.errMsg}
            </p>
          }

          <div className='buttons-container is-column mt-50'>
            <button className='is-primary continue-btn'
              disabled={!enableContinueBtn} 
              type='submit'
            >Continue</button>
          </div>
        </form>
      </PageTemplate>
    </ProtectedPage>
  )
}
