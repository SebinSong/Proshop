import React from 'react'
import { classNames as cn } from '@utilities'

import './LoaderSpinner.scss'

export default function LoaderAnimation ({
  classes = '',
  children = 'Loading',
  isSmall = false
}) {

  return (
    <div className={cn('loader-spinner', classes)}>
      <div className={cn('loader-spinner__animation', isSmall && 'is-small')}></div>
      <div className='loader-spinner__text'>{children}</div>
    </div>
  )
}
