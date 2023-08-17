import React, { useState, useContext } from 'react'
import { useSelector } from '@redux-api'
import { useCreateProductReview } from '@store-slice/productsApiSlice.js'
import { selectUserInfo } from '@store/features/authSlice'
import { ToastContext } from '@hooks/use-toast'
import { humanDate, classNames as cn } from '@utilities'
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

  // computed state
  const noReview = !reviews || reviews?.length === 0
  const enableSubmitBtn = Boolean(rating) && comment.length > 10
  const hasMyReview = !noReview && reviews.some(review => review.user === userInfo._id)

  // api-related state
  const [createProductReview, {
    isLoading: isCreatingProductReview,
    error: createProductReviewError
  }] = useCreateProductReview()

  // context
  const { addToastItem } = useContext(ToastContext)

  // methods
  const submitReviewHandler = async () => {
    try {
      await createProductReview({
        productId,
        data: { rating, comment }
      })

      addToastItem({
        type: 'success',
        heading: 'Review added!',
        content: 'Successfully added your review to the product.',
        delay: 5 * 1000
      })
      refetchProductDetails()

    } catch (err) {
      addToastItem({
        heading: 'Failed to process your review.',
        type: 'warning',
        content: err?.data?.message || err.error || 'Something went wrong. please try again',
        delay: 5 * 1000
      })
    }
  }

  return (
    <div className={`product-review-container ${classes}`}>
      <h3 className='product-review__heading'>Reviews</h3>

      <ul className={cn('review-list', hasMyReview && 'no-divider')}>
        {
          noReview && 
          <li className='review-list__item no-history'>
            <i className='icon-bathtub'></i>
            <span>No review history</span>
          </li>
        }
        {
          reviews.length > 0 &&
          reviews.map(review => (
            <li className='review-list__item' key={review.reviewId}>
              <div className='review-list__item-name-and-rate'>
                <span className='review-item__name'>
                  <i className='icon-circle-user'></i>
                  <span>{review.name}</span>
                </span>

                <Rating classes='review-item__rate'
                  rate={review.rating}
                  color='#f56e20' />
              </div>

              <div className='review-item__date'>{humanDate(review.createdAt)}</div>
              <div className='review-item__comment'>{review.comment}</div>
            </li>
          ))
        }
      </ul>

      {
        !hasMyReview &&
        <form className='submit-review-form' onSubmit={e => e.preventDefault()}>
          <h3 className='product-review__heading'>My review</h3>

          <div className='product-review__form-field'>
            <label className='label product-review__label'>Rating:</label>

            <QuantitySelector className='product-review__rating' isSmall={true}
              min={0} max={5} value={rating} onChange={setRating} />
            
            <Rating classes='rating-preview' rate={rating} color='#34C759' />
          </div>

          <div className='product-review__form-field is-column'>
            <label className='label product-review__label comment-label'>
              <span>comment:</span>
              <span className='info-sentence'>minimum 10 characters</span>
            </label>

            <textarea className='custom-textarea review-input'
              autoComplete="off"
              value={comment}
              onInput={e => setComment(e.target.value)}
              placeholder='Write your review' />
          </div>

          <div className='buttons-container is-right-aligned mt-20'>
            <button className='is-primary is-small review-submit-btn'
              type='button'
              disabled={!enableSubmitBtn}
              onClick={submitReviewHandler}>Submit</button>
          </div>
        </form>
      }
    </div>
  )
}

export default React.memo(ProductReview)
