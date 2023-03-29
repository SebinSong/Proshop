import React from 'react'
import './Home.scss'
import products from '@frontend-utils/products.js'

// components
import ProductCard from './home-product-card/HomeProductCard.js'
const { PageTemplate } = React.Global

export default function Home () {
  return (
    <PageTemplate classes='page-home'>
      <h1 className='page-heading'>Our latest products</h1>

      <div className="latest-product-list">
        {products.map(product => <ProductCard key={product.id} productData={product} />)}
      </div>
    </PageTemplate>
  )
}
