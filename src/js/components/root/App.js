import React from 'react'

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
          Hello world!
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App