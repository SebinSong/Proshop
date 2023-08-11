import React from 'react'
import './ProductList.scss'

const {
  AdminPage
} = React.Global

export default function ProductList () {
  return (
    <AdminPage classes='admin-page-product-list'
      pageTitle='Product list'>
        <p>render products here.</p>
    </AdminPage>
  )
}
