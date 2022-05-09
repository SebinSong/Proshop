import React from 'react'

// children components
import AppStyles from '../app-styles/AppStyles.js'
import Footer from '@components/footer'
import Header from '@components/header'

import './App.scss'

function App (props) {
  return (
    <>
      <AppStyles />
      <div className="app-container">
        <Header />
        <main>
          Hello world!
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App