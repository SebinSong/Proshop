import React from 'react'
import './Toast.scss'

const TYPE_TO_ICON_MAP = {
  'info': 'info',
  'success': 'circle-check',
  'warning': 'warning'
}

const Toast = ({ 
  type = 'info',
  id = '',
  heading = '',
  content, // required
  hideClose = false,
  removeItem = () => {}
}) => {
  const iconClasses = [
    `icon-${TYPE_TO_ICON_MAP[type] || 'gear'}`,
    'toast__icon',
    `is-type-${type}`,
    hideClose && 'is-close-hidden'
  ].filter(Boolean).join(' ')

  return (
    <div className='toast'>
      <i className={iconClasses} />

      <div className='toast__details'>
        { heading && <h4 className='toast__heading has-roboto'>{heading}</h4> }
        <div className='toast__content'>{ content }</div>
      </div>

      <button className='icon toast__close-btn'
        onClick={() => { id && removeItem(id) }}
        aria-label='Toast close'>
        <i className='icon-close'></i>
      </button>
    </div>
  )
}

export default Toast
