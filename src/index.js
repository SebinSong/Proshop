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
import Home from '@pages/home/Home.js'
import Product from '@pages/product/Product.js'
import NotFound from '@pages/not-found/NotFound.js'

// global styles
import '@scss/main.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
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
