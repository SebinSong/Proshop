import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// define global components
import './js/components/global/index.js'

// components
import App from '@components/root/App.js'
import ErrorBoundary from '@components/page-error-boundary/PageErrorBoundary.js'
import Home from '@pages/home/Home.js'
import Product from '@pages/product/Product.js'

// global styles
import '@scss/main.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'product/:id',
        element: <Product />
      }
    ]
  }
])


const root = createRoot(document.querySelector('#root'))

root.render(
  <RouterProvider router={router} />
)
