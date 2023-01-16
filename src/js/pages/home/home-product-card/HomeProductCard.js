import React from 'react'

import './HomeProductCard.scss'

export default function HomeProductCard ({ productData }) {
  if (!productData) return null

  const {
    name, description, filename,
    price, rating, numReviews, brand
  } = productData
  const imgPath = `images/products/${filename}`

  return (
    <div className="home-product-card">
      <img src={imgPath} alt={name} />

      <p className="product-info">
        <span className="product-info-name is-title-5 mb-20">{name}</span>
        <span className="product-info-desc">{description}</span>
        <span className="product-info-brand">
          <span>Brand: </span>
          <span className="is-desc-strong">{brand}</span>
        </span>
        <span className="product-info-ratings-reviews">
          <span className="is-desc-strong">{rating}</span> from <span className="is-desc-strong">{numReviews}</span> reviews</span>
      </p>

      <p className="product-price has-yeseva">$ {price}</p>
    </div>
  )
}
