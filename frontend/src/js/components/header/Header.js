import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from '@redux-api'
import { selectCartTotalQuantities } from '@store/features/cartSlice.js'
import './Header.scss'
// child components
import HeaderSearchBar from './header-search-bar'
// hooks
import useMQ from '@hooks/media-queries'
const { Icon, Mq } = React.Global

const Header = () => {
  // local state
  const searchBarQueryString = '(max-width: 600px)'
  const isSmallDevice = useMQ(null, searchBarQueryString)
  const [showSearchBarInSmallDevice, setShowSearchBar] = useState(false)
  const currCartQuantities = useSelector(selectCartTotalQuantities)
  const nav = useNavigate()
  const location = useLocation()
  const showCartBadge = !location.pathname.startsWith('/cart') && currCartQuantities > 0

  // methods
  const navigateTo = to => () => nav(to)
  const isActiveWithPath = path => location.pathname === path ? 'is-active' : ''

  return (
    <header className="l-toolbar app-header">
      <div className="app-header__content">
        <div className="app-header__branding" onClick={navigateTo('/')}>
          <img className="app-header__logo"
            src="images/logo.svg"
            alt="A tiny shop logo" />

          <h1 className="app-header__app-title">
            Proshop
          </h1>
        </div>

        <div className="app-header__menu-container">
          <button className={`app-header__menu-btn ${isActiveWithPath('/cart')}`}
            onClick={navigateTo('/cart')}>
            <span className={`menu-btn__wrap ${showCartBadge ? 'has-badge' : ''}`}>
              <span className="text">Cart</span>
              <Icon tag="i" name="cart" />
            </span>
          </button>

          <button className={`app-header__menu-btn ${isActiveWithPath('/login')}`}
            onClick={navigateTo('/login')}>
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