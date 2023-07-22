import { createContext, useState } from 'react'
import { genId } from '@utilities'

export const ToastContext = createContext([])
export const TOAST_DEFAULT_DURATION = 5000

export function useToast () {
  const [toastList, setToastList] = useState([])

  const removeToastItem = (id) => {
    const copy = toastList.slice()

    setToastList(copy.filter(item => item.id !== id))
  }
  const addToastItem = ({
    type = 'info',
    heading = '',
    content = '',
    hideClose = false,
    delay = null
  }) => {
    const itemid = genId()

    setToastList([
      ...toastList,
      {
        id: itemid,
        type,
        heading,
        content,
        hideClose
      }
    ])

    setTimeout(() => {
      removeToastItem(itemid) 
    }, (typeof delay === 'number') ? delay : TOAST_DEFAULT_DURATION)
  }

  return {
    toastList,
    addToastItem,
    removeToastItem
  }
}
