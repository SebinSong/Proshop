import React, { useState } from 'react'

export function useValidation (targetState = {}, validationEntries = []) {
  const [formError, setFormError] = useState(null)

  const validateAll = () => {
    for (const { key, check, errMsg } of validationEntries) {
      if (!check(targetState[key], targetState)) {
        setFormError({ errKey: key, errMsg })

        const inputEl = document.querySelector(`input#${key}-input`)
        inputEl && inputEl.focus()
        return false
      }
    }

    return true
  }

  const clearFormError = () => {
    setFormError(null)
  }

  return {
    formError,
    validateAll,
    clearFormError
  }
}
