import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Rating from '@components/rating/Rating.js'
import './HomeProductCard.scss'

export default function HomeProductCard ({ productData }) {
  if (!productData) return null

  const nav = useNavigate()
  const {
    name, description, filename,
    price, rating, numReviews, brand, id
  } = productData
  const imgPath = `images/products/${filename}`

  return (
    <div className="home-product-card" onClick={() => nav(`product/${id}`)}>
      <img src={imgPath} alt={name} />

      <p className="product-info">
        <span className="product-info-name is-title-5 mb-20">{name}</span>
        <span className="product-info-desc">{description}</span>
        <span className="product-info-brand">
          <span>Brand: </span>
          <span className="is-desc-strong">{brand}</span>
        </span>
        <span className="product-info-ratings-reviews">
          <Rating rate={rating} text={`${rating} (${numReviews} reviews)`} color='var(--orange_shine)' />
        </span>
      </p>

      <p className="product-price has-yeseva">$ {price}</p>
    </div>
  )
}

HomeProductCard.propTypes = {
  productData: PropTypes.object.isRequired
}
