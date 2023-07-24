import React from 'react'

import './Payment.scss'

const { ProtectedPage, PageTemplate } = React.Global

export default function Payment () {
  return (
    <ProtectedPage>
      <PageTemplate classes='page-payment'>
        <h1 className="page-template__page-heading">Payment</h1>
      </PageTemplate>
    </ProtectedPage>
  )
}
