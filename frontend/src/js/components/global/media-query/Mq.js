import React from 'react'
import PropTypes from 'prop-types'
import useMQ from '@hooks/media-queries.js'

function Mq ({
  deviceOption = '',
  customQueryString = '',
  children = null
}) {
  const isMatched = useMQ(deviceOption, customQueryString)

  if (isMatched)
    return <>{children}</>
  else
    return null
}

Mq.propTypes = {
  deviceOption: PropTypes.string,
  customQueryString: PropTypes.string,
  children: PropTypes.node
}

export default Mq

