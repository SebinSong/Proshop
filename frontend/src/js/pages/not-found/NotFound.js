import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.scss'

export default function NotFound () {
  const navigate = useNavigate()

  return (
    <main className='page-404'>
      <h1 className='is-title-2 err-title'>Oops! Something gone wrong.</h1>
      <p className='err-desc'>Our server might have experienced some issue.</p>
      <a href='/login'>Retry</a>
    </main>
  )
}
