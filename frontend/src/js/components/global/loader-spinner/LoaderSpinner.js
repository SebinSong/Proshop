import React from 'react'
import './LoaderSpinner.scss'

export default function LoaderAnimation ({ classes = '', children = 'Loading' }) {
  return (
    <div className={`loader-spinner ${classes}`}>
      <div className='loader-spinner__animation'></div>
      <div className='loader-spinner__text'>{children}</div>
    </div>
  )
}
