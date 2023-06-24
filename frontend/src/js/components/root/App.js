import React from 'react'
import { Provider } from '@redux-api'
import { Outlet } from 'react-router-dom'
import store from '@store/store.js'

// children components
import AppStyles from '../app-styles/AppStyles.js'
import Footer from '@components/footer'
import Header from '@components/header'

function App (props) {
  return (
    <Provider store={store}>
      <>
        <AppStyles />
        <div className="app-container app-layout">
          <Header />
          <main className="l-page">
            <Outlet />

            <Footer />
          </main>

        </div>
      </>
    </Provider>
  )
}

export default App