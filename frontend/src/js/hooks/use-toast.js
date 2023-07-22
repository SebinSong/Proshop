import { createContext, useState, useRef } from 'react'
import { genId } from '@utilities'

export const ToastContext = createContext({})
export const TOAST_DEFAULT_DURATION = 5000

export function useToast (initList = []) {
  const [toastList, setToastList] = useState(initList)
  const timeoutIdMap = useRef({})

  const removeToastItem = (id) => {
    setToastList(
      prevList => prevList.filter(item => item.id !== id)
    )

    const timeoutId = timeoutIdMap.current[id]
    if (timeoutId) {
      clearTimeout(timeoutId)
      delete timeoutIdMap.current[id]
    }
  }

  const addToastItem = ({
    type = 'info',
    heading = '',
    content = '',
    hideClose = false,
    delay = null
  }) => {
    const itemid = genId()
    setToastList(prevList => {
      if (prevList.length === 3) { prevList.shift() } // keep the toastList 
      return [
        ...prevList,
        {
          id: itemid,
          type,
          heading,
          content,
          hideClose
        }
      ]
    })

    const timeoutId = setTimeout(
      () => { removeToastItem(itemid) },
      (typeof delay === 'number') ? delay : TOAST_DEFAULT_DURATION
    )

    timeoutIdMap.current[itemid] = timeoutId
  }

  return {
    toastList,
    addToastItem,
    removeToastItem
  }
}
