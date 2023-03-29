import React from 'react'
import './Product.scss'
import { useLoaderData, useNavigate } from 'react-router-dom'
import products from '@frontend-utils/products.js'
import Rating from '@components/rating/Rating.js'

const { PageTemplate } = React.Global

export async function loader ({ params }) {
  const found = products.find(p => p.id === params.id)
  if (!found) {
    throw new Response("", {
      status: 404, statusText: 'Not found'
    })
  }
  return found
}

export default function Product () {
  const {
    filename, name, brand, rating,
    numReviews, price, description,
    countInStock
  } = useLoaderData()
  const navigate = useNavigate()
  const imgPath = `images/products/${filename}`

  return (
    <PageTemplate classes='page-product'>
      <div className="back-btn-container">
        <button className="has-text is-outline back-btn"
          onClick={() => navigate(-1)}>
          <i className="fa-arrow-left is-prefix" />
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
            <div className="summary-row button-container">
              <button className="is-text-btn is-primary add-to-cart-btn">
                <span>Add to cart</span>
                <i className="fa-circle-plus is-postfix"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
