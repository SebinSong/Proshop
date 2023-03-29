import React from 'react'
import PropTypes from 'prop-types'

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

Container.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string
}

export default Container