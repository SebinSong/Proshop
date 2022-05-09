import React from 'react'
import AppStyles from '../app-styles/AppStyles.js'

import './App.scss'

function App (props) {
  return (
    <>
      <AppStyles />
      <div className="app-container">
        Hello world!
      </div>
    </>
  )
}

export default App