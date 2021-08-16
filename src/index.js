import React from 'react'
import ReactDOM from 'react-dom'

// global styles
import '@scss/main.scss'
// root component
import App from '@components/root/App.js'

const rootEl = document.querySelector('#root')

ReactDOM.render(
  <App />,
  rootEl
)