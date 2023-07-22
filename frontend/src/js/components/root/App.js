import React, { useState } from 'react'
import { Provider } from '@redux-api'
import { Outlet } from 'react-router-dom'
import store from '@store/store.js'

// children components
import AppStyles from '../app-styles/AppStyles.js'
import Footer from '@components/footer'
import Header from '@components/header'
import ToastContainer from '../toast/ToastContainer.js'

// hooks
import { useToast, ToastContext } from '@hooks/use-toast.js'

import './App.scss'

function App (props) {
  const toastUtils = useToast()

  return (
    <Provider store={store}>
      <ToastContext.Provider value={toastUtils}>
        <>
          <AppStyles />
          <div className="app-container app-layout">
            <Header />
            <main className="l-page">
              <Outlet />

              <Footer />
            </main>

            <ToastContainer />
          </div>
        </>
      </ToastContext.Provider>
    </Provider>
  )
}

export default App