import React, { useState } from 'react'
import { useGetSingleProductQuery } from '@store-slice/productsSlice.js'
import './Product.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from '@redux-api'
import { selectCartItemById } from '@store/features/cartSlice.js'
import Rating from '@components/rating/Rating.js'
import QuantitySelector from '@components/quantity-selector/QuantitySelector.js'

const { PageTemplate, LoaderSpinner } = React.Global

export default function Product () {
  // state
  const navigate = useNavigate()
  const { id: productId } = useParams()
  const inCartData = useSelector(state => selectCartItemById(state, productId))
  const [quantity, SetQuantity] = useState(inCartData?.qty || 0)
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error
  } = useGetSingleProductQuery(productId)

  // methods
  const handleSubmit = () => { navigate(`/cart/${productId}?qty=${quantity}`) }

  // render
  const statusFeedbackEl = (isLoading || isFetching)
    ? (
        <LoaderSpinner>
          <span>Loading<br />Product details..</span>
        </LoaderSpinner>
      )
    : isError
        ? <p>{error?.message}</p>
        : null
  
  if (statusFeedbackEl) {
    return statusFeedbackEl
  }

  const {
    image: filename, name, brand, rating,
    numReviews, price, description,
    countInStock
  } = (data || {})
  const imgPath = `images/products/${filename}`

  return (
    <PageTemplate classes='page-product'>
      {
        <>
          <div className="back-btn-container">
            <button className="is-outline back-btn"
              onClick={() => navigate('/')}>
              <i className="icon-arrow-left is-prefix" />
              <span>Back</span>
            </button>
          </div>

          <div className="product-details">
            <div className="product-details-image">
              <img src={imgPath} alt={name} />
            </div>

            <div className="product-details-content">
              <div className="product-details-specs">
                <div className="product-brand has-text-neau-dark-1 has-text-bold">{brand}</div>
                <h2 className="product-name is-title-1">{name}</h2>
                <div className="product-rating">
                  <Rating classes="has-text-neau-dark-1"
                    rate={rating}
                    text={`${rating} / 5 ( from ${numReviews} )`}
                    color='var(--orange_shine)' />
                </div>
                <div className="product-price has-yeseva">$ {price}</div>
                <div className="product-description">
                  <span className="product-description-label has-text-bold">Description:</span>
                  <p>{description}</p>
                </div>
              </div>

              <div className="product-details-summary">
                <div className="summary-row product-total-price">
                  <label className="has-text-bold">total price:</label>
                  <span className="summary-value total-price">$ {price}</span>
                </div>

                <div className="summary-row product-status">
                  <label className="has-text-bold">status:</label>
                  <span className="summary-value">
                    <span className="stock-count">{countInStock}</span>
                    items in stock
                  </span>
                </div>

                <div className="summary-row product-status">
                  <label className="has-text-bold">quantity:</label>
                  <span className="summary-value">
                    <QuantitySelector min={0} max={countInStock}
                      value={quantity} onChange={SetQuantity} />
                  </span>
                </div>

                <div className="summary-row button-container">
                  <button className="is-text-btn is-primary add-to-cart-btn"
                    disabled={quantity === 0}
                    type='button'
                    onClick={handleSubmit}>
                    <span>{inCartData ? 'Go to cart' : 'Add to cart'}</span>
                    <i className="icon-circle-plus is-postfix"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </PageTemplate>
  )
}
