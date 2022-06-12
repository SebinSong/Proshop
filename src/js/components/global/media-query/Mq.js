import React from 'react'
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

export default Mq

