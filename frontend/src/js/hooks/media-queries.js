import React, {
  useState, useEffect
} from 'react'
import HookError from './custom-hook-error'

/*
  project breakpoints

  $smallphone: 428px;
  $tablet: 769px;
  $desktop: 1200px;
*/

const smallphone = 428
const tablet = 769
const desktop = 1200

const queryMap = {
  'desktop': `(min-width: ${desktop}px)`,
  'till-tablet': `(max-width: ${tablet}px)`,
  'tablet': `(min-width: ${tablet}px) and (max-width: ${desktop}px)`,
  'from-tablet': `(min-width: ${tablet}px)`,
  'from-smallphone': `(min-width: ${smallphone}px)`,
  'from-smallphone-till-tablet': `(min-width: ${smallphone}px) and (max-width: ${tablet}px)`,
  'smallphone': `(max-width: ${smallphone + 1}px)`
}

function useMQ (deviceOption = '', customQueryString) {
  const queryString = customQueryString || (queryMap[deviceOption] || '')

  if (!queryString)
    throw new HookError(`useMQ hook error: invalid deviceOption parameter - ${deviceOption}`)
  
  const [isMatched, setIsMatched] = useState(false)
  const checkIfMatches = () => {
    const check = window.matchMedia(queryString).matches

    setIsMatched(prevIsMatched => check !== prevIsMatched ? check : prevIsMatched)
  }

  useEffect(() => {
    window.addEventListener('resize', checkIfMatches)
    checkIfMatches()

    return function cleanUp () {
      window.removeEventListener('resize', checkIfMatches)
    }
  }, [])

  return isMatched
}

export default useMQ;