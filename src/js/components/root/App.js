import React from 'react'
import { Outlet } from 'react-router-dom'

// children components
import AppStyles from '../app-styles/AppStyles.js'
import Footer from '@components/footer'
import Header from '@components/header'

function App (props) {
  return (
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
  )
}

export default App