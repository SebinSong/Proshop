import React, { useState } from 'react'

import './Header.scss'
// child components
import HeaderSearchBar from './header-search-bar'
// hooks
import useMQ from '@hooks/media-queries'
const { Icon, Mq } = React.Global

const Header = () => {
  const searchBarQueryString = '(max-width: 600px)'
  const isSmallDevice = useMQ(null, searchBarQueryString)
  const [showSearchBarInSmallDevice, setShowSearchBar] = useState(false)

  return (
    <header className="l-toolbar app-header">
      <div className="app-header__content">
        <div className="app-header__branding">
          <img className="app-header__logo"
            src="/images/logo.svg"
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
              <Icon tag="i" name="sign-in" classes="sign-in-icon" />
            </span>
          </button>

          <Mq customQueryString={searchBarQueryString}>
            <button className="app-header__menu-btn"
              onClick={() => setShowSearchBar(v => !v)}>
              <span className="menu-btn__wrap">
                <Icon tag="i" name="search" />
              </span>
            </button>
          </Mq>
        </div>

        { 
          !isSmallDevice || showSearchBarInSmallDevice
            ? <div className="app-header__search-bar-container">
                <HeaderSearchBar placeholder="Serch Products..." />
              </div>
            : null
        }
      </div>
    </header>
  )
}

export default Header