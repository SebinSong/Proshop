import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from '@redux-api'
import { useNavigate } from 'react-router-dom'
import Stepper from '@components/stepper/Stepper'
import { savePaymentMethod, selectPaymentMethod, selectShippingAddress } from '@store/features/cartSlice.js'
import { PRODUCT_CHECKOUT_STEPS } from '@utilities'

import './Payment.scss'
import { _ } from 'core-js'

const { ProtectedPage, PageTemplate } = React.Global

export default function Payment () {
  const methodInStore = useSelector(selectPaymentMethod)
  const shippingAddress = useSelector(selectShippingAddress)
  const [paymentMethod, setPaymentMethod] = useState(methodInStore)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // effects
  useEffect(() => {
    if (Object.keys(shippingAddress || {}).length < 4) {
      navigate('/shipping')
    }
  }, [])
  // methods
  const submitHandler = e => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))
    navigate('/order')
  }
  const onRadioChange = e => { setPaymentMethod(e.target.value) }

  return (
    <ProtectedPage>
      <PageTemplate classes='page-payment'>
        <form className='page-form-container' onSubmit={submitHandler}>
          <Stepper classes='page-stepper' list={PRODUCT_CHECKOUT_STEPS} current={3} />
  
          <h1 className="page-template__page-heading">Payment method</h1>
          <p className='page-description mb-40'>Select the payment method you want.</p>
          
          <div className='form-field is-column mb-30'>
            <label className='radio'>
              <input type='radio'
                name='payment-method'
                value='PayPal'
                checked={paymentMethod === 'PayPal'}
                onChange={onRadioChange} />

              <span>Paypal or credit card</span>
            </label>

            <label className='radio disabled'>
              <input type='radio'
                name='payment-method'
                value='Other'
                disabled={true}
                onChange={onRadioChange} />

              <span>Other methods coming soon.</span>
            </label>
          </div>

          <div className='buttons-container'>
            <button className='is-primary continue-btn' 
              disabled={!paymentMethod}
              type='submit'>Continue</button>
          </div>
        </form>
      </PageTemplate>
    </ProtectedPage>
  )
}
