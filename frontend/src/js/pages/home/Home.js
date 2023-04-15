import React, { useState, useEffect } from 'react'
import { getProducts } from '@frontend-utils/api-requests.js'
import './Home.scss'

// components
import ProductCard from './home-product-card/HomeProductCard.js'
const { PageTemplate } = React.Global

export default function Home () {
  // state
  const [products, setProducts] = useState([])

  // effects
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <PageTemplate classes='page-home'>
      <h1 className='page-heading'>Our latest products</h1>

      <div className="latest-product-list">
        {products.map(product => <ProductCard key={product.id} productData={product} />)}
      </div>
    </PageTemplate>
  )
}
