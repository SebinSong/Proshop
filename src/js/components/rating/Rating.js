import React from 'react'
import PropTypes from 'prop-types'
import './Rating.scss'

export default function Rating ({ rate = 0, text = '', color = '' }) {
  const starArr = Array(Math.floor(rate)).fill('full')
  if (rate % 1 >= 0.5) starArr.push('half')
  
  return (
    <span className="rating">
      <span className="rating-stars">
        {
          starArr.map((type, index) => <i key={index} 
            className={`fa-star${type === 'half' ? '-half' : ''}`}
            style={color ? { color } : {}}
            ></i>)
        }
      </span>
      <span className="rating-text">{text}</span>
    </span>
  )
}

Rating.propTypes = {
  rate: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string
}