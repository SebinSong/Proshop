import React from 'react'

import imgPath from '@images/image.jpg'
import './App.scss'

function App (props) {
  const blockEls = []

  for (let i=0; i<5; i++) {
    blockEls.push(
      <div className={`app_block is-${i + 1}`}
        key={i}></div>
    )
  }

  return (
    <div className="app-container">
      { blockEls }

      <img src={imgPath} alt="example image" />

      <span className="name">
        React SPA bolierplate
        <br />
        Created by
        <a target="_blank" href="https://github.com/SebinSong">Sebin Song</a>
      </span>
    </div>
  )
}

export default App