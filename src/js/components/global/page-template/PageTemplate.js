import React from 'react'
import Container from '../container/Container.js'

export default function PageTemplate ({ classes = '', children = null }) {
  return (
    <div className="p-content">
      <Container classes={`page ${classes}`}>
        {children}
      </Container>
    </div>
  )
}
