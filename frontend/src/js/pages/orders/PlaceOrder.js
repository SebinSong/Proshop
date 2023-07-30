import React, { useEffect } from 'react'
import { useSelector } from '@redux-api'
import { useNavigate } from 'react-router-dom'
import Stepper from '@components/stepper/Stepper'
import { PRODUCT_CHECKOUT_STEPS } from '@utilities'
import { selectShippingAddress, selectPaymentMethod } from '@store/features/cartSlice.js'

import './PlaceOrder.scss'

const { ProtectedPage, PageTemplate } = React.Global

export default function PlaceOrder () {
  const shippingAddress = useSelector(selectShippingAddress)
  const paymentMethod = useSelector(selectPaymentMethod)
  const navigate = useNavigate()

  // effects
  useEffect(() => {
    // if (Object.keys(shippingAddress || {}).length < 4) {
    //   navigate('/shipping')
    // }

    // if (!paymentMethod) {
    //   navigate('/payment')
    // }
  }, [])

  return (
    <ProtectedPage>
      <PageTemplate classes='page-place-order'>
        <div className='page-width-constraints'>
          <Stepper classes='page-stepper' list={PRODUCT_CHECKOUT_STEPS} current={4} />
        </div>

        <div className='page-place-order__container'>
          <h1 className="page-template__page-heading">Place your order</h1>
        </div>
      </PageTemplate>
    </ProtectedPage>
  )
}
