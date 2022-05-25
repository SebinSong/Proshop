import React from 'react'

import './Header.scss'
import logoPath from '@images/logo.svg'

// child components
import HeaderSearchBar from './header-search-bar'

const { Icon } = React.Global

const Header = () => {
  return (
    <header className="l-toolbar app-header">
      <div className="app-header__content">
        <div className="app-header__branding">
          <img className="app-header__logo"
            src={logoPath}
            alt="A tiny shop logo" />

          <h1 className="app-header__app-title">
            Proshop
          </h1>
        </div>

        <div className="app-header__menu-container">
          <button className="app-header__menu-btn">
            <span className="menu-btn__wrap">
              <span className="text">Cart</span>
              <Icon tag="i" name="cart" />
            </span>
          </button>

          <button className="app-header__menu-btn">
            <span className="menu-btn__wrap">
              <span className="text">Sign in</span>
              <Icon tag="i" name="sign-in" />
            </span>
          </button>
        </div>

        <div className="app-header__search-bar-container">
          <HeaderSearchBar placeholder="Serch Products..." />
        </div>
      </div>
    </header>
  )
}

export default Header