// CUSTOM HOOKS
import { useState } from 'react'

export const useFormInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [inputValidity, setInputValidity] = useState(false)

  const inputValidationHandler = event => {
    setInputValue(event.target.value)
    if (event.target.value.trim() === '') {
      setInputValidity(false)
    } else {
      setInputValidity(true)
    }
  }
  return {
    value: inputValue,
    onChange: inputValidationHandler,
    validity: inputValidity
  }
}
