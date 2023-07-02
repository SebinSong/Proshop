import React from 'react'
import { useGetProductsQuery } from '@store-slice/productsApiSlice.js'
import './Home.scss'

// components
import ProductCard from './home-product-card/HomeProductCard.js'
const { PageTemplate, LoaderSpinner } = React.Global

export default function Home () {
  const {
    data: products = [],
    isLoading,
    isError,
    error
  } = useGetProductsQuery()

  const statusFeedBackEl = isLoading
    ? <LoaderSpinner classes='page-home__loader-spinner'>
        <span>Loading<br />Product data..</span>
      </LoaderSpinner>
    : isError
      ? <p>{ error }</p>
      : null

  return (
    <PageTemplate classes='page-home'>
      {
        statusFeedBackEl || (
          <>
            <h1 className='page-template__page-heading'>
              <i className='icon-handbag prefix-icon'></i>
              <span>Our latest products</span>
            </h1>

            <div className="latest-product-list">
              {products.map(product => <ProductCard key={product._id} productData={product} />)}
            </div>
          </>
        )
      }
    </PageTemplate>
  )
}
