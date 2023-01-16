import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom'

// define global components
import './js/components/global/index.js'

// components
import App from '@components/root/App.js'
import ErrorBoundary from '@components/page-error-boundary/PageErrorBoundary.js'
import Home from '@pages/home/Home.js'

// global styles
import '@scss/main.scss'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> }
    ]
  }
])


const root = createRoot(document.querySelector('#root'))

root.render(
  <RouterProvider router={router} />
)
