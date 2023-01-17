import React from 'react'
import { useParams } from 'react-router-dom'
import products from '@frontend-utils/products.js'
const { PageTemplate } = React.Global

export default function Product () {
  const { id = '' } = useParams()
  const product = products.find(x => x.id === id)

  return (
    <PageTemplate classes='page-product'>
      <h1 className="page-heading">Product details</h1>
      <p>matched product: <span className="has-text-bold">{product.name}</span></p>
    </PageTemplate>
  )
}
