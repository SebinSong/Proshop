import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import QuantitySelector from '@components/quantity-selector/QuantitySelector.js'
import { addToCart, selectCartItems } from '@store/features/cartSlice.js'
import { parseQueryString } from '@utilities'

const { PageTemplate } = React.Global

export default function Cart () {
  // states
  const [fakeQty, setFakeQty] = useState(0)
  const dispatch = useDispatch()
  const location = useLocation()
  const cartItems = useSelector(selectCartItems)
  const { id: productId = '' } = useParams()

  console.log('cartItems: ', cartItems)
  // effects
  useEffect(() => {
    if (!productId) return

    const queries = parseQueryString(location.search)
    const quantity = queries.qty ? parseInt(queries.qty) : null

    if (quantity !== null) {
      dispatch(addToCart(productId, quantity))
    }
  }, [productId])

  return (
    <PageTemplate classes='page-cart'>
      <h1 className="page-template__page-heading">Cart</h1>

      <QuantitySelector min={0} max={10} value={fakeQty} onChange={setFakeQty} />
    </PageTemplate>
  )
}
