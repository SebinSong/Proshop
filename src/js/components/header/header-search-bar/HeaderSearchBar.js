import React from 'react'
const { Icon } = React.Global

import './HeaderSearchBar.scss'

const HeaderSearchBar = ({
  placeholder = ''
}) => {
  return (
    <div className="searchbar app-header__searchbar">
      <input className="searchbar-input" type="text"
        aria-label='Header search bar'
        autoComplete="off"
        placeholder={placeholder} />

      <button className="searchbar-icon icon" type="button" aria-label="Search button">
        <Icon name="search" />
      </button>
    </div>
  )
}

export default HeaderSearchBar
