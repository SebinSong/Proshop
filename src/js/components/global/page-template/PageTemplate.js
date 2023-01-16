import React from 'react'
import Container from '../container/Container.js'

export default function PageTemplate ({ classes = '', children = null }) {
  const classStr = `p-content ${classes}`
  return (
    <Container classes={classStr}>
      {children}
    </Container>
  )
}
