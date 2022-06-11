import React from 'react'

import './Container.scss'

function Container ({
  children = null,
  classes = ''
}) {
  return (
    <div className={`ps-container ${classes}`}>
      {children}
    </div>
  )
}

export default Container