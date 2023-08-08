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
import Home from '@pages/home/Home.js'
import Product from '@pages/product/Product.js'
import Login from '@pages/login/Login.js'
import SignUp from '@pages/sign-up/SignUp.js'
import Cart from '@pages/cart/Cart.js'
import Profile from '@pages/profile/Profile.js'
import Shipping from '@pages/shipping/Shipping.js'
import Payment from '@pages/payment/Payment.js'
import PlaceOrder from '@pages/orders/PlaceOrder.js'
import OrderDetails from '@pages/orders/OrderDetails.js'
import NotFound from '@pages/not-found/NotFound.js'

// admin pages
import OrderList from '@pages/admin/order-list/OrderList.js'

// global styles
import '@scss/main.scss'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'product/:id',
        element: <Product />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'cart/:id',
        element: <Cart />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'login/admin',
        element: <Login />
      },
      {
        path: 'register',
        element: <SignUp />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'shipping',
        element: <Shipping />
      },
      {
        path: 'payment',
        element: <Payment />
      },
      {
        path: 'place-order',
        element: <PlaceOrder />
      },
      {
        path: 'order-details/:id',
        element: <OrderDetails />
      },

      // @@ Admin pages @@
      {
        path: 'admin-order-list',
        element: <OrderList />
      }
    ]
  }
])

const root = createRoot(document.querySelector('#root'))

root.render(
  <RouterProvider router={router} />
)
