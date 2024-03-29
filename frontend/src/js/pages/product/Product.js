import React, { useState, useContext } from 'react'
import { useGetProductDetailsQuery } from '@store-slice/productsApiSlice.js'
import { addToCart, selectCartItemById } from '@store/features/cartSlice.js'
import { isUserAuthenticated } from '@store/features/authSlice.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from '@redux-api'
import Rating from '@components/rating/Rating.js'
import QuantitySelector from '@components/quantity-selector/QuantitySelector.js'
import ProductReview from './product-review/ProductReview.js'
import { BASE_URL } from '@frontend-utils/constants.js'

import './Product.scss'

const { PageTemplate, LoaderSpinner } = React.Global

export default function Product () {
  // state
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id: productId } = useParams()
  const inCartData = useSelector(state => selectCartItemById(state, productId))
  const isUserLoggedIn = useSelector(isUserAuthenticated)
  const [quantity, SetQuantity] = useState(inCartData?.qty || 0)
  const [submitted ,SetSubmitted] = useState(false)

  // api-related state
  const {
    data,
    isLoading,
    isFetching,
    refetch,
    isError,
    error
  } = useGetProductDetailsQuery(productId)

  // methods
  const handleSubmit = async () => {
    SetSubmitted(true)
    await dispatch(addToCart(productId, quantity))
  
    navigate(`/cart`)
  }

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
    image: filename, imageAbsPath = '',
    name, brand, rating,
    numReviews, price, description,
    reviews, countInStock
  } = (data || {})
  const imgPath = filename ? `images/products/${filename}` : (BASE_URL + imageAbsPath) || ''

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
                    {
                      countInStock > 0
                        ? <>
                            <span className="stock-count">{countInStock}</span>
                            <span>items in stock</span>
                          </>
                        : <span className="out-of-stock">Out of stock</span>
                    }
                  </span>
                </div>

                {
                  countInStock > 0 &&
                  <>
                    <div className="summary-row product-status">
                      <label className="has-text-bold">quantity:</label>
                      <span className="summary-value">
                        <QuantitySelector min={0} max={countInStock}
                          value={quantity} onChange={SetQuantity} />
                      </span>
                    </div>

                    <div className="summary-row button-container">
                      {
                        isUserLoggedIn
                          ? <button className="is-text-btn is-primary add-to-cart-btn"
                              disabled={quantity === 0 || submitted}
                              type='button'
                              onClick={handleSubmit}>
                              <span>{inCartData ? 'Go to cart' : 'Add to cart'}</span>
                              <i className="icon-circle-plus is-postfix"></i>
                            </button>
                          : (
                            <p className='sign-in-to-purchase'>
                              <span tabIndex='0'
                                className='link has-underline'
                                onClick={() => navigate(`/login?redirect=/product/${productId}`)}
                              >Sign in</span>
                              to purchase this product.
                            </p>
                          )
                      }
                    </div>
                  </>
                }
              </div>

              <ProductReview productId={productId}
                refetchProductDetails={refetch}
                reviews={reviews}
              ></ProductReview>
            </div>
          </div>
        </>
      }
    </PageTemplate>
  )
}
