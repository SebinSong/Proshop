import React, { useContext } from 'react'
import { ToastContext } from '@hooks/use-toast.js'
import Toast from './Toast.js'

const ToastContainer = () => {
  const { toastList, removeToastItem } = useContext(ToastContext)

  return (
    <div className='toast-container'>
      {
        toastList.map(item => <Toast key={item.id} removeItem={removeToastItem} {...item} />)
      }
    </div>
  )
}

export default ToastContainer
