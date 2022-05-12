import React from 'react'

import './Header.scss'
import logoPath from '@images/logo.svg'

const Header = () => {
  return (
    <header className="l-toolbar app-header">
      <div className="app-header__content">
        <img className="app-header__logo"
          src={logoPath}
          alt="A tiny shop logo" />

        <h1 className="app-header__app-title">A tiny shop</h1>

      </div>
    </header>
  )
}

export default Header