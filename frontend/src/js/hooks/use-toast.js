import { createContext, useState } from 'react'
import { genId } from '@utilities'

export const ToastContext = createContext({})
export const TOAST_DEFAULT_DURATION = 5000

export function useToast (initList = []) {
  const [toastList, setToastList] = useState(initList)

  const removeToastItem = (id) => {
    setToastList(toastList.slice().filter(item => item.id !== id))
  }
  const addToastItem = ({
    type = 'info',
    heading = '',
    content = '',
    hideClose = false,
    delay = null
  }) => {
    const itemid = genId()
    const newList = [
      ...toastList,
      {
        id: itemid,
        type,
        heading,
        content,
        hideClose
      }
    ]

    const prevList = toastList
    setToastList(newList)

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
