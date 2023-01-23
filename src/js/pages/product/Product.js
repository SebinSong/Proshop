import React from 'react'
import './Product.scss'
import { useLoaderData } from 'react-router-dom'
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
  const imgPath = `images/products/${filename}`

  return (
    <PageTemplate classes='page-product'>
      <div className="back-btn-container">
        <button className="has-text is-outline back-btn">
          <i className="fa-arrow-left is-prefix" />
          <span>Back</span>
        </button>
      </div>

      <div className="product-details">
        <img className="product-details-image" src={imgPath} alt={name} />

        <div className="product-details-content">
          <div className="product-brand">{brand}</div>
          <h2 className="product-name">{name}</h2>
          <div className="product-rating">
            <Rating rate={rating}
              text={`${rating} / 5 (from ${numReviews})`}
              color='var(--orange_shine)' />
          </div>
          <div className="product-price">$ {price}</div>
          <div className="product-description">
            <span className="product-description-label">Description:</span>
            <p>{description}</p>
          </div>

          <div className="product-call-to-action">
            <div className="product-total-price">total price: $ {price}</div>
            <div className="product-status">status: {countInStock} items in stock</div>

            <div className="button-container">
              <button className="is-text-btn is-primary">
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
