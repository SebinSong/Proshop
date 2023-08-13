import React from 'react'
import { classNames as cn } from '@utilities'
import { useNavigate, useLocation } from 'react-router-dom'
import './AdminNavBar.scss'

const navList = [
  {
    id: 'orders',
    name: 'Order list',
    to: '/admin-order-list'
  },
  {
    id: 'products',
    name: 'Product list',
    to: '/admin-product-list'
  },
  {
    id: 'users',
    name: 'User list',
    to: '/admin-users'
  }
]

export default function AdminNavBar () {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className='admin-nav-bar-container'>
      <span className='nav-label'>Navigation to:</span>

      <ul className='admin-nav-list'>
        {
          navList.map(entry => {
            return (
              <li key={entry.id}
                className={cn('admin-nav-list__item', { 'is-active': pathname === entry.to })}>
                <button className='is-outline is-extra-small' type='button'
                  onClick={() => navigate(entry.to)}
                >{entry.name}</button>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}
