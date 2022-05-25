import React from 'react'
const { Icon } = React.Global

import './HeaderSearchBar.scss'

const HeaderSearchBar = ({
  placeholder = ''
}) => {
  return (
    <div className="app-header__searchbar">
      <input type="text"
        autoComplete="off"
        placeholder={placeholder} />

      <button className="icon" type="button">
        <Icon name="search" />
      </button>
    </div>
  )
}

export default HeaderSearchBar