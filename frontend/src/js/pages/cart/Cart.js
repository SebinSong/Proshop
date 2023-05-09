import React, { useState } from 'react'
import QuantitySelector from '@components/quantity-selector/QuantitySelector.js'

const { PageTemplate } = React.Global

export default function Cart () {
  const [fakeQty, setFakeQty] = useState(0)

  return (
    <PageTemplate classes='page-cart'>
      <h1 className="page-template__page-heading">Cart</h1>

      <QuantitySelector min={0} max={10} value={fakeQty} onChange={setFakeQty} />
    </PageTemplate>
  )
}
