import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from '@redux-api'
import { selectCartTotalQuantities } from '@store/features/cartSlice.js'
import { isUserAuthenticated, isUserAdmin } from '@store/features/authSlice.js'
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
  const isUserLoggedIn = useSelector(isUserAuthenticated)
  const isAdmin = useSelector(isUserAdmin)

  // router utils
  const nav = useNavigate()
  const location = useLocation()

  // flags
  const showCartBadge = !location.pathname.startsWith('/cart') && currCartQuantities > 0

  // methods
  const navigateTo = to => () => nav(to)
  const isActiveWithPath = path => location.pathname === path ? 'is-active' : ''

  const buttonEls = isUserLoggedIn
    ? isAdmin
      ? [
          <button className="app-header__menu-btn"
            onClick={navigateTo('/profile')}
            key='profile-admin'>
            <span className="menu-btn__wrap">
              <span className="text">My profile</span>
              <Icon tag="i" name="user" />
            </span>
          </button>,

          <button className="app-header__menu-btn"
            onClick={navigateTo('/admin-order-list')}
            key='order-list'>
            <span className="menu-btn__wrap">
              <span className="text">Order list</span>
              <Icon tag="i" name="handbag" />
            </span>
          </button>
        ]
      : [
          <button className="app-header__menu-btn"
            onClick={navigateTo('/profile')}
            key='profile'>
            <span className="menu-btn__wrap">
              <span className="text">My profile</span>
              <Icon tag="i" name="user" />
            </span>
          </button>,

          isActiveWithPath('/cart') 
            ? <button className="app-header__menu-btn"
                onClick={navigateTo('/')}
                key='products'>
                <span className="menu-btn__wrap">
                  <span className="text">Products</span>
                  <Icon tag="i" name="handbag" />
                </span>
              </button>
            : <button className="app-header__menu-btn"
                onClick={navigateTo('/cart')}
                key='cart'>
                <span className={`menu-btn__wrap ${showCartBadge ? 'has-badge' : ''}`}>
                  <span className="text">Cart</span>
                  <Icon tag="i" name="cart" />
                </span>
              </button>
        ]
    : [
        !isActiveWithPath('/login') &&
        <button className="app-header__menu-btn"
          onClick={navigateTo('/login')}
          key='login'>
          <span className="menu-btn__wrap">
            <span className="text">Sign in</span>
            <Icon tag="i" name="sign-in" classes="sign-in-icon" />
          </span>
        </button>
      ]

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
          {buttonEls}

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