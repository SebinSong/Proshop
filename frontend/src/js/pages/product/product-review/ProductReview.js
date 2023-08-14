import React, { useState, useContext } from 'react'
import { useSelector } from '@redux-api'
import { useCreateProductReview } from '@store-slice/productsApiSlice.js'
import { selectUserInfo } from '@store/features/authSlice'
import { ToastContext } from '@hooks/use-toast'
import QuantitySelector from '@components/quantity-selector/QuantitySelector.js'
import Rating from '@components/rating/Rating.js'
import './ProductReview.scss'

function ProductReview ({
  productId = '',
  refetchProductDetails = null,
  reviews = null,
  classes = ''
}) {
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState('')
  const userInfo = useSelector(selectUserInfo)

  // api-related state
  const [createProductReview, {
    isLoading: isCreatingProductReview,
    error: createProductReviewError
  }] = useCreateProductReview()

  // context
  const { addToastItem } = useContext(ToastContext)

  // methods
  const submitReviewHandler = e => {
    e.preventDefault()

  }

  return (
    <div className={`product-review-container ${classes}`}>
      <h3 className='product-review__heading'>Review history</h3>

      <ul className='review-list'>
        <li className='review-list__item no-history'>
          <i className='icon-bathtub'></i>
          <span>No review history</span>
        </li>
      </ul>

      <form className='submit-review-form' onSubmit={submitReviewHandler}>
        <h3 className='product-review__heading'>My review</h3>

        <div className='product-review__form-field'>
          <label className='label product-review__label'>Rating:</label>

          <QuantitySelector className='product-review__rating' isSmall={true}
            min={1} max={5} value={rating} onChange={setRating} />
          
          <Rating classes='rating-preview' rate={rating} />
        </div>

        <div className='product-review__form-field is-column'>
          <label className='label product-review__label'>comment:</label>

          <textarea className='custom-textarea review-input'
            autocomplete="off"
            value={comment}
            onInput={e => setComment(e.target.value)}
            placeholder='Write your review' />
        </div>

        <div className='buttons-container is-right-aligned mt-20'>
          <button className='is-primary is-small review-submit-btn' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default React.memo(ProductReview)
