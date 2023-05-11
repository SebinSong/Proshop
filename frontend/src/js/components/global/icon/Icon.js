import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({
  tag = 'span',
  name = '',
  classes = '',
  children = null
}) => {
  return React.createElement(
    tag,
    {
      className: `icon-${name} ${classes}`
    },
    children
  )
}

Icon.propTypes = {
  tag: PropTypes.string,
  name: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.node
}

export default Icon