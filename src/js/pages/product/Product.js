import React from 'react'
import './Product.scss'
import { useLoaderData } from 'react-router-dom'
import products from '@frontend-utils/products.js'
const { PageTemplate } = React.Global

export async function loader ({ params }) {
  const found = products.find(p => p.id === params.id)
  if (!found) {
    throw new Response("", {
      status: 404, statusText: 'Not found'
    })
  }
  return found
}

export default function Product () {
  const product = useLoaderData()

  return (
    <PageTemplate classes='page-product'>
      <div className="back-btn-container">
        <button className="has-text is-outline back-btn">
          <i className="fa-arrow-left is-prefix" />
          <span>Back</span>
        </button>
      </div>
    </PageTemplate>
  )
}
