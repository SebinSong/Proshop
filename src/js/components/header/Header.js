import React from 'react'

import './Header.scss'
import logoPath from '@images/logo.svg'

const { Icon } = React.Global

const Header = () => {
  return (
    <header className="l-toolbar app-header">
      <div className="app-header__content">
        <img className="app-header__logo"
          src={logoPath}
          alt="A tiny shop logo" />

        <h1 className="app-header__app-title">
          Proshop
        </h1>

        <div className="app-header__menu-container">
          <button className="app-header__menu-btn">
            <span>Cart</span>
            <Icon tag="i" name="cart" />
          </button>

          <button className="app-header__menu-btn">
            <span>Sign in</span>
            <Icon tag="i" name="sign-in" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header