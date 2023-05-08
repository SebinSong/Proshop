import React, { useEffect } from 'react'
import { useDispatch, useSelector } from '@redux-api'
import { listProducts, selectProductList } from '@store/features/productsSlice.js'
import './Home.scss'

// components
import ProductCard from './home-product-card/HomeProductCard.js'
const { PageTemplate, LoaderSpinner } = React.Global

export default function Home () {
  const dispatch = useDispatch()
  // state
  const { data: products, loading, error } = useSelector(selectProductList)

  // effects
  useEffect(() => {
    dispatch(listProducts())
  }, [])

  const statusFeedBackEl = loading
    ? <LoaderSpinner classes='page-home__loader-spinner'>
        <span>Loading<br />Product data..</span>
      </LoaderSpinner>
    : error
      ? <p>{ error }</p>
      : null

  return (
    <PageTemplate classes='page-home'>
      {
        statusFeedBackEl || (
          <>
            <h1 className='page-template__page-heading'>Our latest products</h1>

            <div className="latest-product-list">
              {products.map(product => <ProductCard key={product._id} productData={product} />)}
            </div>
          </>
        )
      }
    </PageTemplate>
  )
}
