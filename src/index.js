import React from 'react'
import { createRoot } from 'react-dom/client'

// define global components
import './js/components/global/index.js'

// global styles
import '@scss/main.scss'
// root component
import App from '@components/root/App.js'


const root = createRoot(document.querySelector('#root'))

root.render(<App />)