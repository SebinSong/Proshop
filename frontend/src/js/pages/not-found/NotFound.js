import React from 'react'
import './NotFound.scss'

export default function NotFound () {
  const onRetry = () => { location.reload() }

  return (
    <main className='page-404'>
      <h1 className='is-title-2 err-title'>Oops! Something gone wrong.</h1>
      <p className='err-desc'>Our server might have experienced some issue.</p>
      <span className='link has-underline' onClick={onRetry}>Retry</span>
    </main>
  )
}
