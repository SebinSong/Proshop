import React from 'react'

const Icon = ({
  tag = 'span',
  name = '',
  classes = '',
  children = ''
}) => {
  return React.createElement(
    tag,
    {
      className: `fa-${name} ${classes}`
    },
    children
  )
}

export default Icon