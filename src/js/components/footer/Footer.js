import React from 'react'

import logoPath from '@images/logo-white.svg'
import './Footer.scss'

const { Icon, Container } = React.Global
const iconList = [
  { 
    name: 'instagram', 
    url: 'https://www.instagram.com/s.sebin/' 
  },
  { 
    name: 'facebook', 
    url: 'https://www.facebook.com/freenaturalsoul' 
  },
  { 
    name: 'github', 
    url: 'https://github.com/SebinSong' 
  },
  { 
    name: 'heart', 
    url: 'https://www.linkedin.com/in/sebinsong/' 
  }
]

const FooterIcons = () => iconList.map(
  ({ name = '', url = '#' }) => (
    <a className="app-footer__sns-icon-link"
      href={url} key={name}
      target="_blank">
      <Icon name={name} tag="i" />
    </a>
  )
)

const Footer = () => {
  return (
    <footer className="p-footer app-footer">
      <Container classes="app-footer__container">
        <div className="app-footer__logo">
          <img src={logoPath} />
          <h1>Proshop</h1>
        </div>

        <div className="app-footer__right-statement">
          &copy; Copyright 2022 
          <span className="shop-name">Proshop</span>.
          All Rights Reserved. 
        </div>

        <div className="app-footer__sns-icons">
          <FooterIcons />
        </div>
      </Container>
    </footer>
  )
}

export default Footer